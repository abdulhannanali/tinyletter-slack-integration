const { TINYLETTER_BASE_URL, getArchiveUrl } = require('../tinyletterFetcher.js');

const { readArchive } = require('./helpers');
const { fetchArchive } = require('../tinyletterFetcher');

test('getArchiveUrl', () => {
    const url = getArchiveUrl('cassidoo');
    const url1 = getArchiveUrl('thedaggetts');

    expect(url).toMatchSnapshot();
    expect(url1).toMatchSnapshot();
});
