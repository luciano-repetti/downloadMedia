import { Html, Head, Main, NextScript } from 'next/document';

const palabrasClave = [
  // Español
  'descargar videos de YouTube',
  'descargar canciones de YouTube',
  'convertir a mp3 desde YouTube',
  'convertir a mp4 desde YouTube',
  'descargar videos en alta calidad',
  'descargar videos en baja calidad',
  'descargar canciones en alta calidad',
  'descargar canciones en baja calidad',
  'conversor de YouTube a mp3',
  'conversor de YouTube a mp4',
  'descarga de audio de YouTube',
  'descarga de video de YouTube',
  'YouTube to mp3',
  'YouTube to mp4',
  'descargar música de YouTube',
  'descargar videos en línea',
  'convertidor de YouTube',
  'descargar contenido multimedia de YouTube',
  'descargar audio en línea',

  // Inglés
  'download YouTube videos',
  'download YouTube songs',
  'convert to mp3 from YouTube',
  'convert to mp4 from YouTube',
  'download videos in high quality',
  'download videos in low quality',
  'download songs in high quality',
  'download songs in low quality',
  'YouTube to mp3 converter',
  'YouTube to mp4 converter',
  'download audio from YouTube',
  'download video from YouTube',
  'YouTube to mp3',
  'YouTube to mp4',
  'download music from YouTube',
  'download videos online',
  'YouTube converter',
  'download multimedia content from YouTube',
  'download audio online',
];

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="description" lang="es" content="Descarga videos y canciones de YouTube fácilmente. Convierte en MP3 o MP4 con alta o baja calidad de audio o video." />
      <meta name="description" lang="en" content="Download YouTube videos and songs easily. Convert to MP3 or MP4 with high or low audio and video quality." />
      <meta name="keywords" content={palabrasClave.join(', ')} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
