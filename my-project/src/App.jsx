//Components
import StartScreen from "./components/StartScreen"
import Game from "./components/Game"
import GameOver from "./components/GameOver"

//React
import { useCallback, useEffect, useState } from "react"

//Data
import { wordsList } from "./data/words"


let stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

let guessesQty = 5

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  let [words] = useState(wordsList)

  let [pickedWord, setPickedWord] = useState("")
  let [pickedCategory, setPickedCategory] = useState("")
  let [letters, setLetters] = useState([])

  let [guessedLetters, setGuessedLetters] = useState([])
  let [wrongLetters, setWrongLetters] = useState([])
  let [guesses, setGuesses] = useState(guessesQty)
  let [score, setScore] = useState(0)

  let pickWordAndCategory = useCallback(() => {
    //As categorias vão ser as chaves do objeto "words"
    let categories = Object.keys(words) //É gerado um array com as "keys"
    let category =
      categories[Math.floor(Math.random() * categories.length)];


    let word = words[category][Math.floor(Math.random() * words[category].length)]
    return { word, category }
  }, [words])


  //Começando o jogo em si.
  let startGame = useCallback(() => {
    //Limpando todas as letras
    clearLetterStates()
    //Escolhendo uma categoria e palavra aleatória
    let { word, category } = pickWordAndCategory()

    //Criando um array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letra) => letra.toLowerCase())

    setGuesses(guessesQty);

    //Setando os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory]);

  //Verificação das letras do input
  //Verificação das letras do input
  let verifyLetter = (letter) => {
    let normalizedLetter = letter.toLowerCase()
    //Chegando se as letras já foram utilizadas antes
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //Colocando a letra adivinhada ou removendo a adivinhação
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1) // Decrementando as tentativas
    }
  }

  let clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //Verificando se as guesses terminaram
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])


  //Chegando a win condition
  useEffect(() => {
    let uniqueLetters = [... new Set(letters)]

    //win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {

      //Adicionando o score
      setScore((actualScore) => actualScore += 100)

      //Resetando o jogo com novas palavras
      startGame()
    }

  }, [guessedLetters, letters, startGame, gameStage])

  //Recomeçar o jogo
  let restart = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div>
      {/*Criando os estágios do jogo dependendo da condição da variável "gameStage"*/}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver score={score} restart={restart} />}
    </div>
  )
}

export default App
