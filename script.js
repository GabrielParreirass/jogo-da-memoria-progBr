// document.addEventListener('DOMContentLoaded', () => {
//     let cartas = document.querySelectorAll('.card')

//     cartas.forEach((cartas) => {
//         cartas.addEventListener('click', foiClicado)
//     })
// })

// function foiClicado(){
//     this.classList.add('flip')
//     console.log(this)
// }


const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

let techs = ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react']


let cards = null

let lockMode = false
let firstCard= null
let secondCard = null


startGame()

function startGame(){
    cards = createCardsFromTechs(techs);
    shuffleCards(cards)
    initializeCards(cards)
}



function initializeCards(cards){

    let gameBoard = document.getElementById('gameBoard')

    cards.forEach(card =>{
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)

        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)

    })

}


function flipCard(){

    if(setCard(this.id)){
        this.classList.add('flip')
        if(checkMatch()){
            clearCards()
            if (checkGamerOver()){
                setTimeout(()=>{let telaFinal = document.getElementById('gameOver')
                telaFinal.style.display ='flex'}, 1000)
            }
        }else{

            setTimeout(()=>{
            
            let firstCardView = document.getElementById(firstCard.id)
            let secondCardView = document.getElementById(secondCard.id)

            firstCardView.classList.remove('flip')
            secondCardView.classList.remove('flip')
            unflipCards()
            }, 1000)
        }
    }
    
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, cardElement){
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if(face === FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "images/"+card.icon+".png"
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = '&lt/&gt'
    }
    cardElement.appendChild(cardElementFace)
}


function setCard(id){
    let card = cards.filter(card => card.id === id)[0]

    if(card.flipped || lockMode){
        return false
    }

    if(!firstCard){
        firstCard = card
        firstCard.flipped = true
        return true
    }else{
        secondCard = card
        secondCard.flipped = true
        lockMode = true
        return true
    }
}

function unflipCards(){
    firstCard.flipped = false
    secondCard.flipped = false
    clearCards()
}

function checkMatch(){
    return firstCard.icon === secondCard.icon
}

function clearCards(){
     firstCard = null
     secondCard= null
     lockMode= false
}


function shuffleCards(cards){
    let currentIndex = cards.length
    let randomIndex = 0

    while(currentIndex !== 0){

        randomIndex = Math.floor(Math.random() * currentIndex)

        currentIndex--

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }

}


function createCardsFromTechs(techs) {
    let cards = []

    for (let tech of techs) {
        cards.push(createPairFromTech(tech))
    }
    return (cards.flatMap(pair => pair))
}


function createPairFromTech(tech) {

    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    }, {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    }]

}


function createIdWithTech(tech){
    return tech + parseInt(Math.random() * 1000)
}


function checkGamerOver(){
    return cards.filter(card => !card.flipped).length == 0
}


var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    
    location.reload();
});

