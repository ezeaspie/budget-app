var incomeArr = JSON.parse(localStorage.getItem("incomeArr") || '[]');
var expenseArr = JSON.parse(localStorage.getItem("expenseArr") || '[]');

//Intitialize
const paintCards = (array, dataName, whereToRender) => {
  let HTML = '';
  for (i = 0 ; i<array.length; i++){
      let currentItem = array[i];
      HTML += `
        <li class='card'>
          <h2>${currentItem.name}</h2>
          <h3>Amount: ${currentItem.amount}</h3>
          <button class="remove" data-index = "${i}" data-array="${dataName}">Remove</button>
        </li>`
      }
  $(whereToRender).html(HTML);
}

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
  $('#bar').attr("value", surplus);
  $('#bar').attr("max", totalIncome);
}

$('#incomeError').hide();
$('#expenseError').hide();

paintCards(incomeArr, 'income', '#incomeList');

paintCards(expenseArr, 'expense', '#expenseList');

updateDisplay();
//Functions

const getInputVal = (selector) => {
  let inputVal = $(selector).val();
  return inputVal;
};

const clearInputVal = (selector) => {
  $(selector).val('');
}

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

//Print card/Store Data when forms are submitted.

$(document).on("submit", "#add", function(e){
  e.preventDefault();
  //Get values of each input and store in variable.
  let incomeName = getInputVal('#incomeName');
  let incomeAmount = Number(getInputVal('#incomeAmount'));
  if (incomeAmount < 0 || incomeName === ''){
    $('#incomeError').show();
  }
  else {
    //Push that input into an object, then into an array. Store the index.
    $('#incomeError').hide();
    let currentObj = NewIncomeExpense(incomeName,incomeAmount);
    renderCards(incomeArr,currentObj,'#incomeList', "income");
    localStorage.setItem("incomeArr", JSON.stringify(incomeArr));
    clearInputVal('#incomeName, #incomeAmount');
    updateDisplay();
  }
});

$(document).on("submit", "#subtract", function(e){
  e.preventDefault();
  //Get values of each input and store in variable.
  let expenseName = getInputVal('#expenseName');
  let expenseAmount = Number(getInputVal('#expenseAmount'));
  if (expenseAmount < 0 || expenseName === ''){
    $('#expenseError').show();
  }
  else {
    //Push that input into an object, then into an array. Store the index.
    $('#expenseError').hide();
    let currentObj = NewIncomeExpense(expenseName,expenseAmount);
    renderCards(expenseArr,currentObj,'#expenseList', "expense");
    localStorage.setItem("expenseArr", JSON.stringify(expenseArr));
    clearInputVal('#expenseName, #expenseAmount');
    updateDisplay();
  }
});

$(document).on("click",".remove",function(){
  let index = $(this).attr('data-index');
  let id = $(this).attr('data-array');
  console.log(id);
  if (id === "income") {
    incomeArr.splice(index,1);
    paintCards(incomeArr, 'income', '#incomeList');
  }
  else {
    expenseArr.splice(index,1);
    paintCards(expenseArr, 'expense', '#expenseList');
  }
  localStorage.setItem("incomeArr", JSON.stringify(incomeArr));
  localStorage.setItem("expenseArr", JSON.stringify(expenseArr));
  updateDisplay();
});
