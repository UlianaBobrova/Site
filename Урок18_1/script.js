'use strict'; 

let date = new Date();
let clock = date.getHours();

switch (true) {
    case (clock >= 4) && (clock < 12): 
    console.log('Доброе утро!');
    break;
    case (clock >= 12) && (clock < 17):
    console.log('Добрый день!');
    break;
    case (clock >= 17) && (clock < 23):
    console.log('Добрый вечер!');
    break;
    case (clock >= 23) && (clock < 4):
    console.log('Доброй ночи!');
    break;
}

let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let oneDay = date.getDay();
console.log('Сегодня: ' + days[oneDay]); 
console.log('Текущее время: ' + date.toLocaleTimeString('ru'));

let dayNewYear = new Date('December 31 2020').getTime();
let timeD = (dayNewYear - date) / 1000; //перевожу мсек в сек
let day = Math.floor(timeD / 60 / 60 / 24); //вычисляю кол-во дней
console.log('До нового года осталось: ' + day + ' дней');

