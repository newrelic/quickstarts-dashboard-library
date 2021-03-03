exports.findQueries = (dashboard, data) => {
  if (!data) {
    data = [];
  }

  for (const key in dashboard) {
    if (Object.prototype.hasOwnProperty.call(dashboard, key)) {
      if (Array.isArray(dashboard[key]) || typeof dashboard[key] === 'object') {
        data = exports.findQueries(dashboard[key], data);
      }

      if (key === 'query') {
        data.push(dashboard[key]);
      }
    }
  }

  return data;
};

exports.findSources = (queries) => {
  const sources = [];
  // We support a max of 7 event types for a query, if anybody uses more than that it, just add one more (\s*,\s*\w+)?. Repeat until user is happy
  // My regex isn't good enough to make this pretty
  const re = new RegExp(
    /FROM (\w+)(\s*,\s*\w+)?(\s*,\s*\w+)?(\s*,\s*\w+)?(\s*,\s*\w+)?(\s*,\s*\w+)?(\s*,\s*\w+)?/gi
  );
  for (const query of queries) {
    const results = re.exec(query);
    if (results) {
      // Remove first element, the match
      for (let result of results.slice(1)) {
        // Ignore empty results
        if (!result) {
          continue;
        }

        // Remove ,
        result = result.replace(',', '');

        // Remove whitespace before and after string
        result = result.replace(/ /g, '');

        // Add element to sources if it's not in there already
        if (!sources.includes(result)) {
          sources.push(result);
        }
      }
    }
  }

  return sources;
};
