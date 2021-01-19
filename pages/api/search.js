import search from './../../services/search-videos'

export default async (req, resp) => {
  const { q } = req.query
    try{
        const videos = await search(q)
        return resp.status(200)
        .json({
            query: q,
            videos,
            status: 200  
        })
    }catch(error){
        console.log(error)
        return resp.status(400).json({
            query: q, 
            message: error, 
            status: 400
        })
    }
}
