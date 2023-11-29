export default (min, max) => { // min, max includes 
  const randomNumber = min + Math.round( Math.random() * (max - min) );
  return randomNumber;
}