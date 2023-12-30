const secondAMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secondsRestants = seconds % 60;
  
    const formattedSeconds = secondsRestants.toString().padStart(2, '0');
  
    return `${minutes}:${formattedSeconds}`;
  };

const formatNumber = (number: number) =>  {
    const numberFormated = number.toLocaleString('es-ES');
    return numberFormated;
}

export { secondAMinutes, formatNumber }