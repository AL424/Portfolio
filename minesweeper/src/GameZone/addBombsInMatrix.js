export default (matrix, bombsArr) => {
  const numOfCells = matrix.length; 

  bombsArr.forEach(bobmPosition => { 
    const i = Math.floor(bobmPosition / numOfCells);
    const j = bobmPosition - numOfCells * i;

    matrix[i][j] = 'bomb';

    if (matrix[i - 1] !== undefined) {
      if (matrix[i - 1][j - 1] !== undefined && matrix[i - 1][j - 1] !== 'bomb') matrix[i - 1][j - 1] += 1;
      if (matrix[i - 1][  j  ] !== undefined && matrix[i - 1][  j  ] !== 'bomb') matrix[i - 1][  j  ] += 1;
      if (matrix[i - 1][j + 1] !== undefined && matrix[i - 1][j + 1] !== 'bomb') matrix[i - 1][j + 1] += 1;
    }

    if (matrix[  i  ][j - 1] !== undefined && matrix[  i  ][j - 1] !== 'bomb') matrix[  i  ][j - 1] += 1;
    if (matrix[  i  ][j + 1] !== undefined && matrix[  i  ][j + 1] !== 'bomb') matrix[  i  ][j + 1] += 1;

    if (matrix[i + 1] !== undefined) {
      if (matrix[i + 1][j - 1] !== undefined && matrix[i + 1][j - 1] !== 'bomb') matrix[i + 1][j - 1] += 1;
      if (matrix[i + 1][  j  ] !== undefined && matrix[i + 1][  j  ] !== 'bomb') matrix[i + 1][  j  ] += 1;
      if (matrix[i + 1][j + 1] !== undefined && matrix[i + 1][j + 1] !== 'bomb') matrix[i + 1][j + 1] += 1;
    }
  })

  return matrix;
}