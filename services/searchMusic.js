import { wait, getBrowser } from './pageManager'
import { toMiliseconds } from '../utils/miliseconds'

export default async function search(term){
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    try{
        await page.goto(`https://www.youtube.com/results?search_query=${term}`)
    }catch(error){
        throw new Error('Sem conexão ou site de busca por músicas está indisponível no momento')
    }

    await wait(page, 5000)
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