const fs = require('fs');

// an array of filenames to concat
const files = [];

const theDirectory = __dirname; // or whatever directory you want to read
fs.readdirSync(theDirectory).forEach((file) => {
    files.push(file);
});

const filteredFiles = files.filter((file) => file !== 'attendee-concat.js');

const fullData = [];

for (file of filteredFiles) {
    data = fs.readFileSync(`./${file}`);
    fullData.push(JSON.parse(data));
}

const fullDataFlat = fullData.flat();

fs.writeFile(
    `../fullAttendeeData.json`,
    JSON.stringify(fullDataFlat),
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
