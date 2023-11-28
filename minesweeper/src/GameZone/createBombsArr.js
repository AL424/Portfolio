import createRandomNumber from "./createRandomNumber";

export default (numberBobms = 10, numberCells = 100, notBomb) => {
  const bombsArr = [];

  while (bombsArr.length < numberBobms) {
    const num = createRandomNumber(0, numberCells - 1);
    if (!bombsArr.includes(num) && num !== notBomb) bombsArr.push(num);
  }

  return bombsArr;
}