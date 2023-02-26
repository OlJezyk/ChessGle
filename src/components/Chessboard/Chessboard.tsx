import Tile from '../Tile/Tile';
import './Chessboard.css';
import { useRef, useState } from "react"
import Referee from '../../Referee/Referee';
import { click } from '@testing-library/user-event/dist/click';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: Team;
}

export enum Team {
    WHITE,
    BLACK
}
export enum PieceType {
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING
}

const initalBoardState: Piece[] = [];

initalBoardState.push({ image: "assets/images/wr.png", x: 0, y: 0, type: PieceType.ROOK, team: 0 });
initalBoardState.push({ image: "assets/images/wn.png", x: 1, y: 0, type: PieceType.KNIGHT, team: 0 });
initalBoardState.push({ image: "assets/images/wb.png", x: 2, y: 0, type: PieceType.BISHOP, team: 0 });
initalBoardState.push({ image: "assets/images/wq.png", x: 3, y: 0, type: PieceType.QUEEN, team: 0 });
initalBoardState.push({ image: "assets/images/wk.png", x: 4, y: 0, type: PieceType.KING, team: 0 });
initalBoardState.push({ image: "assets/images/wb.png", x: 5, y: 0, type: PieceType.BISHOP, team: 0 });
initalBoardState.push({ image: "assets/images/wn.png", x: 6, y: 0, type: PieceType.KNIGHT, team: 0 });
initalBoardState.push({ image: "assets/images/wr.png", x: 7, y: 0, type: PieceType.ROOK, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 0, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 1, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 2, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 3, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 4, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 5, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 6, y: 1, type: PieceType.PAWN, team: 0 });
initalBoardState.push({ image: "assets/images/wp.png", x: 7, y: 1, type: PieceType.PAWN, team: 0 });

initalBoardState.push({ image: "assets/images/br.png", x: 0, y: 7, type: PieceType.ROOK, team: 1 });
initalBoardState.push({ image: "assets/images/bn.png", x: 1, y: 7, type: PieceType.KNIGHT, team: 1 });
initalBoardState.push({ image: "assets/images/bb.png", x: 2, y: 7, type: PieceType.BISHOP, team: 1 });
initalBoardState.push({ image: "assets/images/bq.png", x: 3, y: 7, type: PieceType.QUEEN, team: 1 });
initalBoardState.push({ image: "assets/images/bk.png", x: 4, y: 7, type: PieceType.KING, team: 1 });
initalBoardState.push({ image: "assets/images/bb.png", x: 5, y: 7, type: PieceType.BISHOP, team: 1 });
initalBoardState.push({ image: "assets/images/bn.png", x: 6, y: 7, type: PieceType.KNIGHT, team: 1 });
initalBoardState.push({ image: "assets/images/br.png", x: 7, y: 7, type: PieceType.ROOK, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 0, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 1, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 2, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 3, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 4, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 5, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 6, y: 6, type: PieceType.PAWN, team: 1 });
initalBoardState.push({ image: "assets/images/bp.png", x: 7, y: 6, type: PieceType.PAWN, team: 1 });

export default function Chessboard() {
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [grabbedPiece, setGrabbedPiece] = useState<HTMLElement | null>(null);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initalBoardState)
    const referee = new Referee();
    function grabPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setGrabbedPiece(element);
        }

    }
    function startDragPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setGrabbedPiece(element);
        }
    }
    function dragPiece(e: React.DragEvent) {
        const chessboard = chessboardRef.current;
        if (grabbedPiece && chessboard) {
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth;
            const maxY = chessboard.offsetTop + chessboard.clientHeight;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            grabbedPiece.style.position = "absolute";
            grabbedPiece.style.left = `${Math.min(Math.max(minX, x), maxX - 85)}px`;
            grabbedPiece.style.top = `${Math.min(Math.max(minY, y), maxY - 85)}px`;

        }
    }
    function endDragPiece(e: DragEvent) {
        const chessboard = chessboardRef.current;
        if (grabbedPiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            setPieces(value => {
                const pieces = value.map(p => {
                    if (p.x === gridX && p.y === gridY && referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value)) {
                        p.x = x;
                        p.y = y;
                    }
                    else {
                        grabbedPiece.style.position = "relative";
                        grabbedPiece.style.removeProperty('top')
                        grabbedPiece.style.removeProperty('left')
                    }
                    return p;
                })
                return pieces;
            });
            setGrabbedPiece(null);
        }
    }
    function movePiece(e: React.MouseEvent) {
        e.preventDefault()
        const chessboard = chessboardRef.current;
        if (grabbedPiece && chessboard) {
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth;
            const maxY = chessboard.offsetTop + chessboard.clientHeight;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            grabbedPiece.style.position = "absolute";
            grabbedPiece.style.left = `${Math.min(Math.max(minX, x), maxX - 85)}px`;
            grabbedPiece.style.top = `${Math.min(Math.max(minY, y), maxY - 85)}px`;

        }

    }
    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (grabbedPiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            setPieces(value => {
                const pieces = value.map(p => {
                    if (p.x === gridX && p.y === gridY && referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value)) {
                        p.x = x;
                        p.y = y;
                    }
                    else {
                        grabbedPiece.style.position = "relative";
                        grabbedPiece.style.removeProperty('top')
                        grabbedPiece.style.removeProperty('left')
                    }
                    return p;
                })
                return pieces;
            });
            setGrabbedPiece(null);
        }
    }

    let board = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image = undefined;
            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            })
            board.push(<Tile key={`${j},${i}`} image={image} number={number} />)
        }
    }
    return <div
        draggable={false}
        ref={chessboardRef}
        onMouseUp={e => dropPiece(e)}
        onMouseMove={e => movePiece(e)}
        onMouseDown={e => grabPiece(e)}
        id="chessboard">{board}
    </div>
}