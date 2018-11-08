import React from "react";
import Square from "./Square.js";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.isXNext ? 'X': 'O';
        this.setState({
            squares: squares,
            isXNext: !this.state.isXNext
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)} 
        />;
    }

    render() {
        const winner = findWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner is: ' + winner;
        } else {
            status = 'Player: ' + (this.state.isXNext ? 'X' : 'O');
        }
        return (
        <React.Fragment>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
            </div>
        </React.Fragment>
        );
    }
}

function findWinner(squares) {
    const winnerLines = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];
    for(let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;