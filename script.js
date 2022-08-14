let Player1;
let Player2;
document.querySelector('.start').addEventListener('click', (e) => {
    if(document.querySelector('#player-1').value != "") {
        Player1 = Player(document.querySelector('#player-1').value, 'x')
    } else {
        Player1 = Player("Player 1", 'x')
    }

    if(document.querySelector('#player-2').value != "") {
        Player2 = Player(document.querySelector('#player-2').value, 'o')
    } else {
        Player2 = Player("Player 2", 'o')
    }


    document.querySelector('.player-1-display').innerText = Player1.getName() + ": X"
    document.querySelector('.player-2-display').innerText = Player2.getName() + ": O"


    document.querySelector('.box').classList.add('hidden')
    document.querySelector('.game').classList.remove('hidden')

})

const gameBoard = (() => {
    let currentGameboard = ["", "", "", "", "", "", "", "", ""]
    let currentTurn = 'x'


    const renderContent = () => {
        currentGameboard = ["", "", "", "", "", "", "", "", ""]
        for (let index = 0; index<currentGameboard.length; index++) {
            const field = document.querySelector(`.cell-${index+1}`)
            field.innerHTML = ''
            const paragraph = document.createElement('p')
            paragraph.classList.add(`text-${index}`)
            paragraph.innerText = currentGameboard[index]
            field.appendChild(paragraph)

            field.addEventListener('click', (e) => {
                if(currentGameboard[index] === "") {
                    placeMarker(index)
                    updateBoard()
                    displayController.checkSolution()
                }
            })

            field.style.pointerEvents = "all"

            document.querySelector('.restart').addEventListener('click', (e) => {
                restartBoard()
            })


        }
    }

    const placeMarker = (position) => {
        
        document.querySelector('.text-' + position).innerText = getCurrentTurn()
        currentGameboard[position] = getCurrentTurn()
        toggleTurn()
    
    
    }

    const updateBoard = () => {
        for (let index = 0; index<currentGameboard.length; index++) {
            document.querySelector(`.text-${index}`).innerText = currentGameboard[index]
        }
    }
    const restartBoard = () => {
        currentGameboard = ["", "", "", "", "", "", "", "", ""]
        let fields = document.querySelectorAll('.item')
        fields.forEach(item => {
            item.style.pointerEvents = "all"
        })
        updateBoard()
        currentTurn = "x"
        document.querySelector('.player-1-display').classList.add('turn')
        document.querySelector('.player-2-display').classList.remove('turn')
        document.querySelector('.congratulation-display').innerHTML = ''
    }

    const getCurrentGameBoard = () => {
        return(currentGameboard)
    }
    

    const getCurrentTurn= () => {
        return(currentTurn)
    }

    const toggleTurn= () =>{currentTurn == 'x' ? currentTurn = 'o' : currentTurn = 'x'}

    return {
        renderContent,
        getCurrentGameBoard
    }


})()
gameBoard.renderContent()

const displayController = (() => {

    const checkSolution = () => {
        let list = gameBoard.getCurrentGameBoard()
        if(list[0] == 'x' && list[1] == 'x' && list[2] == 'x' || 
        list[3] == 'x' && list[4] == 'x' && list[5] == 'x' || 
        list[6] == 'x' && list[7] == 'x' && list[8] == 'x' || 
        list[0] == 'x' && list[3] == 'x' && list[6] == 'x' || 
        list[1] == 'x' && list[4] == 'x' && list[7] == 'x' || 
        list[2] == 'x' && list[5] == 'x' && list[8] == 'x' || 
        list[0] == 'x' && list[4] == 'x' && list[8] == 'x' || 
        list[2] == 'x' && list[4] == 'x' && list[6] == 'x'){
            const winnerDisplay = document.createElement('h2')
            winnerDisplay.innerText = 'Congratulation ' + Player1.getName() + "!"
            document.querySelector('.congratulation-display').appendChild(winnerDisplay)
            console.log('Winner: Player 1')
            stopGame()
        } else if(list[0] == 'o' && list[1] == 'o' && list[2] == 'o' || 
        list[3] == 'o' && list[4] == 'o' && list[5] == 'o' || 
        list[6] == 'o' && list[7] == 'o' && list[8] == 'o' || 
        list[0] == 'o' && list[3] == 'o' && list[6] == 'o' || 
        list[1] == 'o' && list[4] == 'o' && list[7] == 'o' || 
        list[2] == 'o' && list[5] == 'o' && list[8] == 'o' || 
        list[0] == 'o' && list[4] == 'o' && list[8] == 'o' || 
        list[2] == 'o' && list[4] == 'o' && list[6] == 'o'){
            const winnerDisplay = document.createElement('h2')
            winnerDisplay.innerText = 'Congratulation ' + Player2.getName() + "!"
            document.querySelector('.congratulation-display').appendChild(winnerDisplay)
            console.log('Winner: Player 1')
            stopGame()

        
        
        } else {
            let count = 0
            for (let index = 0; index < gameBoard.getCurrentGameBoard().length; index++) {
                const element = gameBoard.getCurrentGameBoard()[index];
                if(element == "x" || element == "o") {
                    count+=1
                    console.log(count)

                }

                if(count == 9) {
                    const winnerDisplay = document.createElement('h2')
                    winnerDisplay.innerText = 'TIE!!!'
                    document.querySelector('.congratulation-display').appendChild(winnerDisplay)
                    console.log('TIE!')
                    stopGame()
                    return
                }
                
            }

            document.querySelector('.player-1-display').classList.toggle('turn')
            document.querySelector('.player-2-display').classList.toggle('turn')
        }
    }

    const stopGame = () => {
        let fields = document.querySelectorAll('.item')
        fields.forEach(item => {
            item.style.pointerEvents = "none"
        })
    }

    return{
        checkSolution
    }
})()



const Player = (name, symbol) => {
    const getName = () => {
        return(name)
    }
    const getSymbol = () => {
        return(symbol)
    }
    return {
        getName,
        getSymbol,
    }
}


