import { validateUrl } from '@/helpers/validations/searchMedia'
import { Button, Input } from '@nextui-org/react'
import { useState, useEffect, useContext } from 'react'
import ButtonCopy from './buttons/buttonCopy'
import axios from 'axios'
import { VideoContext } from '@/context/providerVideo'

const SearchMedia = () => {
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { setVideo } = useContext(VideoContext)!

  const changeInput = (value: string) => {
    setValueInput(value)
    const validatedValue = validateUrl(value)
    if (typeof validatedValue === 'string') {
      setValueInput(validatedValue)
    }
  }

  const handleChange = (e: any) => {
    changeInput(e.target.value)
  }

  const pastedLink = async () => {
    const text = await navigator.clipboard.readText()
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

    if (urlRegex.test(text)) {
      changeInput(text)
    }
  }

  const handleSearch = async () => {
    const linkYoutube = valueInput

    try {
      setLoading(true);
      const response = await axios.get(`/api/checkDownload?URL=${linkYoutube}`)
      console.log(response.data);
      setVideo(response.data);
      setValueInput('');
    } catch (error) {
      alert('An error occurred with the search')
      setVideo(null)
      setValueInput('')
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:items-center w-full md:flex-row xl:w-2/3 gap-2 md:gap-4 h-min">
      <Input
        type="url"
        value={valueInput}
        onChange={handleChange}
        placeholder="Insert link to media"
        labelPlacement="outside"
        classNames={{ input: ['caret-ebony-50', 'text-white'] }}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://</span>
          </div>
        }
      />
      <div className='flex gap-2 md:gap-4'>
        <ButtonCopy action={pastedLink} />
        <Button isLoading={loading} onClick={() => handleSearch()} className="w-full md:w-fit bg-ebony-500">
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchMedia
