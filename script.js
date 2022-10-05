window.onload = function () {
    let paletaCores = document.getElementById('color-palette');

    // Adiciona à página uma paleta contendo 4 cores distintas, sendo a primeira cor preta.

    function createPalette(numberOfColors, arrayOfcolors) { // A função createPalette recebe dois parâmetros para ser inicializada. Se já houverem dados de cores já armazenados, ela vai ignorar esses inputs. Se não, ela vai usá-los;
        let savedColors = getColorsFromLocalStorage('colorPalette'); // A função getColorsFromLocalStorage busca a string armazenada no localStorage e retorna uma array;
        if (savedColors) { // Se existirem cores armazenadas no localStorage, então ele vai buscá-las e criar elementos li com as cores armazenadas;
            for (let index = 0; index < savedColors.length; index += 1) {
                let colorSelector = document.createElement('li');
                colorSelector.classList.add('color')
                colorSelector.style.backgroundColor = savedColors[index];
                if (savedColors[index] === 'black') {
                    colorSelector.classList.add('selected');
                }
                paletaCores.appendChild(colorSelector);
            }
        } else { // Se não existirem cores armazenadas, ele vai usar uma array com cores padrão para gerar a paleta;
            for (let index = 0; index < numberOfColors; index += 1) {
                let colorSelector = document.createElement('li');
                colorSelector.classList.add('color')
                colorSelector.style.backgroundColor = arrayOfcolors[index];
                if (arrayOfcolors[index] === 'black') {
                    colorSelector.classList.add('selected');
                }
                paletaCores.appendChild(colorSelector);
            }
        }
        addColorsToLocalStorage(); // Ao final da função, ela vai adicionar esse valores de cores ao localStorage;
    }

    let arrayOfColors = ['black', 'green', 'red', 'blue'];
    createPalette(arrayOfColors.length, arrayOfColors);

    // Adiciona um botão para gerar cores aleatórias para a paleta de cores.

    function createRandomPaletteButton() {
        let buttonSection = document.getElementById('button-section');
        let randomColorButton = document.createElement('button'); // Cria o elemento botão no HTML;
        randomColorButton.id = 'button-random-color';
        randomColorButton.innerHTML = 'Cores aleatórias';
        buttonSection.appendChild(randomColorButton); // Adciona o botão como filho do body;

        randomColorButton.addEventListener('click', function () { // Adiciona um escutador de eventos, que vai disparado quando o mouse clicar no botão;
            let itensPaleta = document.getElementsByClassName('color'); // Busca as li criadas anteriormente, que formam a paleta de cores, isso é uma array com objetos (HTML collection);

            for (let index = 0; index < itensPaleta.length; index += 1) {
                if (itensPaleta[index].style.backgroundColor !== 'black') { // Se a cor armazenada na propriedade backgroundColor daquele item for diferente de preto, então podemos alterá-la;
                    itensPaleta[index].style.backgroundColor = createRandomColor(); // Aqui chamamos uma função que cria uma cor aleatória, e que foi definida abaixo;
                }
            }
            addColorsToLocalStorage(); // Como criamos novas cores e atribuímos às li's, devemos salvar os novos valores no localStorage;
        });
    }

    // Função que gera uma cor aleatória
    function createRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16); // Função que gera um número aleatório, arredonda para baixo e transforma em um hexadecimal;
    }

    createRandomPaletteButton(); // Chamamos a função de criar o botão de cores aleatórias abaixo da função de cores aleatórias para não termos problemas;

    // Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.

    function addColorsToLocalStorage() { // Função que adiciona as cores das li's no localStorage;
        let itensPaleta = document.getElementsByClassName('color'); // Pega os elementos li's criados anteriormente;
        let colorsToLocalStorage = []; // Cria uma array vazia que vai receber as cores associadas aos li's;
        for (let index = 0; index < itensPaleta.length; index += 1) {
            let color = itensPaleta[index].style.backgroundColor; // Cores armazenadas nas li's;
            colorsToLocalStorage.push(color); // Preenche a array a cada iteração com as cores de cada li;     
        }
        localStorage.setItem('colorPalette', JSON.stringify(colorsToLocalStorage)); // Transforma array em string e cria um item com a chave colorPalette;
    }

    function getColorsFromLocalStorage(chave) { // Função que pega as cores das li's no localStorage;
        return JSON.parse(localStorage.getItem(chave)); // Transforma a string em array de novo;
    }

    // Adicione à página um quadro contendo 25 pixels.
    function createPixelsFrame(pixelBoardWidth) { // Função que cria um quadro de pixels de acordo com o tamanho PixelBoardWidth fornecido;
        deleteOldPixels();
        createPixels(pixelBoardWidth);
        addColorToPixels();
        addEventListenerToBoard();
    }

    function deleteOldPixels() {
        let oldPixels = document.querySelectorAll('#pixel-board ul')
        if (oldPixels) {
            for (let index = 0; index < oldPixels.length; index += 1) {
                oldPixels[index].remove();
            }
        }
    }

    function createPixels(pixelBoardWidth) {
        let frameSection = document.getElementById('pixel-board'); // Pega o elemento section que vai armazenar todas as ul's que serão criadas;
        for (let indexLine = 0; indexLine < pixelBoardWidth; indexLine += 1) { // Cria a quantidade de ul's conforme informado do pixelBoardWidth, que vão ser como as linhas da tabela;
            let lineUl = document.createElement('ul');
            lineUl.classList.add('lineUl');
            frameSection.appendChild(lineUl);
            for (let index = 0; index < pixelBoardWidth; index += 1) { // Cria a quantidade de li's em cada ul, que seria a quantidade de quadrados em cada linha;
                let pixelItem = document.createElement('li');
                pixelItem.classList.add('pixel');
                lineUl.appendChild(pixelItem);
            }
        }
    }

    function addColorToPixels() {
        let pixels = document.querySelectorAll('#pixel-board li')
        let pixelColorsSaved = getColorsFromLocalStorage('pixelBoard');
        for (let index = 0; index < pixels.length; index += 1) {
            if (pixelColorsSaved) {
                pixels[index].style.backgroundColor = pixelColorsSaved[index];
            } else {
                pixels[index].style.backgroundColor = 'white';
            }
        }
    }

    function addEventListenerToBoard() {
        let pixels = document.querySelectorAll('#pixel-board li');

        for (let indexLi = 0; indexLi < pixels.length; indexLi += 1) {
            pixels[indexLi].addEventListener('click', paintPixel);
        }
    }

    createPixelsFrame(5);
    // Defina a cor preta como cor inicial da paleta de cores

    // Crie uma função para selecionar uma cor na paleta de cores e preencha os pixels no quadro.

    let quadrados = document.getElementsByClassName('color');

    for (let index = 0; index < quadrados.length; index += 1) {
        quadrados[index].addEventListener('click', selectColor);
    }

    function selectColor(event) {
        if (!event.target.classList.contains('selected')) {
            let elementWithSelected = document.querySelector('.selected');
            elementWithSelected.classList.remove('selected');
            event.target.classList.add('selected');
        }
    }

    // Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores.
    function paintPixel(event) {
        let colorSelected = document.querySelector('.selected').style.backgroundColor;
        event.target.style.backgroundColor = colorSelected;
        addPixelColorsToLocalStorage();
    }

    // Crie um botão que retorne a cor do quadro para a cor inicial.
    function createResetButton() {
        let buttonResetSection = document.getElementById('button-reset');
        let resetButton = document.createElement('button'); // Cria o elemento botão no HTML;
        resetButton.id = 'clear-board';
        resetButton.innerHTML = 'Limpar';
        buttonResetSection.appendChild(resetButton);

        resetButton.addEventListener('click', function (){
            clearPixelBoard();
            addPixelColorsToLocalStorage();
        });
    }

    function clearPixelBoard () {
        let pixels = document.querySelectorAll('#pixel-board li');
        for (let index = 0; index < pixels.length; index += 1) {
            pixels[index].style.backgroundColor = 'white';
        }
    }

    createResetButton();

    // Crie uma função para salvar e recuperar o seu desenho atual no localStorage
    function addPixelColorsToLocalStorage() {
        let pixels = document.querySelectorAll('#pixel-board li');
        let pixelsArray = [];
        for (let index = 0; index < pixels.length; index += 1) {
            pixelsArray.push(pixels[index].style.backgroundColor);
        }
        localStorage.setItem('pixelBoard', JSON.stringify(pixelsArray));
    }

    // Crie um input que permita à pessoa usuária preencher um novo tamanho para o quadro de pixels.
    let changeBoardSizeButton = document.querySelector('#generate-board');

    changeBoardSizeButton.addEventListener('click', function () {
        let inputNumber = document.querySelector('#board-size').value;
        if(!inputNumber){
            alert('Board inválido!')
        } else {
        localStorage.removeItem('pixelBoard');
        createPixelsFrame(inputNumber);
        }
    });

}





