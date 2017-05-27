const firebase = require('firebase-admin');
const sa = require('./sa.json');

firebase.initializeApp({
    credential: firebase.credential.cert(sa),
    databaseURL: 'https://tinyletter-cassidoo.firebaseio.com',
});

const defaultApp = firebase.app();
const defaultDb = defaultApp.database();

const SERVER_TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;

const publishedArticlesRef = defaultDb.ref('/publishedArticles');

function getLastPublishedArticle() {
    return publishedArticlesRef.orderByKey().limitToLast(1).once('value').then(
        snapshot => {
            const value = snapshot.val();
            if (value) {
                const key = Object.keys(value)[0];
                return value[key];
            }

            return value;
        }
    );
}

function getPublishedArticles() {
    return publishedArticlesRef.orderByKey().once('value').then(snapshot => snapshot.val());
}

function updateLastCheckedTime () {
    return defaultDb.ref('/lastChecked').set(SERVER_TIMESTAMP);
}

function updatePublished (article) {
    return publishedArticlesRef.push(article);
}

function updateLastPublishedTime () {
    return defaultDb.ref('/lastPublished').set(SERVER_TIMESTAMP);
}

function endConnection () {
    firebase.database().goOffline();
}

function startConnection () {
    firebase.database().goOnline();
}

module.exports = {
    getLastPublishedArticle,
    getPublishedArticles,
    updateLastPublishedTime,
    updateLastCheckedTime,
    updatePublished,
    endConnection,
    startConnection,
}