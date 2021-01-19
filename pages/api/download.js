import download from '../../services/downloadMusic'

export default async (req, resp) => {
    const { url } = req.query 
  
    resp.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

    try{
        const downloadUrl = await download(url)
        return resp.status(200)
        .json({
            url,
            download_url: downloadUrl,
            message: 'Download realizado com sucesso!',
            status: 200
        })
    }catch(error){
        return resp.status(400)
        .json({
            url, 
            message: error.message, 
            status: 400
        })
    }
}
