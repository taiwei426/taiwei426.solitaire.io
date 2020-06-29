export function findBottomAttachmentCard(currentCard){
    var bottomAttachmentCard = []; // [#, color]
    
    bottomAttachmentCard.push(currentCard[1] + 1);
    
    currentCard[2] === 'red' ? bottomAttachmentCard.push('black') : bottomAttachmentCard.push('red');

    return bottomAttachmentCard;
}

export function findUpperAttachmentCard(upperBoard, currentCard){
    for ( let i = 0; i < upperBoard.length ; i++){
        var upAttachmentCard = [] // [suit, #]
        if(upperBoard[i].length === 0){
            upAttachmentCard = [currentCard[0], 1]
        } else {
            upAttachmentCard.push(currentCard[0])
            upAttachmentCard.push(currentCard[1] - 1);
        }
        return upAttachmentCard;
    }
}