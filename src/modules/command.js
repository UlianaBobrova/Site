const command = () => {
    //const commandPeople = document.querySelector('#command');
    let photo = document.querySelectorAll('.command__photo');
    
    photo.forEach((elem) => elem.addEventListener('mouseenter', (event) => {
        event.target.dataset.currentImg = event.target.src;
        event.target.src = event.target.dataset.img;
        })
    );

    photo.forEach((elem) => elem.addEventListener('mouseleave', (event) => {
        event.target.src = event.target.dataset.currentImg ;
        })
    );

};


export default command;