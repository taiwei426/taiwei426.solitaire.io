import ConfettiGenerator from "confetti-js";

function renderConfetti(){
    var confettiSettings = { target: 'confetti-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

export function showWinnerOverlay(){

    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', winnerOverlay);

    renderConfetti();
    
}

var winnerOverlay = `
    <div class="winner_overlay">
        <canvas id="confetti-canvas"></canvas>
        <div class="winner_container">
            <div class="winner_inner">
                you're a <br><em class="winner">winner!</em>
            </div>
            <div class="overlay_play_again">play again</div>
        </div>
        <div class="close_overlay"></div>
    </div>
`

export function removeWinnerOverlay(){
    var overlay = document.querySelector('.winner_overlay');

    overlay.parentNode.removeChild(overlay);
}

export function closeWinnerOverlay(){

}