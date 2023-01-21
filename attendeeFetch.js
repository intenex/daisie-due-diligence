// https://selleck.production.daisie.com/v1/workshopBatch/workshopBatch_bvLhAqkU29JaUTQRbNioH4/attendees
// to fetch all the attendees from a given class
// wow this is some seriously bad privacy leak of all user data pretty wild
// but now we can figure out exactly how many unique users there are
// and also exactly what locales they're from so how much they may be paying
// and how many recurring attendees there are
// and the real lifecycle of a user
const fs = require('fs');
const got = require('got');
const calendarJson = require('./dedupedParsedCalendarDataWorkshopBatches.json');

let eventIndex = 1;

const calendarJsonFiltered = calendarJson.filter(
    (event) => event.workshopBatch
);

const fetchAllUsers = async () => {
    for (const event of calendarJsonFiltered) {
        const workshopBatch = event.workshopBatch;
        try {
            const { data } = await got
                .get(
                    `https://selleck.production.daisie.com/v1/workshopBatch/${workshopBatch}/attendees`
                )
                .json();
            fs.writeFile(
                `./eventAttendees/${eventIndex}.json`,
                JSON.stringify(data),
                (err) => {
                    if (err) {
                        console.error(err);
                    }
                }
            );
            eventIndex += 1;
        } catch (err) {
            console.error(`workshopBatch ${workshopBatch} not found`);
        }
    }
};

fetchAllUsers();
