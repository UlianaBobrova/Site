
window.addEventListener('DOMContentLoaded', function(){
'use strict';
 
//Таймер
function countTimer(deadLine) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');


    function getTimeRemaining() {

      let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
 //разница между этими датами. Получаем секунды из млсек
        timeRemaining = (dateStop - dateNow) / 1000,

 //Вычисляем часы, минуты и сек до deadLine
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        
        return {timeRemaining, seconds, minutes, hours};
    }

    function updateClock() {

        let timer = getTimeRemaining();
        let timeInterval = setInterval(updateClock, 1000);

        timerHours.textContent = timer.hours;
        timerHours.innerHTML = ('0' + timer.hours).slice(-2);
        timerMinutes.textContent = timer.minutes;
        timerMinutes.innerHTML = ('0' + timer.minutes).slice(-2);
        timerSeconds.textContent = timer.seconds;
        timerSeconds.innerHTML = ('0' + timer.seconds).slice(-2);  
   
        if (timer.timeRemaining <= 0) {
            clearInterval(timeInterval);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }    
    }

updateClock();

}

countTimer('22 april 2020');

});