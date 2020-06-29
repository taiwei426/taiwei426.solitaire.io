import {createCardUI} from './base';

// var oldColumnCardsArr;

export function removeFromOldCol(oldColumnIndex, cardsToBeMoved){
    
    var numOfCardsToMove = cardsToBeMoved.length;
    
    var oldColumnCardsArr;

    for (let i = 0; i < numOfCardsToMove; i ++){
        oldColumnCardsArr = 
        Array.from(document.querySelectorAll(`.bottom_half .column-${oldColumnIndex} .card`));

        var lastCard = oldColumnCardsArr[oldColumnCardsArr.length - 1];

        lastCard.parentNode.removeChild(lastCard);

    }
    oldColumnCardsArr = 
        Array.from(document.querySelectorAll(`.bottom_half .column-${oldColumnIndex} .card`));

    return oldColumnCardsArr;
}

export function addToNewCol(newColumnIndex,upperColumns, cardsToBeMoved){

    if(newColumnIndex[0] === 'bottom'){
        cardsToBeMoved.forEach(el => {
            let curCard = createCardUI(el);

            var column = document.querySelector(`.bottom_half .column-${newColumnIndex[1]}`);

            // if the col was empty, then remove class
            if( column.classList.contains('empty')){
                column.classList.toggle('empty');
            }
            
            column.insertAdjacentHTML('beforeend', curCard);
        })
    } else if (newColumnIndex[0] === 'upper'){
        document.querySelector(`.top_half .column-${newColumnIndex[1]}`).innerHTML = '';

        var col = upperColumns[newColumnIndex[1]];var card = col[col.length - 1];
        let curCard = createCardUI(card);

        document.querySelector(`.top_half .column-${newColumnIndex[1]}`).insertAdjacentHTML('beforeend', curCard);
    }
}

export function addNewLastCard(oldColumnIndex, oldColumnNewLastCard, oldColumnCardsArr){
    
    var column = document.querySelector(`.bottom_half .column-${oldColumnIndex}`);

    if(oldColumnCardsArr.length >= 1){
        
        

        var removeNewLastCard = oldColumnCardsArr[oldColumnCardsArr.length-1];

        removeNewLastCard.parentNode.removeChild(removeNewLastCard);
    
        var newLastCard = createCardUI(oldColumnNewLastCard);

        column.insertAdjacentHTML('beforeend', newLastCard);
    
    // show empty state
    } else {
        column.classList.toggle('empty');
    }
}

// card's current col index
export function getCurColIndex (card){
    var classList = JSON.parse(JSON.stringify(card.parentNode.classList));
    classList = classList[1].split('-');
    return parseInt(classList[1]);
}