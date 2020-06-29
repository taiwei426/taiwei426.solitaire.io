import * as Base from './Base';

export default class CurrentPlay{
    constructor(currentCard){
        this.currentCard = currentCard; // [suit, #, color]
        
        // this.cardsToBeMoved = [];
        // this.oldColumnIndex
        // this.newColumnIndex
        // this.oldColumnNewLastCard
    }

    // for the new last card in the old column: change from 'hide' to 'show'
    findOldColNewLastCard(bottomBoard){
        // var oldColumnNewLastCard;
        if(bottomBoard[this.oldColumnIndex].length > 0){
            
            this.oldColumnNewLastCard = bottomBoard[this.oldColumnIndex][bottomBoard[this.oldColumnIndex].length - 1 ];
            
            this.oldColumnNewLastCard[3] = 'show';
        }
        return this.oldColumnNewLastCard;
    }

    isLastCardInCol(bottomBoard){
        var curCol = bottomBoard[this.oldColumnIndex];
        var lastCard = curCol[curCol.length - 1];
        return lastCard.join() === this.currentCard.join();
    }


    removeCards(bottomBoard, drawnPile, originates, callback){
        
         if(originates === 'bottom'){
            // get to-be-removed card from current column
            this.cardsToBeMoved = callback();

            // remove clicked card (& all cards that follow)
            bottomBoard[this.oldColumnIndex].splice(this.indexOfCardInOldCol);

            // for the new last card in the old column: change from 'hide' to 'show'
            this.oldColumnNewLastCard = this.findOldColNewLastCard(bottomBoard, this.oldColumnIndex);

        } else if (originates === 'drawn'){
            this.cardsToBeMoved =[];
            this.cardsToBeMoved.push(this.currentCard);

            drawnPile.splice(-1, 1);

        }
    }

    removeCardsFromBottomCols(bottomBoard, upperBoard, drawnPile, originates){

        if(originates === 'bottom'){
            // get to-be-removed card from current column
            this.cardsToBeMoved = bottomBoard[this.oldColumnIndex].slice(this.indexOfCardInOldCol, this.oldColumnLength );

            // remove clicked card (& all cards that follow)
            bottomBoard[this.oldColumnIndex].splice(this.indexOfCardInOldCol);

            // for the new last card in the old column: change from 'hide' to 'show'
            this.oldColumnNewLastCard = this.findOldColNewLastCard(bottomBoard, this.oldColumnIndex);

        } else if (originates === 'drawn'){
            this.cardsToBeMoved =[];
            this.cardsToBeMoved.push(this.currentCard);

            drawnPile.splice(-1, 1);

        } else if(originates === 'top_left'){
    
            var index = upperBoard[this.oldColumnIndex].length - 1;

            this.cardsToBeMoved = [];
            this.cardsToBeMoved.push(upperBoard[this.oldColumnIndex][index]);

            upperBoard[this.oldColumnIndex].splice(-1, 1);

        }
    }

    addBottomCards(bottomBoard, i){
        // add cards to column with attachment card
        this.cardsToBeMoved.forEach(el=> bottomBoard[i].push(el));

        this.newColumnIndex = ['bottom', i]        
    }

    moveInBottomCols(bottomBoard, upperBoard, bottomAttachmentCard, drawnPile, originates){
        for ( let i = 0; i < bottomBoard.length ; i++){
            
             // if it's a king
            if(this.currentCard[1] === 13 && bottomBoard[i].length === 0){
                
                // get to-be-removed card from current column
                this.removeCardsFromBottomCols(bottomBoard, upperBoard, drawnPile, originates);

                this.addBottomCards(bottomBoard, i)
                break;

            } else {

                // if the column has a card
                if(bottomBoard[i].length > 0){

                    // index of last card in each column
                    var index = bottomBoard[i].length - 1;

                    // if attachment matches last card in any column
                    if(bottomBoard[i][index][1] ===bottomAttachmentCard[0] && bottomBoard[i][index][2] === bottomAttachmentCard[1]){
                        
                        // get to-be-removed card from current column
                        this.removeCardsFromBottomCols(bottomBoard, upperBoard, drawnPile, originates);

                        this.addBottomCards(bottomBoard, i);

                        break;
                    }
                }
            }
        }
    }

    addUpperCards(upperBoard, i){
       
        // add card to new upper column
        upperBoard[i].push(this.currentCard);

        // save in data
        this.newColumnIndex = ['upper', i]

        return true; // movedToUpperCol
    }

    moveInUpperCols(bottomBoard, upperBoard, upAttachmentCard, drawnPile, originates){

        for ( let i = 0; i < upperBoard.length ; i++){

            // move 1s
            if(this.currentCard[1] === 1 && upperBoard[i].length === 0){  
                
                this.removeCardsFromBottomCols(bottomBoard, upperBoard, drawnPile, originates);

                return this.addUpperCards( upperBoard, i)
        
            // move all other #s aside from 1s
            } else {

                // index of last card in each column
                if (upperBoard[i].length > 0){
                    
                    var index = upperBoard[i].length - 1;

                    if(upperBoard[i][index][0] ===upAttachmentCard[0] && upperBoard[i][index][1] === upAttachmentCard[1]){ 
                        
                        this.removeCardsFromBottomCols(bottomBoard, upperBoard, drawnPile, originates);
                        
                        return this.addUpperCards( upperBoard, i) 
                    }
                }
            }       
        }
    }

    getCardInfo(oldColumnIndex,  indexOfCard, columnLength){
        // card's orig info
        this.oldColumnIndex = oldColumnIndex;
        this.indexOfCardInOldCol = indexOfCard;
        this.oldColumnLength = columnLength;
    }
    
    moveCard(bottomBoard, upperBoard, drawnPile, originates){
        
        // bottom attachment card
        var bottomAttachmentCard = Base.findBottomAttachmentCard(this.currentCard);

        // if card is drawn or is last card, then can move to upper or lower

        if(originates === 'top_left'){

            this.moveInBottomCols(bottomBoard, upperBoard, bottomAttachmentCard, drawnPile, originates);
            
        } else if(originates === 'drawn' || this.isLastCardInCol(bottomBoard, this.oldColumnIndex) === true){

            // upper columns attachment card
            var upAttachmentCard = Base.findUpperAttachmentCard(upperBoard, this.currentCard);

            // attach to upper columns
            var movedToUpperCol = this.moveInUpperCols(bottomBoard, upperBoard, upAttachmentCard, drawnPile, originates)
            // returns true if it's moved to upper cols

            // attach to bottom columns if didn't attach to upper
            if(movedToUpperCol !== true){
                
                this.moveInBottomCols(bottomBoard, upperBoard, bottomAttachmentCard, drawnPile, originates);
            }

        // otherwise, can only move in the bottom columns  // (from the top left corner)
        } else {
            this.moveInBottomCols(bottomBoard, upperBoard, bottomAttachmentCard, drawnPile, originates);
        }       
    }
}
