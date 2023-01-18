const fs = require('fs');
const calendarJson = require('./DaisieCalendarRawDataFirst.json');

const calendarData = calendarJson.data;

const parsedCalendarData = calendarData.map((event) => ({
    start: event.attributes.start.slice(0, 7),
    attendeeCount: event.relationships.batch.data.attributes.attendeeCount,
    title: event.relationships.batch.data.relationships.workshop.data.attributes
        .title,
    teacher:
        event.relationships.batch.data.relationships.workshop.data.relationships
            .mentor.data.attributes.username,
}));

fs.writeFile(
    `./parsedCalendarData.json`,
    JSON.stringify(parsedCalendarData),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
