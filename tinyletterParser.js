/**
 * tinyletterParser.js
 * Parses the list of tiny letters given in a single archive page
 * 
 * This is valid only for archive pages, may not work due to markup inconsistencies,
 * that can come up, but it'll keep working as long as we provide it with markup it
 * expects, in the future we can update the markup it expects to better suit our needs
 */
const cheerio = require('cheerio');

/**
 * Parses the htmlBody of the Archive to give us a list of messages
 * with following details
 * - id
 * - title
 * - link
 * - snippet
 * - date
 * 
 * @param {string} htmlBody page markup containing the messages in the body
 * @return {Array<Object>} array of the messagess containing the objects with mentioned fields
 */
function getMessagesList(htmlBody) {
    const $ = cheerio.load(htmlBody);
    const parsedMessages = [];

    const messageList = $('li.message-item');
    messageList.each((index, elem) => {
        const id = $(elem).attr('id');
        const linkElem = $(elem).children('.message-link');
        const title = linkElem.text();
        const link = linkElem.attr('href');
        const snippet = $(elem).children('.message-snippet').text();
        const date = $(elem).children('.message-date').text();

        parsedMessages.push({
            id,
            link,
            title,
            snippet,
            date,
        });
    });

    return parsedMessages;
}

module.exports = { getMessagesList };