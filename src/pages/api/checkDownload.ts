import type { NextApiRequest, NextApiResponse } from 'next'

import validUrl from 'valid-url'
import ytdl from 'ytdl-core'
import formatYouTubeUrl from './_config';


export default async function checkDownload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { URL } = req.query

    if (!URL) {
      return res.status(400).json({ error: 'YouTube URL not provided' });
    }

    const formattedUrl = formatYouTubeUrl(URL as string)

    if (!formattedUrl) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    const videoInfo = await ytdl.getInfo(formattedUrl)
    // const videoURL = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestvideo' }).url;

    const videoName = videoInfo.videoDetails.title
    const videoTime = videoInfo.videoDetails.lengthSeconds
    const videoViews = videoInfo.videoDetails.viewCount
    const videoThumbnails = videoInfo.videoDetails.thumbnails
    const videoThumbnail = videoThumbnails[videoThumbnails.length - 1].url
    const author = videoInfo.videoDetails.author

    const response = {
      name: videoName,
      time: videoTime,
      thumbnail: videoThumbnail,
      author: {
        name: author.name || null,
        thumbnail:
          author.thumbnails?.[author.thumbnails?.length - 1]?.url || null,
      },
      views: videoViews,
      videoURL: formattedUrl
    }

    res.status(200).json(response)
  } else {
    res.status(405).json({ error: 'METHOD NOT ALLOWED' })
  }
}