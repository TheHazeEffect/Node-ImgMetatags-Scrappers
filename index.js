
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const metaScrapper = require('./scrapeMetatags');
const imageScrapper = require('./scrapeImages');



exports.scrapperImages = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        const body = request.body;
        const data = await imageScrapper.scrapeImages(body.url)
        response.send(data)

    })
})

exports.scrapperMetatags = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        const body = request.body;
        const data = await metaScrapper.scrapeMetatags(body.text);
        response.send(data)

    });
})