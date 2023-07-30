function genRamdomNumber(minLongitud) {
  let ramdomNumber;

  do {
    ramdomNumber = Math.round(Math.random() * 10 ** minLongitud);
  } while (ramdomNumber < 10 ** (minLongitud - 1));

  return ramdomNumber;
}

module.exports = {
  genRamdomNumber,
};
