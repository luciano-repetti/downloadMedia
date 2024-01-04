import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl, { ChooseFormatQuality } from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import { PassThrough } from 'stream'
import cp from 'child_process'

export default async function downloadMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { URL, downloadFormat, quality, title } = req.query

      if (!URL) {
        return res.status(400).json({ error: 'YouTube URL not provided' })
      }

      let qualityOption: ChooseFormatQuality

      if (downloadFormat === 'audio-only') {
        // Descargar solo audio
        qualityOption = quality === 'high' ? 'highestaudio' : 'lowestaudio'
      } else {
        // Descargar video y audio
        qualityOption = quality === 'high' ? 'highestvideo' : 'lowestvideo'
      }

      const videoInfo = await ytdl.getInfo(URL as string)
      const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
        quality: qualityOption,
      })

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${(title as string).substring(0, 40)}.${
          videoFormat.container
        }"`
      )

      if (downloadFormat === 'audio-only') {
        // Descargar solo audio y enviar directamente
        ytdl(URL as string, {
          filter: 'audioonly',
          quality: qualityOption,
        }).pipe(res, { end: true })

        res.setHeader('Content-Type', 'audio/mpeg')
      } else {
        // Descargar video y audio, combinarlos y enviar
        const audioStream = ytdl(URL as string, {
          filter: 'audioonly',
          quality: 'highestaudio',
        })

        const videoStream = ytdl(URL as string, {
          filter: (format) =>
            format.hasVideo &&
            (format.container === 'mp4' || format.container === 'webm'),
          quality: qualityOption,
        })

        
        
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Error downloading media' })
    }
  } else {
    res.status(405).json({ error: 'METHOD NOT ALLOWED' })
  }
}
