const form = document.querySelector('form');
const KEY = 'feedback-form-state';

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
onReset();

function onInput(evt) {
  const { email, message } = evt.currentTarget.elements;
  localStorage.setItem(
    KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

function onReset() {
  const data = JSON.parse(localStorage.getItem(KEY));
  //   console.log(data);
  form.elements.email.value = data !== null ? data.email : '';
  form.elements.message.value = data !== null ? data.message : '';
}

function onSubmit(evt) {
  evt.preventDefault();
  const data = JSON.parse(localStorage.getItem(KEY)) || {};
  console.log(data);
  localStorage.clear();
  evt.currentTarget.reset();
}
