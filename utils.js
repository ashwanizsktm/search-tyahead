import { FRUITS } from './data.js';

export const getSuggestions = async (keyword) => {
  const result = FRUITS.filter(
    (i) =>
      i.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result);
      if (!result) reject('Error while fetching');
    }, 1000);
  });
};

export const debounce = (fn, delay = 500) => {
  let timer;
  return function () {
    const args = arguments;
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(self, args), delay);
  };
};
