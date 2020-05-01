
class Validator {
    //деструктуризируем объект и задаем параметры
    constructor({selector, pattern = {}, method}) {
        //свойства,передающиеся в нашем объекте
        //selector-это селекторы нашей формы
        //pattern-это кастомные шаблоны
        //method-настройки,указывающие на валидируемые поля и какие методы к ним применяем
        // this.selector = selector;
        //сразу в конструкторе булем получать элемент
        this.form = document.querySelector(selector);
        //если никаких данных нам не передаст пользователь,то в pattern будет сохранен пустой объект
        this.pattern = pattern; 
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        //создаем переменную для сохранения ошибок.Записывать будем поле ввода,где прозошла ошибка.Создаем коллекцию set.После нажатия submit,будем проверять эту коллекцию на наличие в ней данных
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        //убираем кнопки из валидации.Возвращаем только кнопки без тега button.Form elements это HTML коллекция элементов,метод filter к ней применить нельзя.Нам необходи массив-копируем элементы в новый массив и используем spread оператор для его создания.
        // const elemtsForm = [...this.form.elements].filter(item => {
        //     return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        // });
        //метод для установки паттернов 
        this.setPattern();
        //На каждый элемент вешаем функцию,которая делает проверку на валидацию
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        //если мы не проходим валидацию, submit не должен проходить
        this.form.addEventListener('submit', e => {
           // e.preventDefault();
           this.elementsForm.forEach(elem => this.checkIt(elem));
            if(this.error.size){
                e.preventDefault();
            }
        })
    }

    isValid(elem){
        //создаем объект с методами
        const validatorMethod = {
            notEmpty(elem) {
                if(elem.value.trim() === ''){
                    return false;
                }
               return true; 
            },
            //проверяет value нашего элемента и сравнивает его с pattern,т.е проходить test
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };

        //делаем проверку,что метод мы все-таки передаем
        if(this.method) {
            const method = this.method[elem.id];
        
 //определяем методы,которые передает нам пользователь.Чтобы обратиться к свойствам используем квадратные скобки.Elem-элемент,который мы передали.Получили массивы,которые содержат наши правила(из method в index.html
        // const method = this.method[elem.id];
//если method не равен underfind,то выполняем следующее
            if (method) {
          //при помощи св-ва every перебираем все наши свойства-массивы  
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]])); 
                //нам нужно взять сво-ва из validator method,not empty или pattern,зависит от св-в которые хочет применить пользователь.Чтобы получить это правило,необходимо обратиться к объекту валидатор и к его св-ву - not empty или pattern
         //получаем методы notEmpty и pattern.Для их вызова передаем элемент и 
                // console.log(validatorMethod[item[0]](elem, this.pattern[item[1]]));
            
            }   
        } else{
            console.warn('необходимо передать id полей ввода и методы проверки этих полей');
        }

        //по умолчанию передаем true
        return true;
    }

//запускать проверку на валидность.Если элемент проверку прошел, то вызываем showSuccess,если не прошел, то showError
    checkIt() {
       const target = event.target;
//проверяем контекст вызова
//console.log(this); это input.Поэтому в checkIt bind наш this
       if(this.isValid(target)){
           this.showSuccess(target);
           this.error.delete(target);
       }else {
           this.showError(target);
           this.error.add(target);
       }
    }

    //сообшает,если наш input не прошел валидацию
    showError(elem) {
   //если произошла ошибка,нам надо удалить класс success
        elem.classList.remove('success');
        elem.classList.add('error');
        //чтобы div с ошибкой не писался все снова и снова.Проверяем,если у элемента есть validator-error,то новый не создаем
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return;
        }
        //чтобы под инпутом с ошибкой появлялась ошибка
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        //добавляем стили ошибке
        errorDiv.classList.add('validator-error');
        //вставка элемента после заголовка
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    //когда валидация прошла успешно
    showSuccess(elem){
        //нужно удалить error, если пользователь сначала ошибся а потом исправился,то борта поля все равно останутся красными
        elem.classList.remove('error');
        elem.classList.add('success'); 
        //проверка у элемента справа есть валидатор error, мы наш элемент удалим
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        } 
    }

//метод стилей
    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green
        }
        input.error {
            border: 2px solid red
        }
        .validator-error {
            font-size: 14px;
            font-family: sans-serif;
            color: red
        }
        `;
        //вставлять этот элемент будем в head
        document.head.appendChild(style);
    }

    setPattern(){
        //чтобы принимать паттерн от пользователя.Если пользователь передал шаблон,используем его запись,а если нет - то нашу
        if(!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
//аналогичная запись этим if. Если ппаттерн существует, оставляем его,если нет,то присваиваем регулярное выражение
// this.pattern.phone = this.pattern.phone ? this.pattern.phone : /^\+?[78]([-()]*\d){10}$/;

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        //паттерны по умолчанию
        // this.pattern.phone = /^$/;
        // this.pattern.email = /^$/;

    }

}
