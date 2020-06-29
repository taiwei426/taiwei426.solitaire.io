import {createCardUI} from './base';

var leftContainer = document.querySelector('.left_container');

var bottomContainer = document.querySelector('.bottom_half');

var undrawnPileContainer =  document.querySelector(`.undrawn-pile`);


function clearColumns(){
    leftContainer.innerHTML = '';
    
    bottomContainer.innerHTML = '';
    
    document.querySelector(`.drawn-pile`).innerHTML = '';


    undrawnPileContainer.innerHTML = '';

    var undrawn = `
        <div class="card hide"></div>
    `

    undrawnPileContainer.insertAdjacentHTML('beforeend', undrawn);
}

function renderColumns(){
    //render upper columns
    for(let i = 0; i < 4; i++){
        let html = `
        <div class="column column-${i}"></div>
    `
        leftContainer.insertAdjacentHTML('beforeend', html)
    }

    // render bottom columns
    for(let i = 0; i < 7; i++){
        let html = `
            <div class="column column-${i}"></div>
        `
        bottomContainer.insertAdjacentHTML('beforeend', html)
    }
}


function showBottomBoard(bottomColumns){

    // show columns
    bottomColumns.forEach((col, index) => {
        var lastCardInColIndex = col.length - 1;

        col.forEach(el2 => {
            // console.log(col.indexOf(el2))
            var html = createCardUI(el2);
            document.querySelector(`.bottom_half .column-${index}`).insertAdjacentHTML('beforeend', html);

        })
    })
}


export function setupBoard (board, undrawnPile){
    // clear off board/columns / reset
    clearColumns();

    // render column containers
    renderColumns();
    
    // set up bottom columns
    showBottomBoard(board.bottomColumns);
}



