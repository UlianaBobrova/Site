'use strict';
import '@babel/polyfill';
import 'es6-promise';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'matches';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import command from './modules/command';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
 
//Таймер
countTimer('21 may 2020');

//Меню
toggleMenu();

//popup
togglePopUp();

//Табы
tabs();

//Пишем слайдер
slider();

//Блок Наша команда
command();

//Калькулятор
//при вызове калькулятора передаем ему цену price
calc(100);
  
//send-ajax-form
sendForm();