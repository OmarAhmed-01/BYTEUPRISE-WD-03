const display = document.getElementById("display");
const buttonImg = document.getElementById("buttonImg");
const lapContainer = document.getElementById("lapsContainer");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];
let overallTime = 0;

function toggle(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        buttonImg.src = "./assets/pause.png"
    }
    else{
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        buttonImg.src = "./assets/play.png"
    }
}
function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00";
    buttonImg.src = "./assets/play.png";
}
function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliseconds = String(milliseconds).padStart(2,"0");

    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}
function lap(){
    if(isRunning){
        const lapTime = elapsedTime;
        const lapOverallTime = overallTime + lapTime;
        laps.push(lapTime);
        overallTime = lapOverallTime;

        let lapMinutes = Math.floor(lapTime / (1000 * 60) % 60);
        let lapSeconds = Math.floor(lapTime / 1000 % 60);
        let lapMilliseconds = Math.floor(lapTime % 1000 / 10);

        lapMinutes = String(lapMinutes).padStart(2, "0");
        lapSeconds = String(lapSeconds).padStart(2, "0");
        lapMilliseconds = String(lapMilliseconds).padStart(2, "0");

        let overallMinutes = Math.floor(overallTime / (1000 * 60) % 60);
        let overallSeconds = Math.floor(overallTime / 1000 % 60);
        let overallMilliseconds = Math.floor(overallTime % 1000 / 10);

        overallMinutes = String(overallMinutes).padStart(2, "0");
        overallSeconds = String(overallSeconds).padStart(2, "0");
        overallMilliseconds = String(overallMilliseconds).padStart(2, "0");

        const lapElement = document.createElement("div");
        lapElement.classList.add("laps-order");
        lapElement.innerHTML = `
            <p>${String(laps.length).padStart(2, "0")}</p>
            <p>${lapMinutes}:${lapSeconds}:${lapMilliseconds}</p>
            <p>${overallMinutes}:${overallSeconds}:${overallMilliseconds}</p>
        `;
        lapContainer.appendChild(lapElement);
    }
}