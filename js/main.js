var iterationsInput;

window.onload = function() {
    var sizeInput = document.getElementById('size'),
        strategyInput = document.getElementById('strategy'),
        timeInput = document.getElementById('time'),
        startButton = document.getElementById('start'),
        board = document.getElementById('board'),

        generateBoard = function(size) {
            board.innerHTML = '';
            for (var r = 0; r < size; r++) {
                var row = document.createElement('div');

                row.className = 'row';
                board.appendChild(row);
                for (var c = 0; c < size; c++) {
                    var square = document.createElement('div');

                    square.id = r + '' + c;
                    square.className = 'col';

                    if (r % 2 === 0) {
                        if (c % 2 === 0) {
                            square.className += ' white';
                        } else {
                            square.className += ' black';
                        }
                    } else {
                        if (c % 2 === 0) {
                            square.className += ' black';
                        } else {
                            square.className += ' white';
                        }
                    }

                    row.appendChild(square);
                }
            }
        };

    iterationsInput = document.getElementById('iterations');

    startButton.onclick = function() {
        var size = Number(sizeInput.value),
            time = Number(timeInput.value);

        iterationsInput.innerHTML = 0;

        if (size !== NaN) {
            generateBoard(size);

            if (strategyInput.value === 'backdrop') {
                backdrop(size, time);
            } else if (strategyInput.value === 'repair') {
                repair(size, time);
            }
        }
    };

    sizeInput.value = 4;
    timeInput.value = 0.5;
    generateBoard(4);
};
