let paletaCores = document.getElementById('color-palette');
console.log(paletaCores);

function createPalette(numberOfColors, arrayOfcolors){
  for (let index = 0; index < numberOfColors; index += 1) {
    let colorSelector = document.createElement('li');
    colorSelector.classList.add('color')
    colorSelector.style.backgroundColor = arrayOfcolors[index];
    paletaCores.appendChild(colorSelector);
    }
}

let arrayOfcolors = ['black', 'green', 'red', 'blue'];
createPalette(4, arrayOfcolors);