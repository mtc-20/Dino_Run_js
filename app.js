document.addEventListener('DOMContentLoaded', () => {
const dino = document.querySelector('.dino')
const grid = document.querySelector('.grid')
const alert = document.getElementById('alert')
let isJumping = false
let gravity = 0.9
let position = 0
let isGameOver = false
let score = 0
let hiScore = 0
const dinoLeft = 50


function control(e) {
    if(e.keyCode === 32) {
        console.log("jump")
        if(!isJumping) {
            isJumping = true
            jump()
        }
    }
}

document.addEventListener('keypress', control)


function jump() {
    // let position = 0
    let count = 0
    let timerID = setInterval(function (){
        // move down
        if (count === 15) {
            clearInterval(timerID)
            let downTimerID = setInterval(function (){
                if (count === 0) {
                    clearInterval(downTimerID)
                    isJumping = false
                }
                position -= 4.8
                count --
                position = position*gravity
                dino.style.bottom = position + 'px'

            },20)

        }
        // move up
        count++
        position +=30
        position = position*gravity
        dino.style.bottom = position + 'px'
    }, 20)
}

function generateObstacle() {
    let randomTime = Math.random() * 4000

    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if (!isGameOver) obstacle.classList.add('obstacle') 
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'
    let timerID = setInterval(function (){
        if(obstaclePosition > 0 && obstaclePosition < 60 && position <60) {
            // console.log("foul")
            clearInterval(timerID)
            alert.innerHTML= 'GAME OVER'
            isGameOver = true

            // Remove all children
            while(grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }

            if(isGameOver) {
                const overPage = document.querySelector('.overPage')
                console.log('here')
                // overPage.classList.add('button')
                retryBtn = document.createElement('button')
                retryBtn.innerHTML = "Retry"
                retryBtn.onclick = function () {
                isGameOver = false;
                overPage.style.display = 'none';
                score = 0;
                alert.innerHTML = score

                // const dino = document.createElement('div')
                // dino.className = 'dino'
                grid.appendChild(dino)
                generateObstacle()}

                overPage.style.display = "block"
                overPage.innerHTML = "<h2>GAME OVER</h2>" + "Score: "  + score + "<h3>High Score: " + hiScore + "</h3>"
                overPage.appendChild(retryBtn)
            }
            
        }
        obstaclePosition -= 10
        obstacle.style.left = obstaclePosition + 'px'
        if(obstaclePosition ==0) {
            score++;
            if(score > hiScore) hiScore= score
            alert.innerHTML = score + " <br/> <br/>" + hiScore;}

    }, 20) 


    if(!isGameOver) setTimeout(generateObstacle, randomTime)
}
generateObstacle()



})