import { useState } from 'react'
import './App.css'

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}

function App() {

  // Variable de estado para indicar el número de intentos restantes
  const [remainingGuesses, setRemainingGuesses] = useState(10);

  // Números probados hasta el momento
  const [guesses, setGuesses] = useState([]);

  // input
  const [currentGuess, setCurrentGuess] = useState('');

  // Número correcto
  const [correctNumber, setCorrectNumber] = useState(generateRandomNumber);

  const handleNewGuess = () => {
    // añadir la predicción al array de guesses
    setGuesses([...guesses, currentGuess]);
    // limpiar el input
    setCurrentGuess('');
  }

  const handleResetGame = () => {
    setCorrectNumber(generateRandomNumber);
    setRemainingGuesses(10);
    setGuesses([])
  }

  // si hemos ganado
  if (guesses.at(-1) == correctNumber) {
    return <div id="wrapper">
      <h1>Game Won! Correct number was {correctNumber}</h1>
      <button className="guessSubmit" onClick={handleResetGame}>Try Again</button>
    </div>
  }

  // si hemos agotado los intentos
  if (remainingGuesses === 0) {
    return <div id="wrapper">
      <h1>Game Lost! Correct number was {correctNumber}</h1>
      <button className="guessSubmit" onClick={handleResetGame} >Try Again</button>
    </div>
  }

  return (
    <>
      <h1>Number guessing game {correctNumber}</h1>
      <p>Try and guess a random number between 0   and 100.</p>
      <p>You have  attempts to guess the right number.</p>
      <br />
      <div id="wrapper">
        <label htmlFor="guessField" id="guess">Guess a number</label>
        <input type="number" id="guessField" className="guessField" max={100} min={0} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)} />
        <button className="guessSubmit" onClick={handleNewGuess}>Submit a Guess</button>

        <div className="resultParas">
          {guesses.length != 0 && <p>Previous Guesses: <span className="guesses">{guesses.join(" , ")}</span></p>}
          <p>Guesses Remaining: <span className="lastResult">{remainingGuesses}</span></p>
          {guesses.length !=0 && <p className="lowOrHi">
            { /**
             * Comprobar si la última predicción es mayor o menor y mostrar un mensaje en consequencia
             */
             
            guesses.at(-1) > correctNumber ? "Number is lower": "Number is higher"
             
             
             }
          </p>}
        </div>
      </div>
    </>
  )
}

export default App;
