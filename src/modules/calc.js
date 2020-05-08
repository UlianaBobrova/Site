const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

const countSum = () => {
let total = 0,
countValue = 1,
dayValue = 1;
//находим выбранный нами селект,выводим нужную нам options через соответствующий индекс
const typeValue = calcType.options[calcType.selectedIndex].value,
     squareValue = +calcSquare.value;

//если количество помещений > 1, то получаем десятую долю         
    if(calcCount.value > 1) {
    countValue += (calcCount.value - 1) / 10;
    }

//срок исполнения. CalсDay вообще существует и <5 или <10
    if(calcDay.value && calcDay.value < 5) {
    dayValue *= 2;
    }else if(calcDay.value && calcDay.value < 10) {
    dayValue *= 1.5;
    }    
//пока пользователь не заполнит 2 первых поля, в total должен выводиться 0
    if(typeValue && squareValue) {
    total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
    } 

//вывод на страницу
    totalValue.textContent = total;
};
    
calcBlock.addEventListener('change', (event) => {
        const target = event.target;
//1-ый способ: ищем класс, на котором произошло событие, перечислив все 4 эл-та
        // if (target.matches('.calc-type') || target.matches('.calc-square') ||
        // target.matches('.calc-day') || target.matches('.calc-count')) {
        // }
//2-ой способ: сравниваем таргет с полученными элементами
        // if(target === calcType || target === calcSquare || target === calcDay ||
        //      target === calcCount) {
        //          console.log(1);
        //      }
//3-ий способ - проверяем на тег select и инпута
    if(target.matches('select') || target.matches('input')) {
            //функция,которая считает итоговую цену
        countSum();
        }

});
};


export default calc;