const axios = require('axios');
const url = require('url');

const TINYLETTER_BASE_URL = 'https://tinyletter.com/'

function fetchArchive(username) {
    const url = getArchiveUrl(username);
    return axios.get(url).then(response => {
        return response && response.data;
    });
}

function getArchiveUrl(username) {
    return TINYLETTER_BASE_URL + username + '/archive'
}

module.exports = { TINYLETTER_BASE_URL, fetchArchive, getArchiveUrl };