const allColors = ['yellow', 'white', 'red', 'blue'];
const counts = new Map();

var buttons = document.getElementsByClassName('colorButton');
Array.from(buttons).forEach(function(item) {
  item.addEventListener('click', handleClick);
});

function handleClick() {
  const currentColor = this.dataset.color;
  const count = (counts.get(currentColor) || 0) + 1;
  counts.set(currentColor, count);
  this.setAttribute('data-count', count);

  updateColorDisplay();

  const saveState = {};
  allColors.forEach((color) => {
    saveState[color] = counts.get(color) || 0;
  });
  history.pushState(saveState, '');

}

const colorDisplay = document.getElementById('colorDisplay');
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
}

window.addEventListener("popstate", (event) => {
  allColors.forEach((color) => {
    counts.set(color, event.state[color]);
  });
  Array.from(buttons).forEach(function(item) {
    item.setAttribute('data-count', event.state[item.dataset.color]);
  });
  updateColorDisplay();
});


