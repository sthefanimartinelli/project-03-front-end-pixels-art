let paletaCores = document.getElementById('color-palette');

// Adiciona à página uma paleta contendo 4 cores distintas, sendo a primeira cor preta.

function createPalette(numberOfColors, arrayOfcolors){ // A função createPalette recebe dois parâmetros para ser inicializada. Se já houverem dados de cores já armazenados, ela vai ignorar esses inputs. Se não, ela vai usá-los;
    let savedColors = getColorsFromLocalStorage(); // A função getColorsFromLocalStorage busca a string armazenada no localStorage e retorna uma array;
    if(savedColors) { // Se existirem cores armazenadas no localStorage, então ele vai buscá-las e criar elementos li com as cores armazenadas;
        for (let index = 0; index < savedColors.length; index += 1) {
            let colorSelector = document.createElement('li');
            colorSelector.classList.add('color')
            colorSelector.style.backgroundColor = savedColors[index];
            paletaCores.appendChild(colorSelector);
        }
    } else { // Se não existirem cores armazenadas, ele vai usar uma array com cores padrão para gerar a paleta;
        for (let index = 0; index < numberOfColors; index += 1) {
            let colorSelector = document.createElement('li');
            colorSelector.classList.add('color')
            colorSelector.style.backgroundColor = arrayOfcolors[index];
            paletaCores.appendChild(colorSelector);
        }
    }
    addColorsToLocalStorage(); // Ao final da função, ela vai adicionar esse valores de cores ao localStorage;
}

let arrayOfColors = ['black', 'green', 'red', 'blue'];
createPalette(arrayOfColors.length, arrayOfColors);

// Adiciona um botão para gerar cores aleatórias para a paleta de cores.

function createRandomPaletteButton(){
    let buttonSection = document.getElementById('button-section');
    let randomColorButton = document.createElement('button'); // Cria o elemento botão no HTML;
    randomColorButton.id = 'button-random-color';
    randomColorButton.innerHTML = 'Cores aleatórias';
    buttonSection.appendChild(randomColorButton); // Adciona o botão como filho do body;

    randomColorButton.addEventListener('click', function(){ // Adiciona um escutador de eventos, que vai disparado quando o mouse clicar no botão;
        let itensPaleta = document.getElementsByClassName('color'); // Busca as li criadas anteriormente, que formam a paleta de cores, isso é uma array com objetos (HTML collection);

        for (let index = 0; index < itensPaleta.length; index += 1) {
            if(itensPaleta[index].style.backgroundColor !== 'black') { // Se a cor armazenada na propriedade backgroundColor daquele item for diferente de preto, então podemos alterá-la;
                itensPaleta[index].style.backgroundColor = createRandomColor(); // Aqui chamamos uma função que cria uma cor aleatória, e que foi definida abaixo;
            }       
        } 
        addColorsToLocalStorage(); // Como criamos novas cores e atribuímos às li's, devemos salvar os novos valores no localStorage;
    });
}

// Função que gera uma cor aleatória
function createRandomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16); // Função que gera um número aleatório, arredonda para baixo e transforma em um hexadecimal;
}

createRandomPaletteButton(); // Chamamos a função de criar o botão de cores aleatórias abaixo da função de cores aleatórias para não termos problemas;

// Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.

function addColorsToLocalStorage(){ // Função que adiciona as cores das li's no localStorage;
    let itensPaleta = document.getElementsByClassName('color'); // Pega os elementos li's criados anteriormente;
    let colorsToLocalStorage = []; // Cria uma array vazia que vai receber as cores associadas aos li's;
    for (let index = 0; index < itensPaleta.length; index += 1) { 
        let color = itensPaleta[index].style.backgroundColor; // Cores armazenadas nas li's;
        colorsToLocalStorage.push(color); // Preenche a array a cada iteração com as cores de cada li;     
    }
    localStorage.setItem('colorPalette', JSON.stringify(colorsToLocalStorage)); // Transforma array em string e cria um item com a chave colorPalette;
} 

function getColorsFromLocalStorage(){ // Função que pega as cores das li's no localStorage;
    return JSON.parse(localStorage.getItem('colorPalette')); // Transforma a string em array de novo;
}

// Adicione à página um quadro contendo 25 pixels.
function createPixelsFrame(pixelBoardWidth){ // Função que cria um quadro de pixels de acordo com o tamanho PixelBoardWidth fornecido;
    let frameSection = document.getElementById('pixel-board');
    for (let indexLine = 0; indexLine < pixelBoardWidth; indexLine += 1) {
        let lineUl = document.createElement('ul');
        lineUl.classList.add('lineUl');
        frameSection.appendChild(lineUl);
        for (let index = 0; index < pixelBoardWidth; index += 1) {
            let pixelItem = document.createElement('li');
            pixelItem.classList.add('pixel');
            pixelItem.style.backgroundColor = 'white';
            lineUl.appendChild(pixelItem);
        }
    }
}
createPixelsFrame(5);