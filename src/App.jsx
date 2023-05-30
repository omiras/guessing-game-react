import { useState } from 'react'
import './App.css'

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}

function App() {

  // lo usaremos para saber si el usuario ha introducido un numero más alto o más bajo. Además nos servirá si el usuario agota todos los intentos, para mostrarlo
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber())

  // tendremos que decrementar uno cada vez que el usuario introduzca un número
  const [remainingGuesses, setRemainingGuesses] = useState(2);

  // [4, 40, 20]
  const [previousGuesses, setPreviousGuesses] = useState([]);

  // del input
  const [currentGuess, setCurrentGuess] = useState('');

  // 'el número es menor' o 'el número es mayor'
  const [message, setMessage] = useState('');

  // ¿cual es el valor de randomNumber?
  console.log(randomNumber);
  console.log('Has cambiado el estado verdad ?? vuelvo a renderizar el componente');

  const handleClick = () => {

    // actualizamos previousGuesses. Es un array de numbers
    setPreviousGuesses([...previousGuesses, currentGuess]);

    // limpiar el input
    setCurrentGuess('');

    // comprobar 
    if (currentGuess > randomNumber) {
      setMessage('The number is lower');
      // decrementamos el número de intento. No podemos modificar directamente la variable remainingGuesses 
      setRemainingGuesses(remainingGuesses - 1);
    } else if (currentGuess < randomNumber) {
      setMessage('The number is higher');
      // decrementamos el número de intento. No podemos modificar directamente la variable remainingGuesses 
      setRemainingGuesses(remainingGuesses - 1);
    }
  }

  // si la variable de estado es 0, es que ya hemos perdido!
  if (remainingGuesses === 0) {
    return <h1>Lo siento! el número era {randomNumber}</h1>
  }

  // Si la útlima posición del número añadido a previousGuesses es justamente el número correcto, entonces hemos ganado
  if (randomNumber == previousGuesses[previousGuesses.length - 1]) {
    return <h1>Has ganado!</h1>
  }

  return (
    <>
      <h1>Number guessing game</h1>
      <p>Try and guess a random number between 0   and 100.</p>
      <p>You have {remainingGuesses} attempts to guess the right number.</p>
      <br />
      <div id="wrapper">
        <label htmlFor="guessField" id="guess">Guess a number</label>
        <input type="number" id="guessField" className="guessField" max={100} min={0} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)} />
        <button className="guessSubmit" onClick={handleClick}>Submit a Guess</button>

        <div className="resultParas">
          <p>Previous Guesses: <span className="guesses">{previousGuesses.join(' / ')}</span></p>
          <p>Guesses Remaining: <span className="lastResult">{remainingGuesses}</span></p>
          <p className="lowOrHi">{message}</p>
        </div>
      </div>
    </>
  )
}

export default App;
