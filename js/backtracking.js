function backtracking(size, time) {
    var board = new Array(size),
        currentCol = 0;

    for (var i = 0; i < size; i++) {
        board[i] = new Array(size);

        for (var j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }

    solve();

    function canPlace(row, col) {
        function horizontal() {
            for (var i = 0; i < size; i++) {
                if (board[row][i] === 1) {
                    return false;
                }
            }

            return true;
        }

        function vertical() {
            for (var i = 0; i < size; i++) {
                if (board[i][col] === 1) {
                    return false;;
                }
            }

            return true;
        }

        function diagonal() {
            function topLeft() {
                var r = row,
                    c = col;

                while (r >= 0 && c >= 0) {
                    if (board[r][c] === 1) {
                        return false;
                    }

                    r--;
                    c--;
                }

                return true;
            }

            function topRight() {
                var r = row,
                    c = col;

                while (r >= 0 && c < size) {
                    if (board[r][c] === 1) {
                        return false;
                    }

                    r--;
                    c++;
                }

                return true;
            }

            function bottomLeft() {
                var r = row,
                    c = col;

                while (r < size && c >= 0) {
                    if (board[r][c] === 1) {
                        return false;
                    }

                    r++;
                    c--;
                }

                return true;
            }

            function bottomRight() {
                var r = row,
                    c = col;

                while (r < size && c < size) {
                    if (board[r][c] === 1) {
                        return false;
                    }

                    r++;
                    c++;
                }

                return true;
            }

            return topLeft() && topRight() && bottomLeft() && bottomRight();
        }

        return horizontal() && vertical() && diagonal();
    }

    function finished() {
        var sum = 0;

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                sum += board[i][j];
            }
        }

        return sum === size;
    }

    function getCurrentColQuen() {
        for (var i = 0; i < size; i++) {
            if (board[i][currentCol] === 1) {
                return i;
            }
        }

        return false;
    }

    function step() {
        var queenRow = getCurrentColQuen();

        if (queenRow !== false) {
            board[queenRow][currentCol] = 0;

            if (fillCurrentCol(queenRow + 1)) {
                currentCol++;
            } else {
                currentCol--;
            }
        } else {
            if (fillCurrentCol(0)) {
                currentCol++;
            } else {
                currentCol--;
            }
        }
    }

    function fillCurrentCol(curRow) {
        for (curRow; curRow < size; curRow++) {
            if (canPlace(curRow, currentCol)) {
                board[curRow][currentCol] = 1;
                return true;
            }
        }

        return false;
    }

    function solve() {
        var steps = [];

        while (!finished()) {
            step();
            steps.push(JSON.parse(JSON.stringify(board)));
        }

        for (var i = 0; i < steps.length; i++) {
            drawBoard(steps[i], i);
        }
    }

    function drawBoard(board, iteration) {
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

            iterationsInput.innerHTML = iteration + 1;
        }, time * 1000 * iteration);
    }
}

