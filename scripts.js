let incomeArr = [];
let expenseArr = [];

//Functions

const getInputVal = (selector) => {
  let inputVal = $(selector).val();
  return inputVal;
};

const NewIncomeExpense = (name,amount) => {
   return { name, amount };
};

const renderCards = (arr, objectToPush, divToPrintTo, arrId) => {
  arr.push(objectToPush);
  let HTML = '';
  for (i = 0 ; i<arr.length; i++){
      let currentItem = arr[i];
      HTML += `
        <li class='card'>
          <h2>${currentItem.name}</h2>
          <h3>Amount: ${currentItem.amount}</h3>
          <button class="remove" data-index = "${i}" data-array="${arrId}">Remove</button>
        </li>`
      }
  $(divToPrintTo).html(HTML);
};

const updateDisplay = () => {
  let totalIncome = 0;
  let totalExpense = 0;

  for (i = 0 ; i<incomeArr.length; i++){
    let currentItem = incomeArr[i];
    totalIncome += Number(currentItem.amount);
  };
  for (i = 0 ; i<expenseArr.length; i++){
    let currentItem = expenseArr[i];
    totalExpense += Number(currentItem.amount);
  };

  let surplus = totalIncome - totalExpense;

  $('#totalIncome').html(`${totalIncome}.00`);
  $('#totalExpense').html(`${totalExpense}.00`);
  $('#totalSurplus').html(`${surplus}.00`);
}

//Print card/Store Data when forms are submitted.

$(document).on("submit", "#add", function(e){
  e.preventDefault();
  //Get values of each input and store in variable.
  let incomeName = getInputVal('#incomeName');
  let incomeAmount = getInputVal('#incomeAmount');
  console.log(incomeAmount, incomeName);
  //Push that input into an object, then into an array. Store the index.
  let currentObj = NewIncomeExpense(incomeName,incomeAmount);
  renderCards(incomeArr,currentObj,'#incomeList', "income");
  updateDisplay();
});

$(document).on("submit", "#subtract", function(e){
  e.preventDefault();
  //Get values of each input and store in variable.
  let expenseName = getInputVal('#expenseName');
  let expenseAmount = getInputVal('#expenseAmount');
  console.log(expenseAmount, expenseName);
  //Push that input into an object, then into an array. Store the index.
  let currentObj = NewIncomeExpense(expenseName,expenseAmount);
  renderCards(expenseArr,currentObj,'#expenseList', "expense");
  updateDisplay();
});

$(document).on("click",".remove",function(){
  let index = $(this).attr('data-index');
  let id = $(this).attr('data-array');
  console.log(id);
  if (id === "income") {
    incomeArr.splice(index,1);
    //Modularize later
    let HTML = '';
    for (i = 0 ; i<incomeArr.length; i++){
        let currentItem = incomeArr[i];
        HTML += `
          <li class='card'>
            <h2>${currentItem.name}</h2>
            <h3>Amount: ${currentItem.amount}</h3>
            <button class="remove" data-index = "${i}" data-array="income">Remove Book</button>
          </li>`
        }
    $('#incomeList').html(HTML);
  }
  else {
    expenseArr.splice(index,1);
    //Modularize
    let HTML = '';
    for (i = 0 ; i<expenseArr.length; i++){
        let currentItem = expenseArr[i];
        HTML += `
          <li class='card'>
            <h2>${currentItem.name}</h2>
            <h3>Amount: ${currentItem.amount}</h3>
            <button class="remove" data-index = "${i}" data-array="expense">Remove Book</button>
          </li>`
        }
    $('#expenseList').html(HTML);
  }
  updateDisplay();
});
