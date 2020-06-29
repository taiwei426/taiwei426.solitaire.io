import Game from './modules/Game';
import CurrentPlay from './modules/MoveCard';
import DrawCards from './modules/DrawCard';
import CheckWinner from './modules/Winner.js';
import * as gameView from './views/gameView';
import * as moveCardView from './views/moveCardView';
import * as drawCardView from './views/drawCardView';
import * as winnerView from './views/winnerView';

var game = {
    
};



/////////////////////
// SET UP BOARD


window.addEventListener('load', () => {
    setUpGame();
})

document.querySelector('.new_game_button').addEventListener('click',  () => {
    setUpGame();
});

document.querySelector('.wrapper').addEventListener('click', event => {
    if(event.target.matches('.overlay_play_again')){
        winnerView.removeWinnerOverlay();
        setUpGame();   
    } else if (event.target.matches('.close_overlay')){
        winnerView.removeWinnerOverlay();
    }
})

var setUpGame = () => {

    // setup data
    game = new Game();

    // create & randomize cards
    game.createCards();
    game.randomizeDeck();
    game.setupBoard();
    game.hideShowCards();
    
    // set up game on UI
    gameView.setupBoard(game.board, game.undrawnPile);

    console.log(game);
}




/////////////////////
// DRAW CARD

document.querySelector('.undrawn-pile ').addEventListener('click', () => {
    drawCard();
})

function drawCard(){
    
    var cardDrawn = game.undrawnPile[0];
    
    game.drawCard = new DrawCards();

    if (cardDrawn){
        // data: move card to drawn pile
        game.drawCard.moveCardToDrawnPile(game.undrawnPile[0], game.drawnPile);
            
        // data: remove card from undrawn pile
        game.drawCard.removeCardFromUnDrawnPile(game.undrawnPile)
    
        // show in UI
        drawCardView.showDrawnCard(cardDrawn);

        // if no more cards, reset cards button
        if (game.undrawnPile.length === 0){
            drawCardView.resetPilesButton();
        }
    
    // if no more cards in undrawnPile, reset piles    
    }  else {

        if(game.drawnPile.length > 0){
            
            // data: undrawn pile = drawn pile
            game.drawCard.resetUndrawn(game.undrawnPile, game.drawnPile)

            // data: drawn pile = 0
            game.drawCard.resetDrawn(game.drawnPile)

            // update UI
            if(game.undrawnPile.length > 0){
                drawCardView.resetDrawnCards(true);
            }

        } 
    }
}




/////////////////////
// MOVE CARD

document.querySelector('.bottom_half ').addEventListener('click', event => {
    moveCard(event, 'bottom');
})

document.querySelector('.drawn-pile ').addEventListener('click', event => {
    moveCard(event, 'drawn');
})

document.querySelector('.left_container').addEventListener('click', event => {
    moveCard(event, 'top_left');
})

function switchCardsInUI(originates){

    if(game.currentPlay.cardsToBeMoved){

        moveCardView.addToNewCol(
            game.currentPlay.newColumnIndex, 
            game.board.upperColumns, 
            game.currentPlay.cardsToBeMoved)

        if(originates === 'bottom'){

            var oldColumnCardsArr = moveCardView.removeFromOldCol(
                game.currentPlay.oldColumnIndex, 
                game.currentPlay.cardsToBeMoved );
            
            moveCardView.addNewLastCard(
                game.currentPlay.oldColumnIndex,
                game.currentPlay.oldColumnNewLastCard,
                oldColumnCardsArr);

        } else if (originates === 'drawn'){
            if(game.drawnPile.length > 0){
                
            }

            var lastDrawnCard = game.drawnPile[game.drawnPile.length - 1];
                
            drawCardView.showDrawnCard(lastDrawnCard)
            

            // doesn't work
            if (game.undrawnPile.length === 0 && game.drawnPile.length === 0){
                console.log('no more cards')
                drawCardView.noMoreCards();
        
            }

        } else if(originates === 'top_left'){

            if (game.board.upperColumns.length > 0){
                
                var newColumnIndex = ['upper', game.currentPlay.oldColumnIndex];

                moveCardView.addToNewCol(newColumnIndex, game.board.upperColumns)
            }
        }
    }
}


function switchCardsInData(card, originates, callback){

    if(card && card.classList.contains('show')){

        // parse current card dataset into array format
        var currentCard = card.dataset.card.split(',');
        currentCard[1] = parseInt(currentCard[1]);

        // create new CurrentPlay module
        game.currentPlay = new CurrentPlay(currentCard);

        if (originates === 'bottom'){
            // gets column index of card
            var oldColumnIndex = moveCardView.getCurColIndex(card);

            // gets index of card in col
            var column = Array.from(card.parentNode.children);
            var columnLength = column.length;
            var indexOfCard = column.indexOf(card);

            // pass card info into MoveCard & data
            game.currentPlay.getCardInfo(
                oldColumnIndex,  
                indexOfCard, 
                columnLength
            );

        } else if (originates === 'top_left'){
            var oldColumnIndex = moveCardView.getCurColIndex(card);

            game.currentPlay.getCardInfo(oldColumnIndex);

        }

        // card switches columns in data
        game.currentPlay.moveCard(
            game.board.bottomColumns, 
            game.board.upperColumns, 
            game.drawnPile,
            originates
        );

        callback();
    };
    
}

function moveCard(event, originates){
    
    var card = event.target.closest('.card');
    

    switchCardsInData(card, originates, function(){
        switchCardsInUI(originates);
    });
    
    checkWinner();

    console.log(game);
}


function checkWinner(){
    game.isWinner = CheckWinner(game.board.upperColumns);

    if(game.isWinner === true){
        winnerView.showWinnerOverlay();
    }
    
}





///////
// REVIEW

// var currentIndex = game.deck.length, temporaryValue, randomIndex;
// less dumb way to create columsn?
// can pass variables into arrays: have to write it as [game.col0, game.col1...] and not [col0, col1, col2...] 


// can't break out of forEach

// can't compare 2 arrays to see if they match: el[index].join() === this.currentCard.join();
// .join() & .toString() are still not good. best to not compare arrays. prob should've used obj. instead got the index from the UI


// i guess i can't have a function within another function and call on 'this' function outside the parent function. i guess 'this' is pointing to the wrong object

// can't set data equal to another data? 
// undrawnPile = drawnPile;


///////
/// QUESTIONS
// how is game.board getting updated from MoveCard.js? 
// when to make variables and when to save it to 'this'
// how are the game.cards getting show/hide updated when the function is only targeting the columns?



///////
/// ERRORS

// cardsToBeRemoved aren't being updated in view. happens in data
// when moving a part of the shown cards. ie: cards 5, 4, 3 are shown, and you only want to move 4, 3
// when it skips a column in the UI, that's bc there's an extra card in the data
// prob related to above: same card got pushed into 2 separate data columns - actual bug, happened 2x, only gets rendered 1x. i think it's happening when it's a drawn card and there are 2 attachment cards in the bottom

// missing cards (played almost till the end of the game but only have 50 instead of 52 cards)


// THINGS TO IMPROVE
// when drawn and undrawn piles are gone, there's still a refresh button. search 'doesn't work'
// card movement transitions
// saving # of moves. scoreboard for best moves
// better looking cards
