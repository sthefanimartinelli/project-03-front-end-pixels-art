let paletaCores = document.getElementById('color-palette');

// Adiciona à página uma paleta contendo 4 cores distintas, sendo a primeira cor preta.

function createPalette(numberOfColors, arrayOfcolors){
  for (let index = 0; index < numberOfColors; index += 1) {
    let colorSelector = document.createElement('li');
    colorSelector.classList.add('color')
    colorSelector.style.backgroundColor = arrayOfcolors[index];
    paletaCores.appendChild(colorSelector);
    }
}

let arrayOfColors = ['black', 'green', 'red', 'blue'];
createPalette(arrayOfColors.length, arrayOfColors);

// Adiciona um botão para gerar cores aleatórias para a paleta de cores.

function createRandomPaletteButton(){
    let randomColorButton = document.createElement('button');
    randomColorButton.id = 'button-random-color';
    randomColorButton.innerHTML = 'Cores aleatórias';
    document.body.appendChild(randomColorButton);

    randomColorButton.addEventListener('click', function(){
        let itensPaleta = document.getElementsByClassName('color');

        for (let index = 0; index < itensPaleta.length; index += 1) {
            if(itensPaleta[index].style.backgroundColor !== 'black') {
                let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                itensPaleta[index].style.backgroundColor = randomColor;
            }       
        }
    });
}
// Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.