function getValues() 
{
    //Ensure the Amortization Table is hidden.
    document.getElementById("results").classList.add("invisible");

    //Get the user values from the page.
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;
    
    //Parse for numbers.
    loanAmount = parseFloat(loanAmount);
    term = parseFloat(term);
    rate = parseFloat(rate);

    let numbers = generateNumbers(loanAmount, term, rate);

    displayNumbers(numbers);

}

//Create the Amortization Table data.
function generateNumbers(loanAmount, term, rate){

    let numbers = [];

    //Calculate the amounts.
    let payment = loanAmount * (rate / 1200)/(1 - (1 + rate / 1200)**(-term));
    let interest = loanAmount * rate / 1200;
    let principalPayment = payment - interest;
    let remainingBalance = loanAmount;
    let interestTotal = 0;

    let options = { style: 'currency', currency: 'USD' };

    //Create the table and fill in the data.
    for (let index = 1; index <= term; index++) {
        interest = remainingBalance * rate / 1200;
        principalPayment = payment - interest;
        interestTotal += interest;
        remainingBalance -= principalPayment;

        numbers += (`<tr><td>${index}</td><td>${Intl.NumberFormat('en-US', options).format(payment)}</td>
            <td>${Intl.NumberFormat('en-US', options).format(principalPayment)}</td>
            <td>${Intl.NumberFormat('en-US', options).format(interest)}</td>
            <td>${Intl.NumberFormat('en-US', options).format(interestTotal)}</td>
            <td>${Intl.NumberFormat('en-US', options).format(Math.abs(remainingBalance))}</td></tr>`);
        
    }

    let returnObj = {numbers, payment, loanAmount, interestTotal};

    return returnObj;

}

//Display the Amortization Table data.
function displayNumbers(returnObj){

    let options = { style: 'currency', currency: 'USD' };

    document.getElementById("results").classList.remove("invisible");
    document.getElementById("results").innerHTML = returnObj.numbers
    document.getElementById("monthlyPayment").innerHTML = new Intl.NumberFormat('en-US', options).format(returnObj.payment);
    document.getElementById("totalPrincipal").innerHTML = new Intl.NumberFormat('en-US', options).format(returnObj.loanAmount);
    document.getElementById("totalInterest").innerHTML = new Intl.NumberFormat('en-US', options).format(returnObj.interestTotal);
    document.getElementById("totalCost").innerHTML = new Intl.NumberFormat('en-US', options).format(returnObj.loanAmount + returnObj.interestTotal);

}