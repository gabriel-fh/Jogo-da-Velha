$(document).ready(function () {
    // seleção de elementos 
    const squares = $('.square');
    const result = $('#result');
    const btnPlayAgain = $('#btnPlayAgain');
    const playerOne = $('.player-one');
    const playerTwo = $('.player-two');
    const tdDraw = $('#draw')
    const tdPlayerOne = $('#playerOneScore')
    const tdPlayerTwo = $('#playerTwoScore')

    // variaveis 
    const victoryConditions = [
        // verifica todas as posições 0 dos arrays, depois a posição 1 e por fim a 2
        // vitória por linha
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // vitória por coluna
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vitória por diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];
    let palyerOne = true;
    let palyerTwo = false;
    let gameEnded = false;
    let markedSquares = 0;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let countDraw = 0;

    // funções

    // função responsavel por alternar a vez dos jogadores
    const changePlayer = function () {
        palyerOne = !palyerOne;
        palyerTwo = !palyerTwo;
    }

    // reiniciar o jogo
    const playAgain = function () {
        gameEnded = false;
        markedSquares = 0;
        $.each(squares, (_, square) => {
            $(square).removeClass('mark-x');
            $(square).removeClass('mark-circle');
            $(square).removeClass('disappear');
            $(square).removeClass('show');
        });
        btnPlayAgain.addClass('hide');
    }

    // verifica se deu empate
    const checkDraw = function () {
        if (markedSquares === 9 && !gameEnded) {
            gameEnded = true;
            countDraw++;
            tdDraw.text(countDraw)
            result.text(`Deu Velha`);
            result.removeClass('hide');
            btnPlayAgain.removeClass('hide');
        }
    }

    // adiciona uma classe que evidencia de quem é a jogada atual
    const togglePlayer = function(elementAddClass, elementRemoveClass){
        elementAddClass.addClass('active');
        elementRemoveClass.removeClass('active');
    }

    // verifica se o quadrado atual tem a classe mark-x ou mark-circle de acordo com o jogador atual e verifica se deu vitoria ou empate
    const markSquare = function (element) {
        if (!gameEnded) {
            if (!element.hasClass('mark-x') && !element.hasClass('mark-circle')) {
                if (palyerOne) {
                    if (!element.hasClass('mark-circle')) {
                        element.addClass('mark-x');
                        togglePlayer(playerTwo, playerOne);
                        victory('mark-x', 'Jogador 1');
                    }
                } else {
                    if (!element.hasClass('mark-x')) {
                        element.addClass('mark-circle');
                        togglePlayer(playerOne, playerTwo);
                        victory('mark-circle', 'Jogador 2');
                    }
                }
                markedSquares++;
                checkDraw();
            };
        };
    };

    // verifica se algum dos jogadores venceram
    const victory = function (marked, player) {
        $.each(victoryConditions, (_, condition) => {
            if ($(squares[condition[0]]).hasClass(marked) && $(squares[condition[1]]).hasClass(marked) && $(squares[condition[2]]).hasClass(marked)) {
                for (let i = 0; i < 3; i++) {
                    $(squares[condition[i]]).addClass('show') // adiciona a classe somente na linha/coluna/diagonal da vitoria
                }
                gameEnded = true;
                if(player === 'Jogador 1'){
                    playerOneScore++;
                    playerOneScore < 2 ? tdPlayerOne.text(playerOneScore + 'pt') : tdPlayerOne.text(playerOneScore + 'pts')
                } else {
                    playerTwoScore++;
                    playerTwoScore < 2 ? tdPlayerTwo.text(playerTwoScore + 'pt') : tdPlayerTwo.text(playerTwoScore + 'pts')
                }
                result.text(`${player} Venceu!`);
                result.removeClass('hide');
                btnPlayAgain.removeClass('hide');
            };
        });
        squares.each(function () {
            if (!$(this).hasClass('show') && gameEnded == true) {
                $(this).addClass('disappear') // adiciona a classe somente naqueles que não possuem a classe show 
            }
        });
    
    }


// eventos

    $.each(squares, (_, square) => {
        $(square).on('click', function () {
            markSquare($(this));
            changePlayer();
        })
    });

    $(btnPlayAgain).on('click', playAgain);

});
