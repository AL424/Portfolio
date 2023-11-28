export default (n) => {
  return (new Array(n).fill(0).map(() => {
    return new Array(n).fill(0);
  }))
}