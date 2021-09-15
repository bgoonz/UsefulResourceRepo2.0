async function ensureCarouselVisible() {
  const imgWrap = document.elementFromPoint(100, 100);
  if (!imgWrap.classList.contains('pswp__item')) {
    // carousel isn't active, make it so
    document.querySelector('.listing-gallery-image').click();
    while (!document.elementFromPoint(100, 100).classList.contains('pswp__item')) {
      await delay(50);
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Find the active image, surround it in an anchor tag, then click it.
async function downloadImage() {
  const imgWrap = document.elementFromPoint(100, 100);
  const img = imgWrap.querySelector('.pswp__img');
  // Full image hasn't loaded yet
  const src = img.src.split('?')[0]// get rid of querystring
  return downloadSrc(src);
}

function downloadSrc(src) {
  const a = document.createElement('a');
  a.href = src;
  a.download = "";
  a.click();
}

function nextImage() {
  document.querySelector('.pswp__button.pswp__button--arrow--right').click();
}

function getCounterValue() {
  const [position, total] = document.querySelector('.pswp__counter').textContent.split('/');
  return parseInt(position.trim(), 10);
}

async function run() {
  await ensureCarouselVisible();
  await delay(500);
  const firstValue = getCounterValue();

  async function imageLoop() {
    await downloadImage();
    nextImage();
    await delay(50);
    // console.log('counter', getCounterValue());
    if (getCounterValue() !== firstValue) return imageLoop(); // recurse
  }
  return imageLoop();
}

run().then(() => alert('Done downloadimg images!')).catch(console.error);