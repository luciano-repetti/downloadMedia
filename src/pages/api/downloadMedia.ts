import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from 'ytdl-core';
import formatYouTubeUrl from "./_config";

export default async function downloadMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const {
        URL, downloadFormat, quality, title,
      } = req.query;

      if (!URL) {
        return res.status(400).json({ error: 'YouTube URL not provided' });
      }
  
      const formattedUrl = formatYouTubeUrl(URL as string)
  
      if (!formattedUrl) {
        return res.status(400).json({ error: 'Invalid YouTube URL' })
      }
  

      if (downloadFormat === 'audio-only') {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${(title as string).substring(0, 40)}.mp3`,
        );
        ytdl(URL as string, {
          filter: 'audioonly',
          quality: quality === 'high' ? 'highestaudio' : 'lowestaudio',
        }).pipe(res);
      } else {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${(title as string).substring(0, 25)}.mp4"`,
        );
        ytdl(URL as string, {
          filter: format => format.container === 'mp4' || format.container === 'webm',
          quality: quality === 'high' ? 'highestvideo' : 'lowestvideo',
        }).pipe(res);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Error en la descarga del media' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
  