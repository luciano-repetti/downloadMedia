import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConvertMedia',
  description: 'Travel Blog for the Adventurous: Read about Our Adventures and Get Inspired to Explore',
  keywords: [
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
  ]
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
}
