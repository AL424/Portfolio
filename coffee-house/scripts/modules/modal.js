const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

export const openModal = (card) => {
  if (!modal || !overlay) return;

  const img = modal.querySelector('.modal__img');
  img.src = card.img;
  img.alt = card.name;

  const title = modal.querySelector('.modal__title');
  title.textContent = card.name;

  const text = modal.querySelector('.modal__text');
  text.textContent = card.description;

  const size = modal.querySelector('._size');
  const sizeLabels = size.querySelectorAll('label');
  sizeLabels.forEach((label) => label.remove());
  Object.values(card.sizes).forEach((value, index) => {
    const label = document.createElement('label');
    label.className = 'modal__size';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'size';
    input.value = value['add-price'];
    if (index === 0) input.checked = true;

    label.append(input);
    label.append(value.size);

    size.append(label);
  })

  const add = modal.querySelector('._add');
  const addLabels = add.querySelectorAll('label');
  addLabels.forEach((label) => label.remove());
  Object.values(card.additives).forEach((value) => {
    const label = document.createElement('label');
    label.className = 'modal__add';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'add';
    input.value = value['add-price'];

    label.append(input);
    label.append(value.name);

    add.append(label);
  });

  const priceElem = modal.querySelector('.modal__sum');
  priceElem.dataset.basePrice = card.price;
  priceElem.textContent = `$${card.price}`;

  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
}

const closeBtn = document.querySelector('.modal__btn');

const closeModal = () => {
  document.body.classList.remove('no-scroll');
  [modal, overlay].forEach((item) => item.classList.remove('open'))
}

[closeBtn, overlay].forEach((item) => item.addEventListener('click', () => closeModal()));

modal.addEventListener('input', () => {
  const priceElem = modal.querySelector('.modal__sum');
  const price = Number(priceElem.dataset.basePrice);

  const sizeInputs = Array.from(modal.querySelectorAll('._size input'));
  const sizeInputChecked = sizeInputs.find((elem) => elem.checked);
  const sizeSum = Number(sizeInputChecked.value);
  
  const addInputs = Array.from(modal.querySelectorAll('._add input'));
  const addInputsChecked = addInputs.filter((elem) => elem.checked);
  const addSum = addInputsChecked.reduce((sum, elem) => sum + Number(elem.value), 0);

  const sum = price + sizeSum + addSum;

  priceElem.textContent = `$${sum.toFixed(2)}`;
});
