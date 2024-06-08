import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import imageUrl from '../img/bi_check2-circle.svg';
import imageUrl1 from '../img/bi_x-octagon.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value; 
    
    function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
    };

  createPromise(delay, state)
    .then(delay => {
        iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
            backgroundColor: '#59a10d',
            messageColor: '#ffffff',
            messageSize: '16',
            imageWidth: 383,
            close: true,
            closeOnEscape: true,
            closeOnClick: true,
            progressBar: true,
            progressBarColor: '#b51b1b',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
            position: 'topRight',
            iconUrl: imageUrl,
            iconColor: '#FFFFFF',
        });
    })
    .catch(delay => {
        iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${delay}ms`,
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
            messageSize: '16',
            imageWidth: 383,
            close: true,
            closeOnEscape: true,
            closeOnClick: true,
            progressBar: true,
            progressBarColor: '#b51b1b',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
            position: 'topRight',
            iconUrl: imageUrl1,         
            iconColor: '#FFFFFF',
        });
    });
});
