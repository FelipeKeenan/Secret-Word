const StartScreen = ({ startGame }) => {
    return (
        <div className="sm: px-6">
            <span className="mb-2 block">Bem-vindo ao</span>
            <h1 className="text-4xl shadow-text animate-bounce">Secret <span className="w-customize"></span>rd</h1>
            <div className="border my-4 p-4 border-gray-500 rounded-md">
                <h3 className="underline font-bold text-2xl mb-3">Como jogar</h3>
                <ul className="pl-6 text-left">
                    <li className="li-style">Você terá 5 tentativas para acertar cada palavra</li>
                    <li className="li-style">A cada palavra adivinhada, você ganhará 100 pontos</li>
                    <li className="mb-2 text-center">Boa sorte!</li>
                </ul>
            </div>
            <p className="my-4 text-[#ecfa00]">Clique no botão abaixo para começar a jogar</p>
            <button onClick={startGame} className="btn">Jogar</button>
        </div>
    )
}

export default StartScreen
