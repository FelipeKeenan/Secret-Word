const GameOver = ({ restart, score }) => {
    return (
        <div>
            <h1 className="text-4xl mb-4 font-bold">Game Over!</h1>
            <h2 className="mb-4 text-2xl">A sua pontuação foi: 
                <span className="text-yellow-300 font-bold text-2xl"> {score}</span>
            </h2>
            <button className="btn" onClick={restart}>Recomeçar o jogo</button>
        </div>
    )
}

export default GameOver
