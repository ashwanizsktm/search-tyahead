import './style.css';
import { getSuggestions, debounce } from './utils.js';

// getting DomElemet
const inputBox = document.getElementById('search-input');
const suggestionBox = document.getElementById('suggestion-Wrapper');
/* To search that
getSuggestions('pa')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => err);
*/
const resetState = () => {
  suggestionBox.classList.remove('suggestion-visible');
};

const renderDropDownItem = (list = []) => {
  const sugFreg = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement('div');
    el.innerHTML = item;
    el.classList.add('dropdown-item');
    el.setAttribute('data-key', item);
    sugFreg.appendChild(el);
  });

  suggestionBox.innerHTML = '';
  suggestionBox.appendChild(sugFreg);
};

const handleSearh = async (keyword) => {
  const result = await getSuggestions(keyword);
  console.log(result);
  if (result.length) {
    suggestionBox.classList.add('suggestion-visible');
    renderDropDownItem(result);
  }
};

const handleChangeInput = (event) => {
  const value = event.target.value;
  if (value) {
    handleSearh(value);
  } else {
    resetState();
  }
};

const handleSelect = (event) => {
  const { key } = event.target.dataset;
  if (key) {
    inputBox.value = key;
    resetState();
  }
};

inputBox.addEventListener('input', debounce(handleChangeInput, 500));

suggestionBox.addEventListener('click', handleSelect);
