import ytdl from 'ytdl-core';
import validUrl from 'valid-url';

function formatYouTubeUrl(url: string) {

  let urlFormated = url;

  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    urlFormated = 'https://' + url
  }

  if (!validUrl.isUri(urlFormated) || !ytdl.validateURL(urlFormated)) {
    return false
  }

  return urlFormated
}

function sanitizeFilename(filename: string, maxLength: number): string {
  // Remove invalid characters and limit length
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, maxLength);
}

export { formatYouTubeUrl, sanitizeFilename }