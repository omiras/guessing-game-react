import { useState } from 'react'
import './App.css'

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}

const chances = 10;


function App() {

  // Número correcto
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber); // pasamos la referencia a la función y React se va a encargar de ejecutarla. Si pusieramos los parentesis, no pasaria nada, porque useState solo actualiza targetNumber la primera vez. PERO la función si que se ejecutaria

  // intentos previos
  const [previousGuesses, setPreviousGuesses] = useState([]);

  // input
  const [currentGuess, setCurrentGuess] = useState('');

  // handler
  const handleNewGuess = () => {
    // 1. Añadir el nuevo número al array de previous Guesses
    setPreviousGuesses([...previousGuesses, currentGuess]);

    // 2. Limpiar el input
    setCurrentGuess('');
  }

  console.log(' Me renderizo, y voy a comparar estos dos números ', currentGuess, targetNumber)

  // hemos ganado? Si es nuestra última oportunidad, tenemos que comprobar esto antes de darlo por perdido.
  if (previousGuesses.at(-1) == targetNumber) {
    return <div id="wrapper">
      <h1>Game Won! Correct number was {targetNumber}</h1>
      <button>Try Again</button>
    </div>
  }

  // hemos perdido?
  // si el número de elementos del array es igual a la variable 'chances', hemos perdido
  // Retornar un JSX mínimo indicando que hemos perdido y ofriencdo un botón para empezar de nuevo
  if (chances == previousGuesses.length) {
    return <div id="wrapper">
      <h1>Game Lost! Correct number was {targetNumber}</h1>
      <button>Try Again</button>
    </div>
  }



  return (
    <>
      <h1>Number guessing game</h1>
      <p>Try and guess a random number between 1 and 100.</p>
      <p>You have 10 attempts to guess the right number.</p>
      <br />
      <div id="wrapper">
        <label htmlFor="guessField" id="guess">Guess a number</label>
        <input type="text" id="guessField" className="guessField" value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)} autoComplete='off' />
        <button className="guessSubmit" onClick={handleNewGuess}>Submit a Guess</button>

        <div className="resultParas">
          <p style={{
            visibility: previousGuesses.length == 0 ? 'hidden' : 'visible'
          }}>Previous Guesses: <span className="guesses">{previousGuesses.join(", ")}</span></p>
          <p>Guesses Remaining: <span className="lastResult">{chances - previousGuesses.length}</span></p>
          <p className="lowOrHi" style={{
            visibility: previousGuesses.length == 0 ? 'hidden' : 'visible'
          }}>
            {
              // 55 > 44
              previousGuesses.at(-1) > targetNumber ? 'Number must be lower' : 'Number must be higher'
            }
          </p>
        </div>
      </div>
    </>
  )
}

export default App;
