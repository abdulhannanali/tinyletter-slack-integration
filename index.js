const { send } = require('micro');
const { NODE_ENV } = process.env;
let REQUEST_COUNT = 0;

if (!NODE_ENV || NODE_ENV === 'development') {
    require('dotenv').config();
}

const newsletterRequest = require('./newsletter');

async function requestHandler (req, res) {
    send(res, 200);

    try {
        await newsletterRequest();
    } catch (error) {
        console.error('Error occured');
        console.error(error);
    }
}

module.exports = requestHandler;