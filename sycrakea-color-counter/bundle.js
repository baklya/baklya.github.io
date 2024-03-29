const allColors = ['yellow', 'white', 'red', 'blue'];
const counts = new Map();
const MAX_COLOR_VALUE = 5;

document.body.style.setProperty('--max-color-value', MAX_COLOR_VALUE);

var buttons = document.getElementsByClassName('colorButton');
Array.from(buttons).forEach(function(item) {
  item.addEventListener('click', handleClick);
});

function handleClick() {
  const currentColor = this.dataset.color;
  const count = (counts.get(currentColor) || 0) + 1;
  counts.set(currentColor, count);
  this.setAttribute('data-count', count);
  this.style.setProperty('--data-count', count)

  updateColorDisplay();

  const saveState = {};
  allColors.forEach((color) => {
    saveState[color] = counts.get(color) || 0;
  });
  history.pushState(saveState, '');
}

const colorDisplay = document.getElementById('colorDisplay');
const resetButton = document.getElementById('reset');
function updateColorDisplay() {
  const countArray = allColors.map((color) => counts.get(color) || 0);
  let maxValue = 0;
  countArray.forEach((count) => {
  	if(count > maxValue) {
    	maxValue = count;
    }
  });

  const maxColors = [];
  allColors.forEach((color) => {
  	const count = counts.get(color) || 0;
    if (maxValue === count) {
    	maxColors.push(color);
    }
  });

  if (maxColors.length === 1) {
    colorDisplay.setAttribute('data-color', maxColors[0]);
  } else {
    colorDisplay.setAttribute('data-color', '');
  }

  if (maxValue >= MAX_COLOR_VALUE) {
    Array.from(buttons).forEach(function(item) {
      item.setAttribute('disabled', true);
    });
  } else {
    Array.from(buttons).forEach(function(item) {
      item.removeAttribute('disabled');
    });
  }

  if (maxValue > 0) {
    resetButton.removeAttribute('disabled');
  } else {
    resetButton.setAttribute('disabled', true);
  }
}

resetButton.addEventListener('click', reset);
function reset() {
  Array.from(buttons).forEach(function(item) {
    item.setAttribute('data-count', 0);
    item.style.setProperty('--data-count', 0)
  });
  counts.clear();
  updateColorDisplay();

  const saveState = {};
  allColors.forEach((color) => {
    saveState[color] = 0;
  });
  history.pushState(saveState, '');
}

window.addEventListener("popstate", (event) => {
  allColors.forEach((color) => {
    counts.set(color, event.state[color]);
  });
  Array.from(buttons).forEach(function(item) {
    item.setAttribute('data-count', event.state[item.dataset.color]);
    item.style.setProperty('--data-count', event.state[item.dataset.color])
  });
  updateColorDisplay();
});


