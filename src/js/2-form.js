let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const rawData = localStorage.getItem(STORAGE_KEY);
if (rawData) {
  try {
    const savedData = JSON.parse(rawData);
    formData = { ...formData, ...savedData };

    form.elements.email.value = formData.email ?? '';
    form.elements.message.value = formData.message ?? '';
  } catch (error) {
    console.error('Помилка парсингу даних з localStorage:', error);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted Data:', formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = { email: '', message: '' };

  form.reset();
});
