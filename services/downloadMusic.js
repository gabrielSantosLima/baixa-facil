import puppeteer from 'puppeteer'
import { click, type, wait } from './pageManager'

async function getUrlDownloadMusic(page, selector){
    const url = await page.$eval(selector, elm => elm.href)
    if(url) return url
    await wait(page, 2000)
    return getUrlDownloadMusic(page,selector)
} 

export default async function download(url){
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
    let downloadUrl
    try{
        downloadUrl = await getUrlDownloadMusic(page, '.modal-content a')
    }catch(error){
        throw new Error('Link de download não encontrado!')
    }
    await browser.close()
    return downloadUrl
}