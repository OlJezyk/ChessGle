import { PieceType, Team, Piece } from "../components/Chessboard/Chessboard";
import { } from "../components/Chessboard/Chessboard";

export default class Referee {
    tileIsoccupied(x: number, y: number, boardstate: Piece[]): boolean {
        const piece = boardstate.find((p) => p.x === x && p.y === y);
        if (piece)
            return true
        else
            return false
    }
    isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: Team, boardState: Piece[]) {

        if (type === PieceType.PAWN) {
            const specialRow = (team === Team.WHITE) ? 1 : 6
            const pawnDirection = (team === Team.WHITE) ? 1 : -1;

            if (py === specialRow) {
                if (px === x && y - py === 1 * pawnDirection) {
                    if (!this.tileIsoccupied(x, y, boardState)) {
                        return true
                    }
                } else if (px === x && y - py === 2 * pawnDirection) {
                    if (!this.tileIsoccupied(x, y, boardState) && !this.tileIsoccupied(x, y - pawnDirection, boardState)) {
                        return true
                    }
                }
            }
            else {
                if (x === px && y - py === pawnDirection) {
                    if (!this.tileIsoccupied(x, y, boardState)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}