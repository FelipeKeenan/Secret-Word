import { useState, useRef } from "react"

const Game = ({ verifyLetter,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score
}) => {


    let [letter, setLetter] = useState('')
    let letterInputRef = useRef(null)

    let handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)

        setLetter("")

        //Deixando o foco no input das letras a cada vez que foi 
        letterInputRef.current.focus()

    }

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="data-state">Pontuação: {score}</p>
            <h1 className="text-4xl my-8">Advinhe a palavra:</h1>
            <h3 className="my-5 text-2xl sm:px-2">Dica sobre a palavra:
                <span className="text-yellow-300"> {pickedCategory}</span>
            </h3>
            <p>Você ainda tem <span className="data-state">{guesses}</span> tentativas</p>
            <div className="border-[20px] border-yellow-300 mb-5 flex justify-center items-center p-4 sm:border-[2px]">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span className="input-letters" key={i}>{letter}</span>
                    ) : (
                        <span key={i} className='input-letters no-border'></span>
                    )
                ))}
            </div>

            <div>
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4 my-8">
                    <input className="w-12 h-12 text-center text-2xl text-black border-1 border-gray-400"
                        type="text"
                        value={letter}
                        name="letter"
                        maxLength={1}
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        ref={letterInputRef}
                    />

                    <button className="btn">Jogar!</button>
                </form>
            </div>
            <div>
                <p className="text-2xl">Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span className="text-red-500 font-bold text-xl" key={i}>{letter}, </span>
                ))}
            </div>

        </div>
    )
}

export default Game