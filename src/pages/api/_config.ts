import ytdl from 'ytdl-core';
import validUrl from 'valid-url';

export default function formatYouTubeUrl(url: string) {

  let urlFormated = url;

  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    urlFormated = 'https://' + url
  }

  if (!validUrl.isUri(urlFormated) || !ytdl.validateURL(urlFormated)) {
    return false
  }

  return urlFormated
}