const fs = require('fs');
const calendarJson = require('./DaisieCalendarThird.json');

const calendarData = calendarJson.data;

const parsedCalendarData = calendarData.map((event) => ({
    id: event.id,
    workshopBatch: event.relationships.batch?.data?.id,
    start: event.attributes.start.slice(0, 7),
    attendeeCount:
        event.relationships.batch?.data?.attributes?.attendeeCount ??
        event.attributes.attendeeCount,
    title:
        event.relationships.batch?.data?.relationships?.workshop?.data
            ?.attributes?.title ??
        event.relationships.project.data.attributes.title,
    teacher:
        event.relationships.batch?.data?.relationships?.workshop?.data
            ?.relationships?.mentor?.data?.attributes?.username ??
        event.relationships.project.data.relationships.owner.data.attributes
            .username,
}));

fs.writeFile(
    `./parsedCalendarDataC.json`,
    JSON.stringify(parsedCalendarData),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
