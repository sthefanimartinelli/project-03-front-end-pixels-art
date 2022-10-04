let paletaCores = document.getElementById('color-palette');

// Adiciona à página uma paleta contendo 4 cores distintas, sendo a primeira cor preta.

function createPalette(numberOfColors, arrayOfcolors){
    let savedColors = getColorsFromLocalStorage();
    if(savedColors) {
        for (let index = 0; index < savedColors.length; index += 1) {
            let colorSelector = document.createElement('li');
            colorSelector.classList.add('color')
            colorSelector.style.backgroundColor = savedColors[index];
            paletaCores.appendChild(colorSelector);
        }
    } else {
        for (let index = 0; index < numberOfColors; index += 1) {
            let colorSelector = document.createElement('li');
            colorSelector.classList.add('color')
            colorSelector.style.backgroundColor = arrayOfcolors[index];
            paletaCores.appendChild(colorSelector);
        }
    }
    addColorsToLocalStorage();
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
                itensPaleta[index].style.backgroundColor = createRandomColor();
            }       
        } 
        addColorsToLocalStorage();
    });
}

// Função que gera uma cor aleatória
function createRandomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

createRandomPaletteButton();

// Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.

function addColorsToLocalStorage(){
    let itensPaleta = document.getElementsByClassName('color');
    let colorsToLocalStorage = [];
    for (let index = 0; index < itensPaleta.length; index += 1) {
        let color = itensPaleta[index].style.backgroundColor;
        colorsToLocalStorage.push(color);     
    }
    localStorage.setItem('colorPalette', JSON.stringify(colorsToLocalStorage));
} 

function getColorsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('colorPalette'));
}


// function initialize
