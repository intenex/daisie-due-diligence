const fs = require('fs');
const _ = require('lodash');
const duplicateParsedCalendarData = require('./duplicatedParsedCalendarData.json');

const dedupedParsedCalendarData = _.uniqBy(duplicateParsedCalendarData, 'id');

fs.writeFile(
    `./dedupedParsedCalendarData.json`,
    JSON.stringify(dedupedParsedCalendarData),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
