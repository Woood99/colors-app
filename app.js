const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === 'space') {
    setRandomColors();
  }
})

document.addEventListener('click', (e) => {
  const target = e.target;
  const type = target.closest('[data-type]');

  if (type && type.dataset.type === 'lock') {
    const icon = type.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-lock-open');
      icon.classList.toggle('fa-lock');
    }
  }
  if (type && type.dataset.type === 'copy') {
    copyToClickedBoard(type.textContent);
  }
})

setRandomColors(true);

function generateRandomColor() {
  const hexCodes = '123456789ABCDEF';

  let color = '';
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return `#${color}`;
}

function setRandomColors(isInit) {
  const colors = isInit ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    if (isLocked) {
      colors.push(text.textContent);
      return
    };

    const color = isInit ?
      colors[index] ?
      colors[index] :
      generateRandomColor() : generateRandomColor();
    if (!isInit) colors.push(color);

    col.style.backgroundColor = color;
    text.textContent = color;


    setTextColor(text, color);
    setTextColor(button, color);
  })

  updateColorsHash(colors);
}

function setTextColor(el, color) {
  const luminance = chroma(color).luminance();
  el.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickedBoard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(color => color.substring(1)).join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map(color => `#${color}`);
  }
  return [];
}
