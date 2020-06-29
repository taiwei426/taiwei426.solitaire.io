export function createCardUI(cardInfo){
    // cardInfo is an array
    
    if(cardInfo[3] === 'show'){
        var num;

        if(cardInfo[1] === 1){
            num = 'A'
        }else if(cardInfo[1] === 11){
            num = 'J'
        }else if(cardInfo[1] === 12){
            num  = 'Q'
        }else if (cardInfo[1] === 13){
            num = 'K'
        } else {
            num = cardInfo[1]
        }
    
        return `
            <div class="card ${cardInfo[2]} ${cardInfo[3]}" data-card="${cardInfo}">
                <img src="img/${cardInfo[0]}.png">
                ${num}
            </div>
        `
    } else {
        return `
            <div class="card hide" ></div>
        `
    }
  
}