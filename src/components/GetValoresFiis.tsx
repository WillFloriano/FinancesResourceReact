// import {JSDOM} from 'jsdom'
// import {NextApiRequest,NextApiResponse} from 'next'

// const getValores = async (req:NextApiRequest, res: NextApiResponse, ativo) =>{
//     const response = await fetch('https://www.google.com/finance/quote/' + ativo + ':BVMF?hl=pt')
//     const html = await response.text()

//     const dom = new JSDOM(html)
//     const document = dom.window.document

//     const valores = document.querySelector('YMlKec fxKbKc')?.textContent

//     return valores

// }

// export default getValores

const puppeteer = require('puppeteer');

const valores = async (ativo) => {
    await puppeteer.creatBrownserFetcher().download(
        puppeteer.PUPPERTEER_REVISIONS.chromium
    );

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com/finance/quote/' + ativo + ':BVMF?hl=pt', {waitUntil: 'domcontentloaded'});

    const body = await page.evaluate(() => {
        const valor = document.querySelector('#mp-otd > YMlKec fxKbKc')
    });

    console.log(body)

    return body.valor;

}

exports.valores = valores;