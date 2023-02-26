
import './App.css';
import Chessboard from './components/Chessboard/Chessboard';

function App() {
  return (
    <div id="app" >
      <div onContextMenu={(e) => e.preventDefault()}>
        <Chessboard />
      </div>
    </div>
  );
}

export default App;
