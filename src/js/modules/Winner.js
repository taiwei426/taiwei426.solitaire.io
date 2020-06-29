
export default function CheckWinner(upperColumns){

    var isWinner = true;

    for(let i = 0; i< upperColumns.length; i++){
        if(upperColumns[i].length !== 13) {
            isWinner = false;
            break;
        } 
    }
    
    return isWinner;

}