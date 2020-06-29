export default class Game{
    constructor (){
        this.cards = [];  
        this.board = {
            bottomColumns: [],
            upperColumns: [],
        }; 
        
        this.undrawnPile = [];
        this.drawnPile = [];
        
    }
    
    // create cards
    createCards(){
        var suits = [['heart', 'red'], ['spade', 'black'], ['diamond', 'red'], ['club', 'black']];
        suits.forEach(el => {
            for (let i = 1; i < 14; i++){
                var num, card;
                card = [el[0], i, el[1]];
                this.cards.push(card);
            }
        })
    };

    // randomize cards
    randomizeDeck(){
        var currentIndex = this.cards.length, temporaryValue, randomIndex;

        // while there remain elements in the game.deck
        while (0 !== currentIndex){

            // pick a remaining element
            randomIndex = Math.floor(Math.random()*currentIndex);
            currentIndex -= 1;

            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    }; 

    // 
    setupBoard(){

        // bottom columns
        var arr = [1, 2, 3, 4, 5, 6, 7];

        let start = 0;
        let end;

        for(let i= 0; i< arr.length; i++){
            end = start + arr[i];
            
            this.board.bottomColumns.push(this.cards.slice(start, end));

            start = end;
        }

        this.undrawnPile = this.cards.slice(start);
        
        // upper left columns
        this.board.upperColumns = [
            [], [], [], []
        ]

    };


    // notice how the cards array now also have show/hide though this function is only targeting the columns at the bottom
    hideShowCards(){
        // bottom columns
        this.board.bottomColumns.forEach(col => {
            col.forEach(card => {
                if(col[col.length-1] === card){
                    card.push('show')    
                }else{
                    card.push('hide')    
                }
            });
        });

    }
}


