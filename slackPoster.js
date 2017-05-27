/**
 * slackPoster
 * Post new articles to slack so people can learn about the content.
 */

const { SLACK_WEBHOOK_URL, AUTHOR_TWITTER_HANDLE } = process.env;
const axios = require('axios');

function postToSlack(article) {
    const message = formatSlackMessage(article);
    return axios.post(SLACK_WEBHOOK_URL, message);
}

function formatSlackMessage (article) {
    const twitter_link = `<https://twitter.com/@${AUTHOR_TWITTER_HANDLE}|@${AUTHOR_TWITTER_HANDLE}>`

    const text = `${twitter_link} posted a :fire: tiny letter with wisdom for champs :clap: :raised_hands: :partyparrot:`;

    const attachments = [
        {
            fallback: article.title + ' ' + article.link,
            title: article.title,
            title_link: article.link,
            text: article.snippet,
            color: '#ED1F24',
            fields: [
                {
                    title: 'Date',
                    value: article.date,
                    short: false
                }
            ],
            footer: 'cassidoo\'s tinyletter archive'
        }
    ];

    return { text, attachments };
}

module.exports = { postToSlack };