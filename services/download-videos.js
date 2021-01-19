import puppeteer from 'puppeteer'
import { click, type, wait } from './search-elements'

async function getUrlDownloadMusic(page){
    const url = await page.evaluate(()=>{
        const selector = '.modal-content a.btn-file'
        return document.querySelector(selector).href
    })
    if(url) return url
    await wait(page, 2000)
    return getUrlDownloadMusic(page)
}

export default async function download(url, time = 0){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try{
        await page.goto(`https://www.y2mate.com/youtube-mp3/`)
    }catch(error){
        throw new Error('Sem conexão ou site de download de músicas está indisponível no momento')
    }

    await type(page,'input', url)
    await click(page, '#btn-submit')
    await click(page,'#process_mp3')
    await page.bringToFront()
    await wait(page, 3000)

    let downloadUrl

    try{
        downloadUrl = await getUrlDownloadMusic(page)
    }catch(error){
        throw new Error('Link de download não encontrado!')
    }
    await browser.close()
    return downloadUrl
}