const form = document.querySelector('.form');

const userInput = {};
let promiseCounter = 0;
form.addEventListener('input', handleUserInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  console.log(userInput.delay);
  console.log(userInput.step);
  console.log(`Promise will be called ${userInput.amount} times`);
  createPromise(2, 1500)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function handleUserInput(e) {
  userInput[e.target.name] = e.target.value;
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    position = promiseCounter + 1;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
