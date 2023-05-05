import { isEscapeKey } from './utils.js';
import { showUploadFileForm } from './form.js';

const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

function onCloseModalKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeError();
  }
}

function closeError() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onCloseModalKeydown);
}

function onCloseOutside(evt) {
  evt.stopPropagation();
  const errorElement = document.querySelector('.error');
  if (evt.target === errorElement) {
    closeError();
  }
}

function onCloseErrorClick(evt) {
  evt.preventDefault();
  closeError();
}

function onOpenChangeFile() {
  document.querySelector('#upload-file').click();
  closeError();
  document
    .querySelector('#upload-file')
    .addEventListener('change', showUploadFileForm);
}

function showError(errorText, isErrorOnGetData = false) {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplate.cloneNode(true);
  const titleElement = errorElement.querySelector('.error__title');
  const buttonElement = errorElement.querySelector('.error__button');
  if (isErrorOnGetData) {
    buttonElement.textContent = 'Закрыть';
  }

  titleElement.textContent = errorText;

  if (isErrorOnGetData) {
    buttonElement.addEventListener('click', onCloseErrorClick);
  } else {
    buttonElement.addEventListener('click', onOpenChangeFile);
  }

  document.addEventListener('keydown', onCloseModalKeydown);

  errorFragment.append(errorElement);
  document.body.append(errorFragment);

  document.addEventListener('click', onCloseOutside);
}

export { showError, closeError };
