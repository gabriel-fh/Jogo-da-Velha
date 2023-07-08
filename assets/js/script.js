$(document).ready(function () {
    // seleção de elementos 
    const squares = $('.square');

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

    // função responsavel por alternar a vez dos jogadores
    const changePlayer = function () {
        palyerOne = !palyerOne;
        palyerTwo = !palyerTwo;
    }

    const checkDraw = function(){
        if(markedSquares === 9 && !gameEnded){
            gameEnded = true
            console.log('Velha')
        }
    }

    // verifica se o quadrado atual tem a classe mark-x ou mark-circle de acordo com o jogador atual
    const markSquare = function (element) {
        if(!gameEnded){
            if(!element.hasClass('mark-x') && !element.hasClass('mark-circle')){
                if (palyerOne) {
                    if (!element.hasClass('mark-circle')) {
                        element.addClass('mark-x');
                        victory('mark-x', 'Jogador 1');
                    }
                } else {
                    if (!element.hasClass('mark-x')) {
                        element.addClass('mark-circle');
                        victory('mark-circle', 'Jogador 2');
                    }
                }

                console.log('asda')
                markedSquares++;
                checkDraw();
                
            }
        };
    };

    const victory = function (marked, player) {
        $.each(victoryConditions, (_, condition) => {
            if ($(squares[condition[0]]).hasClass(marked) && $(squares[condition[1]]).hasClass(marked) && $(squares[condition[2]]).hasClass(marked)) {
                gameEnded = true
                console.log(player + ' venceu');
            };
        })
    }

    $.each(squares, (_, square) => {
        $(square).on('click', function () {
            markSquare($(this));
            changePlayer();
        })
    });



});
