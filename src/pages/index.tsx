import Image from 'next/image'
import { Inter } from 'next/font/google'
import SearchMedia from '@/components/searchMedia'
import DownloadMedia from '@/components/downloadMedia'
import { VideoProvider } from '@/context/providerVideo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className="dark text-foreground bg-ebony-950 relative overflow-hidden flex justify-center flex-auto min-h-screen"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          transform: 'translate(-50%, -50%)',
        }}
        className="min-h-screen bg-cover bg-center bg-image-colors"
      ></div>
      <div className='flex w-full flex-col items-center relative max-w-[80%] pt-32 gap-20 z-50'>
        <VideoProvider>
          <SearchMedia />
          <DownloadMedia />
        </VideoProvider>
      </div>
    </main>
  )
}
