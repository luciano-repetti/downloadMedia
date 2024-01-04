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
  const sanitized = filename.replace(/[^\p{L}a-zA-Z0-9.-]/gu, '_').replace(/\s+/g, '_').substring(0, maxLength);

  // console.log('Original filename:', filename);
  // console.log('Sanitized filename:', sanitized);

  return sanitized;
}

export { formatYouTubeUrl, sanitizeFilename }