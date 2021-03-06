import drinksData from '../assets/data/drinks.json';
import images from '../assets/img/drinks/*.jpg';
import { addCounter, addCheckOut } from './utils';
import toastr from 'toastr';

const drinksContainer = document.querySelector('.drinks');

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: 'toast-bottom-full-width',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '2000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

addDrinks();

function addDrinks() {
  let output = '';
  drinksData.forEach((drink) => {
    output += `
        <div class="drinks__box" id="${drink.id}">
        <img
          src="${images[drink.image]}"
          alt="Dessert Image"
          class="drinks__img"
        />
        <h4 class="drinks__name">${drink.name}</h4>
        <p class="drinks__description">
          ${drink.description}
        </p>
        <div class="drinks__row">
          <span class="drinks__price">$${drink.price}</span>
          <span class="drinks__cart"><i class="fas fa-cart-plus"></i></span>
        </div>
      </div>`;
  });

  drinksContainer.innerHTML = output;
}

const drinksCarts = document.querySelectorAll('.drinks__cart');

//Add event listeners
drinksCarts.forEach((cart) => {
  cart.addEventListener('click', () => {
    let item = drinksData.filter(
      (drink) => drink.id === cart.parentElement.parentElement.id
    );
    addCheckOut(item[0]);
    addCounter();
    toastr.success('Check your cart.', 'Product added');
  });
});
