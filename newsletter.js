const parser = require('./tinyletterParser');
const fetcher = require('./tinyletterFetcher');
const letterStore = require('./letter-store');
const { postToSlack }  = require('./slackPoster');

const { NEWSLETTER_NAME } = process.env;

/**
 * Cron function that's run everytime we need to make changes
 * This works like a cron job, so all the parameters we need to initiate
 * the request are already there
 */
async function newsletterRequest () {
    letterStore.startConnection();

    await letterStore.updateLastCheckedTime();
    const newsletter = await fetcher.fetchArchive(NEWSLETTER_NAME);
    const parsedLetter = parser.getMessagesList(newsletter);
    const lastPublished = await letterStore.getLastPublishedArticle();
    const articleToPublish = compareLatestArticle(parsedLetter, lastPublished);

    if (articleToPublish) {
        await letterStore.updatePublished(articleToPublish);
        await letterStore.updateLastPublishedTime();
        await postToSlack(articleToPublish);
        console.log('Published ' + articleToPublish.id);
    } else {
        console.log('No latest article found');
    }

    letterStore.endConnection();
}

function compareLatestArticle(newsletter, lastPublished) {
    const latestArticle = getLatestLetter(newsletter);
    if (!lastPublished) {
        return latestArticle;
    }

    if (latestArticle.id > lastPublished.id) {
        return latestArticle;
    }
}

function getLatestLetter(newsletter) {
    return newsletter.shift();
}

module.exports = newsletterRequest;