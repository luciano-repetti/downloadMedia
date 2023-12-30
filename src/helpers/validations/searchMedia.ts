function validateUrl(url: string) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    let urlFormated = url.replace("https://", '');
    urlFormated = urlFormated.replace("http://", '');

    return urlFormated
  }
}

export {validateUrl}
