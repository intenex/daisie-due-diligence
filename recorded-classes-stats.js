// fetched from https://selleck.production.daisie.com/v1/workshops/catchUps?pageSize=200&pageNumber=1
// need to pass a daisie-token auth header jwt. Can retrieve one when logged in from the https://www.daisie.com/classes page with a Network tab inspect
// one used presently: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQyNzEyOTAsImV4cCI6MTY3Njg2MzI5MCwiaXNzIjoiZGFpc2llLXByb2R1Y3Rpb24iLCJzdWIiOiJ1c2VyX2NxRlk5bXZRVmR2N0pSTmNqYTJuc20ifQ.j-HZGzS4vh84eeKvNna32rzoh5Un2Q2IWeaC71o8q5Y

const classesJson = require('./DaisieRecordedClasses.json');

const classes = classesJson.data;

let teacherCount = {};
let eventsPerMonth = {};
let totalDuration = 0;

for (const recordedClass of classes) {
    const month = recordedClass.attributes.createdAt.slice(0, 7);
    const teacher = recordedClass.relationships.mentor.data.id;
    if (teacherCount[teacher]) {
        teacherCount[teacher] += 1;
    } else {
        teacherCount[teacher] = 1;
    }
    if (eventsPerMonth[month]) {
        eventsPerMonth[month] += 1;
    } else {
        eventsPerMonth[month] = 1;
    }
    totalDuration +=
        recordedClass.relationships.onDemandMedias.data[0].relationships
            .videoStream.data.attributes.duration;
}

console.log(`Total Recorded Classes: ${classes.length}`);
console.log(`Total Unique Teacher Count: ${Object.keys(teacherCount).length}`);
console.log(`Total Duration in Hours: ${totalDuration / 60 / 60}`);
console.log(
    `Average Duration in Minutes: ${totalDuration / 60 / classes.length}`
);

for (const month of Object.keys(eventsPerMonth)) {
    console.log(`Events in ${month}: ${eventsPerMonth[month]}`);
}
