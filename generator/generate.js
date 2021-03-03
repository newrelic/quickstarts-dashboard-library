const fs = require('fs');
const yaml = require('js-yaml');
const { exit } = require('process');
const winston = require('winston');
const { getSources } = require('./sources');
const { findQueries, findSources } = require('./helpers');

// Initiate logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

// First argument should be path to quickstarts folder
const directory = process.argv[2];

// Read all sources, to use during quickstarts processing and for use as data file in nerdlet
const sourcesLibrary = getSources();

// Read all quickstarts, filter out the ones starting with _ and process each
const quickstarts = fs
  .readdirSync(directory)
  .filter((element) => !element.startsWith('_'))
  .map(processQuickstart);

//
// Process a quickstarts element
//
function processQuickstart(element) {
  //
  // Quickstart data
  //
  const quickstart = {
    name: '',
    description: '',
    authors: [],
    sources: [],
    alerts: [],
    dashboards: [],
    flex: [],
  };

  // Sanity check on directory name
  if (!element.match(/^[a-zA-Z0-9-]*$/)) {
    logger.error(
      `Unsupported directory name "${element}", please only use letters, numbers, and dashes. No spaces allowed.`
    );
  }

  //
  // Read config and store attributes
  //
  const configContents = fs.readFileSync(
    `${directory + element}/config.yaml`,
    'utf8'
  );
  const config = yaml.safeLoad(configContents);
  quickstart.id = element;
  quickstart.name = config.name || element;
  quickstart.description = config.description || '';
  quickstart.authors = config.authors || [];
  quickstart.sources = config.sources || [];
  quickstart.alerts = config.alerts || [];

  //
  // Read dashboard directory and read in all dashboards + screenshots
  //
  quickstart.dashboards = fs
    .readdirSync(`${directory + element}/dashboards/`)
    .filter((filename) => filename.endsWith('json'))
    .map((filename) => {
      const dashboard = {
        name: '',
        description: '',
        filename: filename,
        sources: [],
        screenshots: [],
      };

      // Retrieve dashboard json and store dashboard name
      const dashboardJson = JSON.parse(
        fs.readFileSync(`${directory + element}/dashboards/${filename}`)
      );
      dashboard.name = dashboardJson.name;

      // Parse dashboard and queries to find data types
      dashboard.sources = findSources(findQueries(dashboardJson));
      quickstart.sources = [].concat(quickstart.sources, dashboard.sources);

      // Check which products the dashboard uses
      const source = quickstart.sources
        .sort()
        .map((sourceConfig) => {
          // Speciale case if config specifically set's it's own options
          if (typeof sourceConfig === 'object' && sourceConfig !== null) {
            return sourceConfig;
          }

          const sourceProduct = sourcesLibrary.find((source) => {
            if (source.eventTypes.includes(sourceConfig)) {
              return source;
            }

            return false;
          });

          if (sourceProduct) {
            return sourceProduct;
          } else {
            logger.warn(
              `Unknown event type "${sourceConfig}" in "${filename}"`
            );
            return undefined;
          }
        })
        .sort()
        .filter(function (item, pos, ary) {
          return item !== undefined && (!pos || item !== ary[pos - 1]);
        });

      // Create product array
      quickstart.products = source.map((source) => {
        return source.name;
      });

      // Create entities array
      quickstart.entities = source
        .map((source) => {
          return source.entities;
        })
        .filter(function (item) {
          return item !== undefined;
        });

      // Compress entities arrays of arrays, to single array
      quickstart.entities = [].concat(...quickstart.entities);

      // Remove duplicates from entities
      quickstart.entities = quickstart.entities
        .sort((a, b) => {
          if (a.type === b.type) {
            if (a.domain < b.domain) {
              return -1;
            } else {
              return a.domain > b.domain ? 1 : 0;
            }
          } else {
            return a.type < b.type ? -1 : 1;
          }
        })
        .filter(function (item, pos, ary) {
          return (
            !pos ||
            item.domain !== ary[pos - 1].domain ||
            item.type !== ary[pos - 1].type
          );
        });

      // Do a sanity check of all widgets
      for (const page of dashboardJson.pages) {
        for (const widget of page.widgets) {
          // Check if we have a configuration or visualization set for all widgets
          if (
            Object.keys(widget.visualization).length === 0 &&
            widget.visualization.area == null &&
            widget.visualization.line == null &&
            widget.visualization.bar == null &&
            widget.visualization.billboard == null &&
            widget.visualization.pie == null &&
            widget.visualization.table == null &&
            widget.visualization.markdown == null
          ) {
            logger.error(
              `Incorrect widget found in ${element} ${filename}, title: ${widget.title}`
            );
            logger.error(
              'Configuration or Visualisation should be set for all widgets'
            );
            exit(1);
          }

          // Check if we have a configuration or rawConfiguration set of all widgets
          // We cannot have both at the moment, but the product team is looking to merge this at some point
          if ('configuration' in widget && 'rawConfiguration' in widget) {
            logger.error(
              `Incorrect widget found in ${element} ${filename}, title: ${widget.title}`
            );
            logger.error(
              'Configuration or rawConfiguration should be set for all widgets, but you only on of both.'
            );
            logger.error(
              'Please delete configuration if rawConfiguration has been set.'
            );
            exit(1);
          }
        }
      }

      // Check if an image exists with same name as dashboard
      dashboard.screenshots = fs
        .readdirSync(`${directory + element}/dashboards/`)
        // Filter out images
        .filter(
          (imagename) =>
            imagename.endsWith('png') ||
            imagename.endsWith('jpeg') ||
            imagename.endsWith('jpg') ||
            imagename.endsWith('gif')
        )
        // Check if imagename starts same as dashboard name
        .filter((imagename) => imagename.startsWith(filename.slice(0, -5)))
        .map((imagename) => {
          return imagename;
        });

      return dashboard;
    });

  //
  // Read flex directory
  //
  if (fs.existsSync(`${directory + element}/flex`)) {
    quickstart.flex = fs
      .readdirSync(`${directory + element}/flex/`)
      .map((filename) => {
        // We want to remove the flex events from the sources list, as it will add a lot of unknown data sources
        // We know where the data sources are coming from, so it's not really unknown
        // We do this by parsing each file and retrieving the specific event_type
        const flexContents = fs.readFileSync(
          `${directory + element}/flex/${filename}`,
          'utf8'
        );
        const flexConfig = yaml.safeLoad(flexContents);

        flexConfig.integrations.forEach((integration) => {
          integration.config.apis.forEach((api) => {
            quickstart.sources = quickstart.sources.filter(
              (source) => source === api.event_type
            );
          });
        });

        return filename;
      });
    quickstart.sources.push('Flex');
  }

  //
  // Remove duplicates from sources
  //
  quickstart.sources = Array.from(new Set(quickstart.sources)).sort();

  return quickstart;
}

//
// Write out data for use in front-end
//
const json = JSON.stringify({
  quickstarts: quickstarts,
  sources: sourcesLibrary,
});
fs.writeFileSync('data.json', json);
