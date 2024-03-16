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
