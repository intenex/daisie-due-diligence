const fs = require('fs');
const _ = require('lodash');
const duplicateParsedCalendarData = require('./duplicatedParsedCalendarDataWorkshopBatches.json');

const dedupedParsedCalendarData = _.uniqBy(duplicateParsedCalendarData, 'id');

fs.writeFile(
    `./dedupedParsedCalendarDataWorkshopBatches.json`,
    JSON.stringify(dedupedParsedCalendarData),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
