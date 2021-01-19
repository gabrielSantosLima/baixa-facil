import download from '../../services/download-videos'

export default async (req, resp) => {
    const { url } = req.query

    resp.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

    try{    
        const downloadUrl = await download(url)
        return resp.status(200)
        .json({
            url,
            download_url: downloadUrl,
            status: 200
        })
    }catch(error){
        console.log("Error: ", error)
        return resp.status(400)
        .json({
            url, 
            message: error.message, 
            status: 400
        })
    }
}
