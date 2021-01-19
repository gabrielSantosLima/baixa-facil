import download from './../../services/download-videos'

export default async (req, resp) => {
  const { url } = req.query
  try{    
      await download(url)
      return resp.status(200)
      .json({
          url,
          message: 'Download realizado com sucesso!',
          status: 200
      })
  }catch(error){
      return resp.status(400)
      .json({
          url, 
          message: error, 
          status: 400
      })
  }
}
