const fs = require('fs');
const attendeeData = require('./dedupedAttendeeData.json');

let locations = {};
let flairs = {};

for (const user of attendeeData) {
    const location = user.relationships.location?.data?.attributes?.name;
    const flair = user.attributes.flair;
    if (location) {
        if (locations[location]) {
            locations[location] += 1;
        } else {
            locations[location] = 1;
        }
    }
    if (flairs[flair]) {
        flairs[flair] += 1;
    } else {
        flairs[flair] = 1;
    }
}

console.log(`Total unique attendees: ${attendeeData.length}`);
console.log(locations);
console.log(flairs);
