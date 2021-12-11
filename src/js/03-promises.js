import Notiflix from 'notiflix';
//get form element
const form = document.querySelector('.form');
//an object for storing form input values
const userInput = {};
//variable for storing promise number
let promiseCounter = 0;
//add event listeners to form element
form.addEventListener('input', handleUserInput);
form.addEventListener('submit', handleFormSubmit);
//get user input values and store them in userInput object
function handleUserInput(e) {
  userInput[e.target.name] = Number(e.target.value);
}
//handle form submit
function handleFormSubmit(e) {
  e.preventDefault();
  let step = userInput.delay;
  //create promises according to amount value
  for (let i = 0; i < userInput.amount; i += 1) {
    promiseCounter += 1;
    createPromise(promiseCounter, step).then(onSuccess).catch(onError);
    step += userInput.step;
  }
}
//callback function if promise fulfilled
function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
//callback function if promise rejected
function onError({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
//create promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
