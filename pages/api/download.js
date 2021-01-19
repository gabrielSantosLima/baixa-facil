import download from './../../services/download-videos'

export default async (req, resp) => {
    const video = req.body 
  
    resp.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

    try{
        const downloadUrl = await download(video.url, video.time)
        return resp.status(200)
        .json({
            url: video.url,
            download_url: downloadUrl,
            message: 'Download realizado com sucesso!',
            status: 200
        })
    }catch(error){
        return resp.status(400)
        .json({
            url: video.url, 
            message: error.message, 
            status: 400
        })
    }
}
