const sendForm = () => {
    //переменные с сообщениями,которые мы будем передавать пользователю
            const errorMessage = 'Что-то пошло не так...',
                loadMessage = 'Загрузка...',
                successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
               
            //const form = document.getElementById('form1');
            const forms = document.querySelectorAll('form');
            const inputEmail = document.querySelectorAll('.form-email');
            const inputTel = document.querySelectorAll('.form-phone');
            const inputName = document.querySelectorAll('.form-name');
            const inputMessage = document.querySelector('.mess');
         
            // const loadMessage1 = document.querySelector('#fountainG');
            // loadMessage1.style.display = 'none';
            //создаем элемент для прелоадера
            // const preload1 = document.createElement('div');
            // preload1.classList.add('#fountainG_1');
    
            //очистка input-ов
        const clearInput = () => {
            document.querySelectorAll('input').forEach((item) => {
                item.value = ''; 
            });
        };
    
            inputEmail.forEach((elem) => elem.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/[^a-z\.\-\+\@\_0-9]/gi, '');
                })
            );
    
            inputTel.forEach((elem) => elem.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/[^0-9+]/gi, '');
                })
            );
    
            inputName.forEach((elem) => elem.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
                })         
            );
    
            inputMessage.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
            });
    
    //div для хранения сообщений для пользователя
            const statusMessage = document.createElement('div');
            statusMessage.style.cssText = 'font-size: 2rem;';
    
            const preloadTotal = document.createElement('div');
            preloadTotal.id = 'fountainG';
            const preload1 = document.createElement('div');
            preload1.id = 'fountainG_1';
            preload1.classList.add('fountainG');
            preloadTotal.appendChild(preload1);
            const preload2 = document.createElement('div');
            preload2.id = 'fountainG_2';
            preload2.classList.add('fountainG');    
            preloadTotal.appendChild(preload2);
            const preload3 = document.createElement('div');
            preload3.id = 'fountainG_3';
            preload3.classList.add('fountainG');
            preloadTotal.appendChild(preload3);
            
    //вешаем на форму обработчик события,срабатывает submit
            forms.forEach((elem) => elem.addEventListener('submit', (event) => {
                //отменяем стандартное поведение,чтобы страница не перезагружалась после кнопки submit
                event.preventDefault();
                elem.appendChild(statusMessage);
                elem.appendChild(preloadTotal);
                //когда состояние readyState поменялось с 0 появилось сообщение Загрузка...
                //statusMessage.textContent = loadMessage;
                
                preloadTotal.style.display = 'block';
    
                const formData = new FormData(elem);
                //Если серверу надо передать в JSON-формате,извлекаем данные из formData,переберем данные с цикле for of
                let body = {};
                //с помощью метода .entries вытащим значения из formData.Получаем массив
                for(let val of formData.entries()) {
                //Добавляем полученные данные в body. Значения с ключом.Получаем объект
                    body[val[0]] = val[1];                   
                }
                // //делаем тоже самое с циклом forEach
                // formData.forEach((val, key) => {
                //     body[key] = val;
                // });  
                //в postData передаем body, callback-фун-ию(outputData-оповещение пользователя) 
                postData(body)
                
                        .then((response) => {
                            if(response.status !== 200) {
                                throw new Error('Status network not 200');
                            }
                            statusMessage.style.color = 'white';
                            preloadTotal.style.display = 'none';
                            statusMessage.textContent = successMessage;
                            setTimeout(() => {statusMessage.textContent = ''}, 5000);
                        })
                        .catch((error) => {
                            statusMessage.style.color = 'white';
                            preloadTotal.style.display = 'none';
                            statusMessage.textContent = errorMessage;
                            setTimeout(() => {statusMessage.textContent = ''}, 2000);
                            console.error(error);
                        });
                //     () => { 
                //     statusMessage.style.color = 'white';
                //     statusMessage.textContent = successMessage;
                //     }, 
                //     (error) => {
                //     statusMessage.style.color = 'white';
                //     statusMessage.textContent = errorMessage;
                //     console.error(error);
                //     }
                // );
                clearInput();
                })
            );
            
            //функция обращения к серверу
            const postData = (body) => {
                return fetch('./server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });   
            };
        //         return new Promise((resolve, reject) => {
        //         const request = new XMLHttpRequest();
        //         //readeyStateChange отслеживать после XMLHttpRequest,чтобы отслеживать процесс. Это событие возникает,когда меняется состояние readyState
        //         request.addEventListener('readystatechange', () =>{     
        //             if(request.readyState !== 4) {
        //                 return;
        //             }
        //             if(request.status === 200) {
        //                 resolve(request.status);
        //                 //outputData();   
        //             } else {
        //                 reject(request.statusText);
        //                 //errorData(request.status);
        //             }
        //         });
    
        //         //метод POST для отправки данных на сервер.URL-пишем путь до файла server.php 
        //         request.open('POST', './server.php');
        //         //настройка заголовков.Второй параметр-значение,надо указать,что мы данные отправляем с формы
        //         // request.setRequestHeader('Content-type', 'multipart/form-data');
        //         request.setRequestHeader('Content-type', 'application/json');
        //         //перед отправкой, надо данные получить при помощи javaScript.Это удобнее сделать через объект FormData,считывает все данные из формы,input,все,что содержится в форме и имеет формат name
              
        //         //открываем соединение и отправляем данные с помошью метода send
        //         // request.send(formData);
    
        //         //вместо formData будем отправлять body в формате JSON
        //         request.send(JSON.stringify(body));
        //         });
    
        //     };
    };

    export default sendForm;