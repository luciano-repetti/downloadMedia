// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// pages/api/convert.js

import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import validUrl from 'valid-url';

ffmpeg.setFfmpegPath(ffmpegPath ?? '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { youtubeLink } = req.body;

      // Formatea y valida la URL de YouTube
      const formattedUrl = formatYouTubeUrl(youtubeLink);
      if (!formattedUrl) {
        return res.status(400).json({ error: 'URL de YouTube no válida' });
      }

      console.log(formattedUrl);

      const videoInfo = await ytdl.getInfo(formattedUrl);
      const videoURL = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' }).url;
      const videoName = videoInfo.videoDetails.title;
      const videoTime = videoInfo.videoDetails.lengthSeconds;
      const videoThumbnails = videoInfo.videoDetails.thumbnails;
      const videoThumbnail = videoThumbnails[videoThumbnails.length - 1].url;

      console.log(videoThumbnail);

      // Enviar el enlace del video MP4
      res.status(200).json({ videoURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en la obtención del enlace del video MP4' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

function formatYouTubeUrl(url: string) {
  if (!validUrl.isUri(url) || !ytdl.validateURL(url)) {
    return null; // URL no válida
  }

  // Corregir el formato de la URL según sea necesario
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    return 'https://' + url;
  }

  return url;
}
