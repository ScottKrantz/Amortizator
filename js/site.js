function getValues() 
{
    document.getElementById("amortizationTable").classList.add("invisible");

    //Get the user values from the page.
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;
    
    //Parse for numbers.
    loanAmount = parseInt(loanAmount);
    term = parseInt(term);
    rate = parseInt(rate);

    let numbers = generateNumbers(loanAmount,term,rate);

    displayNumbers(numbers);

}

//Create the Amortization Table data.
function generateNumbers(loanAmount,term,rate){

    let numbers = [];

    for (let index = 1; index <= term; index++) {
        let payment = Number((loanAmount*(rate/1200)/(1-(1+rate/1200)**(-term))).toFixed(2));
        let interest = Number((loanAmount * rate/1200).toFixed(2));
        let principalPayment = Number((payment - interest).toFixed(2));
        let remainingBalance = Number((loanAmount - principalPayment).toFixed(2));
        let interestTotal = Number(0);
        interestTotal += interest[index];

        numbers.push(`<tr><td>${index}</td><td>${payment}</td><td>${principalPayment}</td><td>${interest}</td><td>${interestTotal}</td><td>${remainingBalance}</td></tr>`);
    }

    return numbers;

}


//Display the Amortization Table data.
function displayNumbers(numbers){

    let templateRows = "";

    templateRows = numbers;

    document.getElementById("amortizationTable").classList.remove("invisible");

    document.getElementById("results").innerHTML = templateRows

}