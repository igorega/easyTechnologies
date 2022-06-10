const form = document.querySelector('#form');

if (form) {
  const formTextarea = form.querySelector('.form__textarea');
  const required = form.querySelectorAll('[required]');

  // change textarea height
  formTextarea.addEventListener('input', function() {
    this.style.height = 'var(--textarea-height)';
    this.style.height = `${(this.scrollHeight + 1)/10}rem`; // 1px border bottom
  });

  // check required fields in form
  required.forEach(item => {
    item.addEventListener('input', function() {
      const email = form.querySelector('[type="email"]');
      const emailValue = email.value;
      const emailValidation = /(.+)@(.+){2,}\.(.+){2,}/.test(emailValue);

      if (item.value !== '' && item !== email) {
        this.classList.remove('is-error');
      }

      if (item.value !== '' && item === email) {
        if (emailValidation) {
          this.classList.remove('is-error');
        } else {
          this.classList.add('is-error');
        }
      }
    });
  });

  // form submit & check fields
  form.submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    for (let i = 0; i < form.elements.length; i++) {
      const email = form.querySelector('[type="email"]');
      const emailValue = email.value;
      const emailValidation = /(.+)@(.+){2,}\.(.+){2,}/.test(emailValue);

      if (form.elements[i].value === '' &&
        form.elements[i].hasAttribute('required') &&
        form.elements[i] !== email) {
        form.elements[i].classList.add('is-error');
        form.elements[i].focus();
        return false;
      } else {
        form.elements[i].classList.remove('is-error');
      }

      if (form.elements[i] === email) {
        if (emailValidation) {
          form.elements[i].classList.remove('is-error');
        } else {
          form.elements[i].classList.add('is-error');
          form.elements[i].focus();
          return false;
        }
      }
    }

    form.submit().reset();
  });
}
