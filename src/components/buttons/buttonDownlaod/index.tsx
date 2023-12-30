import { Button } from '@nextui-org/react'
import Image from 'next/image'

const ButtonDownload = () => {
  return (
    <Button color="success" className='w-40 bg-ebony-500 text-white' endContent={<DownloadIcon />}>
      Download
    </Button>
  )
}

const DownloadIcon = () => {
  return (
    <Image width={16} height={16} alt='icon download' src='/icons/download-file-icon.svg' />
  )
}

export default ButtonDownload
