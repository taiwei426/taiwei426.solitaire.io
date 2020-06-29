import {createCardUI} from './base';

export function showDrawnCard(card){
    document.querySelector(`.drawn-pile`).innerHTML = '';

    var drawnCard = createCardUI(card);

    document.querySelector(`.drawn-pile`).insertAdjacentHTML('beforeend', drawnCard);
}

export function resetDrawnCards(){
    document.querySelector(`.drawn-pile`).innerHTML = '';
    
    document.querySelector(`.undrawn-pile`).innerHTML = '';

    var undrawn = `
        <div class="card hide"></div>
    `

    document.querySelector(`.undrawn-pile`).insertAdjacentHTML('beforeend', undrawn);
    
}


export function resetPilesButton(){
    document.querySelector(`.undrawn-pile`).innerHTML = '';

    var reset = `
        <div class="card reset" ></div>
    `
    document.querySelector(`.undrawn-pile`).insertAdjacentHTML('beforeend', reset);
}

export function noMoreCards(){
    document.querySelector(`.drawn-pile`).innerHTML = '';
    
    document.querySelector(`.undrawn-pile`).innerHTML = '';
}