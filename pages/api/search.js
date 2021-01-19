import search from './../../services/search-videos'

export default async (req, resp) => {
    const { q } = req.query

    resp.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')

    try{
        const videos = await search(q)
        return resp.status(200)
        .json({
            query: q,
            videos,
            status: 200  
        })
    }catch(error){
        return resp.status(400)
        .json({
            query: q, 
            message: error.message, 
            status: 400
        })
    }
}
