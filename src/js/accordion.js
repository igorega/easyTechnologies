const items = document.querySelectorAll('.accordion__btn');
const closeBtn = document.querySelectorAll('.accordion__title-icon');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
    items[i].parentElement.classList.add('is-hide');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
    this.parentElement.classList.remove('is-hide');
    this.previousElementSibling.style.maxHeight = `${this.previousElementSibling.scrollHeight/10}rem`;
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

closeBtn.forEach(item => {
  item.addEventListener('click', () => {
    item.closest('.accordion__item').classList.add('is-hide');
    item.closest('.accordion__item').querySelector('.accordion__btn').setAttribute('aria-expanded', 'false');;
  });
});
