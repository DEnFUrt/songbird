const getRandomIntInclusive = (min, max, prevRandom) => {
  let nextRandom;
  
  min = Math.ceil(min);
  max = Math.floor(max);
  
  do {
    nextRandom = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  } while (prevRandom === nextRandom);

  return nextRandom;
};

export {getRandomIntInclusive};