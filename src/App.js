import './App.css';
import React from 'react';
import { useState } from 'react';
import Chessboard from 'chessboardjsx';
import {Chess} from 'chess.js'
import { useEffect } from 'react';
import { useRef } from 'react';


const container = {
  marginTop : "2rem",
  display: "flex",
  justifyContent: "center",
  alignItem: "center"

}

function App() {

  const [fen, setFen] = useState("start");

  let game = useRef(null); // we'll be using this to store our instance of chess.js

  useEffect(() => {
    game.current = new Chess();

  },[])

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });
      console.log(game)
    if(move === null){
      return;
    }

    setFen(game.current.fen());

  }
  
  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start");
  }

  var i = 1;
  return (
    <div>
      {
        game.current && game.current.isGameOver() ? <div style={{textAlign:"center"}}><h1>Game Over</h1><button onClick={resetGame}>Play Again</button></div> : <span></span>
      }
      <div className="App" style={container}>
        
        <Chessboard position={fen} onDrop={onDrop}/>

      </div>
    </div>
    
  );
}

export default App;
