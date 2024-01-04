import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl, { Filter, ChooseFormatQuality } from 'ytdl-core';

export default async function downloadMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { URL, downloadFormat, quality, title } = req.query;

      if (!URL) {
        return res.status(400).json({ error: 'YouTube URL not provided' });
      }

      let formatFilter: Filter | undefined;
      let fileExtension: string;
      let contentType: string;
      let qualityOption: ChooseFormatQuality;

      if (downloadFormat === 'audio-only') {
        // Filtrar para obtener formatos que contienen audio
        formatFilter = 'audioonly'
        fileExtension = 'mp3';
        contentType = 'audio/mpeg';
        qualityOption = quality === 'high' ? 'highest' : 'lowest'        
      } else {
        // Filtrar para obtener formatos que contienen tanto video como audio
        formatFilter = (format) => format.hasVideo && format.hasAudio && (format.container === 'mp4' || format.container === 'webm');
        fileExtension = 'mp4';
        contentType = 'video/mp4';
        qualityOption = quality === 'high' ? 'highest' : 'lowest';
      }

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${(title as string).substring(0, 40)}.${fileExtension}"`
      );

      ytdl(URL as string, {
        filter: formatFilter,
        quality: qualityOption,
      }).pipe(res, { end: true });

      res.setHeader('Content-Type', contentType);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Error downloading media' });
    }
  } else {
    res.status(405).json({ error: 'METHOD NOT ALLOWED' });
  }
}
