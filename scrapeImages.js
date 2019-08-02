async function scrapeImages(url) {

    const puppeteer = require('puppeteer')

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(url)

    await page.screenshot({ path: '1.png' });

    await page.waitForSelector('img', {
        visible: true
    })

    // Execute code in the dom
    const data = await page.evaluate(() => {

        const images = document.querySelectorAll('img');

        const urls = Array.from(images).map(v => v.src);

        return urls
    });

    await browser.close();

    console.log(data)

    return data

}


module.exports.scrapeImages = scrapeImages; // Exports the function to be used elsewhere