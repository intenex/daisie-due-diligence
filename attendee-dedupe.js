const fs = require('fs');
const _ = require('lodash');
const duplicatedFullAttendeeData = require('./duplicatedFullAttendeeData.json');
const dedupedAttendeeData = _.uniqBy(duplicatedFullAttendeeData, 'id');

fs.writeFile(
    `./dedupedAttendeeData.json`,
    JSON.stringify(dedupedAttendeeData),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
