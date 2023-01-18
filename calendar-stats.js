const calendarJson = require('./parsedCalendarData.json');

let totalAttendeeCount = 0;
let teacherCount = {};
let eventsPerMonth = {};
let attendeesPerMonth = {};
let teachersPerMonth = {};

for (const event of calendarJson) {
    totalAttendeeCount += event.attendeeCount;
    if (teacherCount[event.teacher]) {
        teacherCount[event.teacher] += 1;
    } else {
        teacherCount[event.teacher] = 1;
        if (teachersPerMonth[event.start]) {
            teachersPerMonth[event.start] += 1;
        } else {
            teachersPerMonth[event.start] = 1;
        }
    }
    if (eventsPerMonth[event.start]) {
        eventsPerMonth[event.start] += 1;
        attendeesPerMonth[event.start] += event.attendeeCount;
    } else {
        eventsPerMonth[event.start] = 1;
        attendeesPerMonth[event.start] = event.attendeeCount;
    }
}

console.log(`Total Attendee Count: ${totalAttendeeCount}`);
console.log(`Total Unique Teacher Count: ${Object.keys(teacherCount).length}`);
console.log(
    `Average attendees per event: ${totalAttendeeCount / calendarJson.length}`
);

for (const month of Object.keys(eventsPerMonth)) {
    console.log(`Events in ${month}: ${eventsPerMonth[month]}`);
}

for (const month of Object.keys(attendeesPerMonth)) {
    console.log(
        `Total attendees per month ${month}: ${attendeesPerMonth[month]}`
    );
}

for (const month of Object.keys(attendeesPerMonth)) {
    console.log(
        `Average attendees per month ${month}: ${
            attendeesPerMonth[month] / eventsPerMonth[month]
        }`
    );
}

for (const month of Object.keys(teachersPerMonth)) {
    console.log(`New teachers per month ${month}: ${teachersPerMonth[month]}`);
}
