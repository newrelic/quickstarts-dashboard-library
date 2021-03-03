const fs = require('fs');
const yaml = require('js-yaml');

exports.getSources = () => {
  return fs.readdirSync('./sources').map((sourceFile) => {
    const sourceContents = fs.readFileSync(`./sources/${sourceFile}`, 'utf8');

    const source = yaml.safeLoad(sourceContents);

    // Do quick sanity check
    if (!('name' in source)) {
      console.error(`name is missing in source ${sourceFile}`);
    }
    if (!('url' in source)) {
      console.error(`url is missing in source ${sourceFile}`);
    }
    if (!('eventTypes' in source)) {
      console.error(`eventTypes is missing in source ${sourceFile}`);
    }

    return source;
  });
};
