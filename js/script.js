// User Name;
const userName = document.querySelector('input[type="text"]');
userName.focus();
// User Email and credit card element
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');

// Uset job Selection Element
const jobRole = document.querySelector('select');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = "none";

// T-Shirt color and design selection Element
const color = document.querySelector('#color');
const colorOption = color.children;
color.setAttribute('disabled', '');
const design = document.querySelector('#design');

// Activities Registration Element
const registerActivities = document.querySelector('#activities');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

// payment method element 
const paymentOption = document.querySelector('#payment');
const paymentChildren = paymentOption.children[1];
paymentChildren.setAttribute('selected', '');

const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal')
payPal.hidden = true;
const bitCoin = document.querySelector('#bitcoin');
bitCoin.hidden = true;

// function for user job role selection
function jobRoleSelection(e){
    const value = e.target.value;
    value === 'other'? otherJobRole.style.display = "": otherJobRole.style.display = "none";
    
}

// function for T-shirt and color selection;
function shirtDesign(e){
  color.removeAttribute('disabled');
  for(let i = 0; i < colorOption.length; i++){
      const currentColor = colorOption[i];
      const currentTheme = currentColor.dataset.theme;
      const designValue = e.target.value;
      if(designValue === currentTheme){
          currentColor.hidden = false;
          currentColor.setAttribute('selected', '');
      }else{
          currentColor.hidden = true;
          currentColor.removeAttribute('selected');  
      }
  }

}

// function for activites registration and payment update;

function paymentActivites(e){
    const target = e.target
    const payment = document.querySelector('#activities-cost');
    let total = 0;
    
     for(let i = 0; i < checkBoxes.length; i++){
         const currentCheckbox = checkBoxes[i].dataset.dayAndTime;
         const justClicked = target.dataset.dayAndTime;
         if(currentCheckbox === justClicked && target !== checkBoxes[i]){
             checkBoxes[i].disabled = true; 
         }else{
             checkBoxes[i].disabled = false;
         }

         let dataCost = checkBoxes[i].getAttribute('data-cost');
         dataCost = parseInt(dataCost); 
         checkBoxes[i].checked? total += dataCost: total - dataCost;  
     }
      payment.textContent = `Total: $${total}`;
     return total;
}


// function for payment method options
function paymentMethodOption(e){
    paymentChildren.removeAttribute('selected');
    const paymentMethod = e.target.value;
    if(paymentMethod === payPal.id){
        payPal.hidden = false; 
        creditCard.hidden = true;
    }else{
        payPal.hidden = true;
    }
    if(paymentMethod === bitCoin.id){
        bitCoin.hidden = false;
        creditCard.hidden = true;
    }else{
        bitCoin.hidden = true;
    }
    if(paymentMethod === creditCard.id){
        creditCard.hidden = false;
    }        
    
}
// function for name value validation;
function nameValidation(name){    
    const regex = /^[a-z0-9]{2,20} ?$|[a-z0-9]\s[a-z]{1,20}$/ig.test(name.value);
    return regex;
}

// function for user Email validation;
function userEmailValidation(email){
    const regex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    return regex;
}

// function for credit card validtion;
function userCardValidation(card){
    let cardValue = card.value;
    cardValue = parseInt(cardValue);
    const regex = /^\d{13,16}$/.test(cardValue);
    return regex;
}

// function for user zip code validation;
function zipCodeValidation(zip){
    let zipValue = zip.value;
    zipValue = parseInt(zipValue);
    const regex = /^\d{5}$/.test(zipValue);
    return regex;
}

// credit card cvv validation;
function cvvCardValidation(cvv){
    let card = cvv.value;
     card = parseInt(card);
     const regex = /^\d{3}$/.test(card);
     return regex;   
}

// function for activities register validation;
function activitiesValid(){
    const activites = document.querySelector('#activities');
    const label = activites.firstElementChild;
    label.classList.add('not-valid');
    const checked = Array.from(checkBoxes).filter(e => e.checked);
    if(checked.length > 0){  
        label.classList.remove('not-valid');
        return true;
    } 
    
}

// function for error message display;
function addErrorMessage(e){
    const label = e.parentElement;
    const span = e.nextElementSibling;
    label.classList.add('not-valid');
    span.classList.remove('hint');
}

// Remove error messesge;
function removeError(e){
    const label = e.parentElement;
    const span = e.nextElementSibling;
    label.classList.remove('not-valid');
    span.classList.add('hint');
}

// function for name message for name field;
function nameError(){
    const nameValue = userName.value;
    if(nameValue === '' || nameValue === null){
        addErrorMessage(userName);
    }else{
        removeError(userName);
    }
}

// condational error message for email field;
function emailError(){
    const emailValue = email.value;
    let span = email.nextElementSibling;
    const label = email.parentElement
    label.classList.add('not-valid');
    span.classList.remove('hint');
    if(emailValue === '' || emailValue === null){
        span.textContent = 'Email field cannot be blank';
    }else if(!userEmailValidation(email)){
        span.textContent = 'Email address must be formatted correctly';
    }else{
        removeError(email);
    }
}

form.addEventListener('keyup', (e) => {
    if(e.target.id === 'name'){
        nameError();
    }
    if(e.target.id === 'email'){
        emailError();
    }
})

// function to verify all feild;
function eventValidation(e){
    
    if(!nameValidation(userName)){
        addErrorMessage(userName);
        e.preventDefault();
    }
    if(!userEmailValidation(email)){
        addErrorMessage(email);
        e.preventDefault();
    }

    if(!activitiesValid()){
        e.preventDefault();
     }
     if(creditCard.hidden === false){
         if(!userCardValidation(cardNumber)){
             addErrorMessage(cardNumber);
             e.preventDefault();
         }
         if(!zipCodeValidation(zipCode)){
             addErrorMessage(zipCode);
             e.preventDefault();
         }
         if(!cvvCardValidation(cvv)){
             addErrorMessage(cvv);
             e.preventDefault();
         }
     }
    

}

// adding toggling focus event;
for(let i = 0; i < checkBoxes.length; i++){
    const box = checkBoxes[i];
    box.addEventListener('focus', e => {
        box.parentElement.classList.add('focus');
    })
    box.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if(active){
            active.classList.remove('focus');

        }
    })
}

form.addEventListener('submit', eventValidation);

jobRole.addEventListener('change', jobRoleSelection);

design.addEventListener('change', shirtDesign);

registerActivities.addEventListener('change', paymentActivites);

paymentOption.addEventListener('change', paymentMethodOption)







