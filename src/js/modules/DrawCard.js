export default class DrawCards{
    constructor(){
    }
    moveCardToDrawnPile(card, drawnPile){
        card[3] = 'show';
        drawnPile.push(card);
    }
    removeCardFromUnDrawnPile(undrawnPile){
        undrawnPile.splice(0, 1);
    }
    resetUndrawn(undrawnPile, drawnPile){
        // undrawnPile = drawnPile; // this won't work
        drawnPile.forEach(el => undrawnPile.push(el));
    }
    resetDrawn(drawnPile){
        drawnPile.splice(0, drawnPile.length)
    }
}