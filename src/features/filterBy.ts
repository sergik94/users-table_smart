export function filterTextData(targetString: string, query: string) {
  return targetString.toLowerCase().includes(query.toLowerCase());
}

const getNumbersFromString = (str: string) => {
  return str
    .split('')
    .filter((ch) => !isNaN(+ch))
    .join('');
};

export function filterNumberData(targetString: string, query: string) {
  const targetNumbers = getNumbersFromString(targetString);
  const queryNumbers = getNumbersFromString(query);

  return filterTextData(targetNumbers, queryNumbers);
}
