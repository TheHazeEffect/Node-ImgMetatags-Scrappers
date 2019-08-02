// Pros
// -- Simple and fast

// cons
// -- does not run javascript

async function scrapeMetatags(text) {
    const cheerio = require('cheerio');
    const getUrls = require('get-urls');
    const fetch = require('node-fetch');
    console.log("Inside scrapeMetatags")

    const urls = Array.from(getUrls(text)); // make on array of Urls

    console.log("test: " + text)
    const requests = urls.map(async url => {
        console.log("url: " + url)

        const res = await fetch(url);

        const html = await res.text();
        const $ = cheerio.load(html)
        // dollar sign is a function that allows you to select nodes from the domm

        const getMetatag = (name) =>
            $(`meta[name=${name}]`).attr('content') ||
            $(`meta[property="og:${name}"]`).attr('content') ||
            $(`meta[property="twitter:${name}"]`).attr('content');


        return {
            url,
            title: $('title').first().text(),
            favicon: $('link[rel="shortcut icon"]').attr('href'),
            description: getMetatag('description'),
            image: getMetatag('image'),
            author: getMetatag('author')
        }
    });

    return Promise.all(requests);
}

module.exports.scrapeMetatags = scrapeMetatags; // Exports the function to be used elsewhere