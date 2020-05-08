const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

//функция меняющая контент, перебирает все табы,показывает выбранный, передаем в нее индекс нашего таба
const toggleTabContent = (index) => {
    for(let i = 0; i < tabContent.length; i++) {
//полученный индекс сравниваем с индексом tab
        if(index === i) {
            //таб с таким индексом будет показываться на странице
            tab[i].classList.add('active');
            tabContent[i].classList.remove('d-none');
        } else {
            tab[i].classList.remove('active');
            tabContent[i].classList.add('d-none');
        }
    }
};

//второй вариант этой функции 20 урок 18 минута. С методом closest()
    tabHeader.addEventListener('click', (event) => {
        let target = event.target;

            while(target !== tabHeader) {
                //проверяем, что кликнули именно по tab
                if (target.classList.contains('service-header-tab')) {
            //проверяем на какой tab мы кликнули
                tab.forEach((item, i) => {
                //если элемент соответствует нашему target
                    if(item === target) {
                    toggleTabContent(i);
                    }
                });
                return;
            }
//в while проверили,что target не является tabHeader,зашли в цикл,если target не с классом service-header-tab,даем target класс родителя
                target = target.parentNode;
            }
    });

};


export default tabs;