//#!/usr/bin/env node

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const NotificationCenter = require('node-notifier').NotificationCenter;
const notifier = new NotificationCenter();
const URL = 'http://' + String(29) + 'rooms' + '.com';
// const URL = 'http://thoughtbrain.com';

console.log(`checking ${URL}`);

fetch(`${URL}`, {
    method: 'GET',
    headers: {
        'User-Agent': 'jbot',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': '*'
    }
})
.then((res) => res.buffer())
.then((buffer) => {
    const $ = cheerio.load(buffer);
    let found = false;

    $('a').each(function(i, elem) {
        let txt = $(this).text();
        if (!found) {
            found = txt.indexOf('Coming Soon') > -1;
        }
    });

    if (!found) {
        notifier.notify({
            title: URL,
            message: 'The site is UP!',
            sound: true,
            open: URL
        });
    }
})
.catch((err) => console.error(err));

setTimeout(() => {
    console.log('setTimeout')
}, 10000);
