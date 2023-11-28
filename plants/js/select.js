const select = document.querySelector('.select');
const selectList = document.querySelector('.select__list');
const selectItems = selectList.querySelectorAll('.select__item');
const contactCards = document.querySelectorAll('.contacts__card');

const openCloseSelect = () => {
  selectList.classList.toggle('select__list_open');
  document.querySelector('.arrow__contacts').classList.toggle('arrow__contacts_open')
}

const closeSelect = () => {
  selectList.classList.remove('select__list_open');
  document.querySelector('.arrow__contacts').classList.remove('arrow__contacts_open')
}

select.addEventListener('click', () => {
  openCloseSelect()
  select.classList.add('select_active');
})

selectItems.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    select.innerText = item.innerText;
    closeSelect();
    contactCards.forEach(card => {
      card.classList.remove('contacts__card_active')
    })
    contactCards[index].classList.add('contacts__card_active')
    document.querySelector('.contacts__img').classList.add('contacts__img_no-visible');
  })
})

document.addEventListener('click', (event) => {
  if (!selectList.contains(event.target) && !select.contains(event.target)) closeSelect();
})
