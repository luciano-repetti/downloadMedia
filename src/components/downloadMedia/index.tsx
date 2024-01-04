import { formatNumber, secondAMinutes } from '@/helpers/helps/converts'
import { Image, Select, SelectItem } from '@nextui-org/react'
import ButtonDownload from '../buttons/buttonDownlaod'
import { VideoContext } from '@/context/providerVideo'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import axios from 'axios'

const DownloadMedia = () => {
  const { videoInfo } = useContext(VideoContext)!

  const [format, setFormat] = useState('mp4')
  const [quality, setQuality] = useState('high')

  const [loading, setLoading] = useState(false)

  const isVideoInfoLoaded = videoInfo !== null

  const handleChangeValue = (
    value: string,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(value)
  }

  const handleDownloadMedia = async () => {
    if (!format || !quality) {
      alert('Error: Empty fields');
      return;
    }
  
    try {
      setLoading(true);
      // Construir la URL de descarga directamente en lugar de utilizar axios
      const downloadUrl = `/api/downloadMedia?URL=${videoInfo?.videoURL}&downloadFormat=${format}&quality=${quality}&title=${encodeURIComponent(videoInfo?.name || '')}`;
      // Crear un enlace temporal para iniciar la descarga
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isVideoInfoLoaded ? (
        <section className="flex items-center flex-col md:flex-row gap-4 md:gap-8 w-full xl:w-2/3 bg-slate-950 p-4 md:p-8 rounded-xl backdrop-blur-sm drop-shadow-md">
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
              <span>
                Views: {formatNumber(parseInt(videoInfo?.views, 10) || 0)}
              </span>
            </div>
          </article>
          <article className="flex justify-center items-center flex-wrap md:flex-col h-full md:items-end md:justify-between gap-4">
            <Select
              defaultSelectedKeys={['video-only']}
              placeholder="Select format"
              onChange={(e) => handleChangeValue(e.target.value, setFormat)}
              isRequired
              isInvalid={format ? false : true}
              label="Format"
              className="w-full md:w-40"
              size="sm"
            >
              <SelectItem key={'video-only'} value={'video-only'}>
                MP4
              </SelectItem>
              <SelectItem key={'audio-only'} value={'audio-only'}>
                MP3
              </SelectItem>
            </Select>
            <Select
              defaultSelectedKeys={['high']}
              placeholder="Select quality"
              onChange={(e) => handleChangeValue(e.target.value, setQuality)}
              isRequired
              isInvalid={quality ? false : true}
              label="Quality"
              className="w-full md:w-40"
              size="sm"
            >
              <SelectItem key={'high'} value={'high'}>
                Highest
              </SelectItem>
              <SelectItem key={'low'} value={'low'}>
                Lowest
              </SelectItem>
            </Select>
            <ButtonDownload className='w-full md:w-40' loading={loading} onClick={handleDownloadMedia} />
          </article>
        </section>
      ) : null}
    </>
  )
}

export default DownloadMedia
