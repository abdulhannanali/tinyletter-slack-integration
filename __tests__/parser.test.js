const parser = require('../tinyletterParser');
const fs = require('fs');
const path = require('path');

const { readArchive } = require('./helpers') 

const sampleArchive = readArchive('sample-archive');
const sampleArchive1 = readArchive('sample-archive-1');

test('parse the list of messages in archive', () => {
    const parsedMessages = parser.getMessagesList(sampleArchive);
    console.log(parsedMessages);

    expect(parsedMessages).toMatchSnapshot();
    expect(parsedMessages).toHaveLength(10);
});

test('parse the list of messages in cassidoo\'s archive', () => {
    const parsedMessages = parser.getMessagesList(sampleArchive1);
    expect(parsedMessages).toMatchSnapshot();
    expect(parsedMessages).toHaveLength(8);
});