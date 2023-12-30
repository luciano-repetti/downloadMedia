import { formatNumber, secondAMinutes } from '@/helpers/helps/converts'
import { Image, Select, SelectItem } from '@nextui-org/react'
import ButtonDownload from '../buttons/buttonDownlaod'
import { VideoContext } from '@/context/providerVideo'
import { useContext } from 'react'

const DownloadMedia = () => {
  const { videoInfo } = useContext(VideoContext)!

  const isVideoInfoLoaded = videoInfo !== null

  return (
    <>
      {isVideoInfoLoaded ? (
        <section className="flex items-center gap-8 w-2/3 bg-slate-950 p-8 rounded-xl backdrop-blur-sm drop-shadow-md">
          <Image
            width={300}
            alt={`Image of video ${videoInfo?.name}`}
            src={videoInfo?.thumbnail}
            isBlurred
          />
          <article className="flex flex-col gap-8 flex-1 text-white">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl">{videoInfo?.name}</h3>
              <div className="flex items-center gap-2">
                <Image
                  className="rounded-full"
                  width={35}
                  height={35}
                  src={videoInfo?.author.thumbnail}
                  alt={`Image of author ${videoInfo?.author?.name}`}
                />
                <span>{videoInfo?.author?.name}</span>
              </div>
              <span>Time: {secondAMinutes(videoInfo?.time || 0)}</span>
              <span>Views: {formatNumber(parseInt(videoInfo?.views, 10) || 0)}</span>
            </div>
          </article>
          <article className="flex flex-col h-full items-end justify-between">
            <Select
              defaultSelectedKeys={['mp4']}
              placeholder="Select format"
              className="w-40"
              size='sm'
            >
              <SelectItem key={'mp4'} value={'mp4'}>
                MP4
              </SelectItem>
              <SelectItem key={'mp3'} value={'mp3'}>
                MP3
              </SelectItem>
            </Select>
            <ButtonDownload />
          </article>
        </section>
      ) : null}
    </>
  )
}

export default DownloadMedia
