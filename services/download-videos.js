import puppeteer from 'puppeteer'

async function downloadMusic(page){
    const selector = '.modal-content a.btn-file'
    const url = await page.evaluate(()=>{
        const selector = '.modal-content a.btn-file'
        return document.querySelector(selector).href
    })
    console.log("Link: ",url)
    if(url) {
        console.log(url)
        await page.goto(downloadUrl)
        await page.waitForTimeout(time / 2)
        return
    }
    await page.waitForTimeout(2000)
    downloadMusic(page)
}

export default async function download(url, time = 0){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.y2mate.com/youtube-mp3/`)
        .catch(error => {
            throw new Error('Sem acesso ao site de download da música')
            return
        })
    await page.waitForTimeout(4000)
    await page.type('input', url)
    await page.click('#btn-submit')
    await page.waitForTimeout(3000)
    await page.click('#process_mp3')
    await page.bringToFront()
    await page.waitForTimeout(3000)
    await downloadMusic(page)
    await browser.close()
}