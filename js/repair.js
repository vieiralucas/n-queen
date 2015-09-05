function repair(size, time) {
    var board = new Array(size),
        currentRow = 0;

    function init() {
        for (var i = 0; i < size; i++) {
            board[i] = new Array(size);

            for (var j = 0; j < size; j++) {
                board[i][j] = 0;
            }
        }
    }

    init();
    solve();

    function solve() {
        var count = 0;
        placeRandom();

        drawBoard(board, repair);
    }

    function repair() {
        var queen,
            threats,
            min,
            toRandom,
            randomCol,
            i;

        if (finished()) {
            console.log('over');
            return;
        }

        if (currentRow >= size) {
            currentRow = 0;
        }

        queen = getCurrentRowQueen();

        if (getNumberOfThreats(queen) <= 0) {
            // nothing to do here move to next row
            currentRow++;
            repair();
            return;
        }

        board[queen[0]][queen[1]] = 0;

        threats = [];
        for (i = 0; i < size; i++) {
            threats[i] = getNumberOfThreats([queen[0], i]);
        }

        min = Math.min.apply(Math, threats);
        toRandom = [];
        for (i = 0; i < threats.length; i++) {
            if (threats[i] === min) {
                toRandom.push(i);
            }
        }

        randomCol = toRandom[Math.floor(Math.random() * toRandom.length)];
        board[queen[0]][randomCol] = 1;
        currentRow++;

        if (randomCol === queen[1]) {
            // nothing changed
            repair();
        } else {
            var square = document.getElementById(queen[0] + '' + queen[1]);
            square.setAttribute('queen', 'selected');
            drawBoard(board, repair);
        }
    }

    function getCurrentRowQueen() {
        for (var i = 0; i < size; i++) {
            if (board[currentRow][i] === 1) {
                return [currentRow, i];
            }
        }

        throw 'Something is very wrong';
    }

    function getNumberOfThreats(queen) {
        var r = queen[0],
            c = queen[1],
            threats = 0;

        if (!checkTop(r, c)) {
            threats++;
        }

        if (!checkBottom(r, c)) {
            threats++;
        }

        if (!checkLeft(r, c)) {
            threats++;
        }

        if (!checkRight(r, c)) {
            threats++;
        }

        if (!checkLeftTop(r, c)) {
            threats++;
        }

        if (!checkRightTop(r, c)) {
            threats++;
        }

        if (!checkLeftBottom(r, c)) {
            threats++;
        }

        if (!checkRightBottom(r, c)) {
            threats++;
        }

        return threats;
    }

    function finished() {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (board[i][j] === 1) {
                    if (!checkTop(i, j) || !checkBottom(i, j) || !checkLeft(i, j) || !checkRight(i, j) || !checkLeftTop(i, j) || !checkRightTop(i, j) || !checkLeftBottom(i, j) || !checkRightBottom(i, j)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function checkLeft(i, j) {
        var c = j - 1;

        for (c; c >= 0; c--) {
            if (board[i][c] === 1) {
                return false;
            }
        }

        return true;
    }

    function checkRight(i, j) {
        var c = j + 1;

        for (c; c < size; c++) {
            if (board[i][c] === 1) {
                return false;
            }
        }

        return true;
    }

    function checkTop(i, j) {
        var r = i - 1;

        for (r; r >= 0; r--) {
            if (board[r][j] === 1) {
                return false;
            }
        }

        return true;
    }

    function checkBottom(i, j) {
        var r = i + 1;

        for (r; r < size; r++) {
            if (board[r][j] === 1) {
                return false;
            }
        }

        return true;
    }

    function checkLeftTop(i, j) {
        var r = i - 1,
            c = j;

        for (r; r >= 0; r--) {
            c--;
            if (c >= 0) {
                if (board[r][c] === 1) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkRightTop(i, j) {
        var r = i - 1,
            c = j;

        for (r; r >= 0; r--) {
            c++;
            if (c < size) {
                if (board[r][c] === 1) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkLeftBottom(i, j) {
        var r = i + 1,
            c = j;

        for (r; r < size; r++) {
            c--;
            if (c >= 0) {
                if (board[r][c] === 1) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkRightBottom(i, j) {
        var r = i + 1,
            c = j;

        for (r; r < size; r++) {
            c++;
            if (c < size) {
                if (board[r][c] === 1) {
                    return false;
                }
            }
        }

        return true;
    }

    function placeRandom() {
        while (queensPlaced() !== size) {
            var pos = sortPos(),
                r = pos[0],
                c = pos[1];

            board[r][c] = 1;
        }
    }

    function queensPlaced() {
        var queensCount = 0;

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                queensCount += board[i][j];
            }
        }

        return queensCount;
    }

    function sortPos() {
        var availableRows = getAvailable('r'),
            availableCols = getAvailable('c');
            randomRow = Math.floor(Math.random() * availableRows.length),
            randomCol = Math.floor(Math.random() * availableCols.length);

        return [availableRows[randomRow], availableCols[randomCol]];
    }

    function getAvailable(type) {
        var availables = [];

        for (var i = 0; i < size; i++) {
            var sum = 0;

            for (var j = 0; j < size; j++) {
                if (type === 'r') {
                    sum += board[i][j];
                } else if (type === 'c') {
                    sum += board[j][i];
                } else {
                    throw 'Invalid type provided to getAvailable. Type: ' + type;
                }
            }

            if (sum === 0) {
                availables.push(i);
            }
        }

        return availables;
    }

    function drawBoard(board, cb) {
        board = JSON.parse(JSON.stringify(board));
        setTimeout(function() {
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    var square = document.getElementById(i + '' + j);

                    if (board[i][j] === 1) {
                        square.setAttribute('queen', true);
                    } else {
                        square.setAttribute('queen', false);
                    }
                }
            }

            iterationsInput.innerHTML = Number(iterationsInput.innerHTML) + 1;
            cb();
        }, time * 1000);
    }
}
