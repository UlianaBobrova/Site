const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
    btn = document.querySelectorAll('portfolio-btn');
    const portfolio = document.querySelector('.portfolio');
    let dotClass = portfolio.querySelector('.portfolio-dots');
    const slider = document.querySelector('.portfolio-content');
    let dot = dotClass.querySelectorAll('ul > li');
    
    //номер активного слайда
    let currentSlide = 0;
    //переменная для stopSlide
    let interval;
    
    //выносим удаление класса в отдельную функцию.Принимает 3 аргумента-элемент,индекс,класс,кот.хотим добавить\удалить
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

// addDots(); 
    const addDots = () => {

        for (let i = 0; i < slide.length; i++) {

        dot = document.createElement('li');
        dot.classList.add('dot');
        dotClass.append(dot);
      
        dot = portfolio.querySelectorAll('.dot');
        dot[currentSlide].classList.add('dot-active');
        }        
    }; 

    addDots(); 

//функция для автоматического перелистывания слайдов
    const autoPlaySlide = () => {
        //у текущего слайда убираем класс active, добавляем его следующему
        //slide[currentSlide].classList.remove('portfolio-item-active');
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        //ограничиваем кол-во слайдов. Последнему текущему примваиваем самый первый слайд
        if (currentSlide >= slide.length){
            currentSlide = 0;
        }
        // slide[currentSlide].classList.add('portfolio-item-active');
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    //для запуска слайда. Можем принимать скорость переключения слайдов.Задаем параметр по умолчанию 3сек
    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    //для остановки слайда.При наведении на стрелочки и на точки останавливать слайдер
    const stopSlide = () => {
        clearInterval(interval);
    };

//Делаем логику между переключением слайдов по стрелкам и точкам
    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

    //при клике на сам слайд вызывается класс.Ограничиваем вход условием, не выполняется дальнейшее, если кликаем НЕ на эти элементы
            if(!target.matches('#arrow-right, #arrow-left, .dot')) {
            return;
            }
//убираем активные классы у слайда
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

//если цель события была кнопка next,тогда мы прибавляем к current slide 1
            if(target.matches('#arrow-right')) {
        currentSlide++;
            }else if(target.matches('#arrow-left')){
        currentSlide--;
                } else if(target.matches('.dot')){
                    dot.forEach((elem, index) => {
                        if(elem === target){
                        currentSlide = index;
                        }
                    });
                }
    //для переключения слайдов по кругу
        if(currentSlide >= slide.length){
        currentSlide = 0;
        }
        if(currentSlide < 0) {
        currentSlide = slide.length -1;
        }
    //добавляем активные классы у слайда
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

    });

//Обработчики событий(замирание слайда) при наведении мышки на стрелки и точки и увод мышки
    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        startSlide();
        }
    });

   startSlide(1500);
};


export default slider;