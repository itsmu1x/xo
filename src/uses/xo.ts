interface Move {
    score: number
    index: number
}

export function getWinner(board: Board): Player | null {
    const x = isWin(board, "x")
    if (x) return "x"

    const o = isWin(board, "o")
    if (o) return "o"

    return null
}

export function isWin(board: Board, player: Player) {
    for (let i = 0; i < 3; i += 1) {
        if (
            (board[i][0] === player &&
                board[i][1] === player &&
                board[i][2] === player) ||
            (board[0][i] === player &&
                board[1][i] === player &&
                board[2][i] === player)
        ) {
            return true
        }
    }

    return (
        (board[0][0] === player &&
            board[1][1] === player &&
            board[2][2] === player) ||
        (board[0][2] === player &&
            board[1][1] === player &&
            board[2][0] === player)
    )
}

export function isDraw(board: Board) {
    return board.every((cell) => cell.every(Boolean))
}

export function getAvailableMoves(board: Board): number[] {
    const moves: number[] = []

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (!cell) {
                moves.push(rowIndex * 3 + colIndex)
            }
        })
    })

    return moves
}

// used the minimax algorithm for ai.
export function minimax(
    board: Board,
    depth: number,
    isMaximizing: boolean,
    ai: Player
) {
    const player = ai === "x" ? "o" : "x"
    const winner = getWinner(board)
    const draw = isDraw(board)
    if (winner || draw) {
        if (winner === ai) {
            return { score: 10 - depth, index: -1 }
        } else if (winner != null) {
            return { score: depth - 10, index: -1 }
        } else {
            return { score: 0, index: -1 }
        }
    }

    const availableMoves = getAvailableMoves(board)
    if (isMaximizing) {
        let bestMove: Move = { score: -Infinity, index: -1 }

        for (const move of availableMoves) {
            const [row, col] = [Math.floor(move / 3), move % 3]
            board[row][col] = ai
            const moveScore = minimax(board, depth + 1, !isMaximizing, ai).score
            board[row][col] = null
            if (moveScore > bestMove.score) {
                bestMove.score = moveScore
                bestMove.index = move
            }
        }

        return bestMove
    } else {
        let bestMove: Move = { score: Infinity, index: -1 }

        for (const move of availableMoves) {
            const [row, col] = [Math.floor(move / 3), move % 3]
            board[row][col] = player
            const moveScore = minimax(board, depth + 1, !isMaximizing, ai).score
            board[row][col] = null
            if (moveScore < bestMove.score) {
                bestMove.score = moveScore
                bestMove.index = move
            }
        }

        return bestMove
    }
}
