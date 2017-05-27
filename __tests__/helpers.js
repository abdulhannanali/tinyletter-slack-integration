const fs = require('fs');
const path = require('path');

function readArchive(archiveName) {
    return fs.readFileSync(path.join(__dirname, 'sampleData', archiveName + '.html')).toString();
}

module.exports = {
    readArchive
}