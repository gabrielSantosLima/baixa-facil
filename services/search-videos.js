import puppeteer from 'puppeteer'
import toMiliseconds from '../utils/miliseconds'

export default async function search(term){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/results?search_query=${term}`)
    await page.waitForTimeout(5000)
    const videos = await page.evaluate(() => {
        let videos = []
        const nodeVideos = document.querySelectorAll('ytd-video-renderer')
        
        nodeVideos.forEach(nodeVideo => {
            const title = nodeVideo.querySelector('a yt-formatted-string').innerHTML;
            const url = nodeVideo.querySelector('a#video-title').href;
            const time = nodeVideo.querySelector('span.ytd-thumbnail-overlay-time-status-renderer').textContent.trim();
            videos.push({
                title,
                url,
                time
            })
        })
        return videos
    })
    await browser.close()
    videos.map(video => video.miliseconds = toMiliseconds(video.time))
    return videos;
}