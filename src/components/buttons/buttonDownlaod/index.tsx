import { Button } from '@nextui-org/react'
import Image from 'next/image'

const ButtonDownload = ({
  onClick: action,
  loading,
  className,
}: {
  onClick?: () => void
  loading: boolean
  className?: string
}) => {
  return (
    <Button
      color="success"
      className={`bg-ebony-500 text-white ${className}`}
      onClick={action}
      isLoading={loading}
      endContent={<DownloadIcon />}
    >
      Download
    </Button>
  )
}

const DownloadIcon = () => {
  return (
    <Image
      width={16}
      height={16}
      alt="icon download"
      src="/icons/download-file-icon.svg"
    />
  )
}

export default ButtonDownload
