const downloadBase = 'https://github.com/L2715915020-stack/two-fingers-artwork/releases/download/media-kit-v1/';
const updatedDownloadBase = 'https://github.com/L2715915020-stack/two-fingers-artwork/releases/download/media-kit-v2/';
const preview = document.querySelector('#preview');
const previewToggle = document.querySelector('#preview-toggle');
const previewLabel = document.querySelector('#preview-label');
const previewSymbol = document.querySelector('#preview-symbol');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const updatePreview = () => {
  previewLabel.textContent = preview.paused ? 'Play' : 'Pause';
  previewSymbol.textContent = preview.paused ? '▷' : 'Ⅱ';
  previewToggle.setAttribute('aria-label', preview.paused ? 'Play preview' : 'Pause preview');
};
preview.addEventListener('play', updatePreview);
preview.addEventListener('pause', updatePreview);
preview.addEventListener('error', () => { previewToggle.hidden = true; });
previewToggle.addEventListener('click', async () => {
  if (preview.paused) {
    try { await preview.play(); } catch { announce('The preview cannot play here. You can still download the full film.'); }
  } else preview.pause();
});
if (reducedMotion.matches) { preview.autoplay = false; preview.pause(); }
updatePreview();
let toastTimer;
function announce(message) {
  const status = document.querySelector('#announcement');
  clearTimeout(toastTimer);
  status.textContent = message;
  status.classList.add('visible');
  toastTimer = setTimeout(() => status.classList.remove('visible'), 4500);
}
document.querySelector('#share-button').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.origin + location.pathname); announce('Page link copied. Ready to share.'); }
  catch { announce('Copy this page’s URL from your address bar to share it.'); }
});
const dialog = document.querySelector('#image-dialog');
let lastImageButton;
document.querySelectorAll('.image-open').forEach(button => button.addEventListener('click', () => {
  lastImageButton = button;
  document.querySelector('#dialog-image').src = button.dataset.image;
  document.querySelector('#dialog-image').alt = button.dataset.title;
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  document.querySelector('#dialog-download').href = button.dataset.downloadUrl || ((button.dataset.download === 'one-winner-two-fingers-poster.png' ? updatedDownloadBase : downloadBase) + button.dataset.download);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastImageButton?.focus(); });
