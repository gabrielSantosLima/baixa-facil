import download from './../../services/download-videos'

export default async (req, resp) => {
  const video = req.body    
  try{    
      await download(video.url, video.time)
      return resp.status(200)
      .json({
          url: video.url,
          message: 'Download realizado com sucesso!',
          status: 200
      })
  }catch(error){
      return resp.status(400).json({
          url: video.url, 
          message: error, 
          status: 400
      })
  }
}
