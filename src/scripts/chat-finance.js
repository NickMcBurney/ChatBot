// all personal loans available
var loansAvailable = [{
    loanAmount: 2000,
    loanTerm: [24,30,36],
    apr: 34.9
}, {
    loanAmount: 2500,
    loanTerm: [24,30,36],
    apr: 34.9
}, {
    loanAmount: 3000,
    loanTerm: [24,30,36],
    apr: 39.9
}, {
    loanAmount: 3500,
    loanTerm: [24,30,36,42],
    apr: 44.9
}, {
    loanAmount: 4000,
    loanTerm: [24,30,36,42,48],
    apr: 44.9
}, {
    loanAmount: 4500,
    loanTerm: [24,30,36,42,48],
    apr: 44.9
}, {
    loanAmount: 5000,
    loanTerm: [24,30,36,42,48],
    apr: 44.9
}];

// object used to return loan
var foundLoan = {
    loanAmount: 0,
    loanTerm: 0,
    apr: 0,
    monthly: 0
}



// FUNCTION: find best loan for user based on current debt and monthly payments
function findLoan(loanAmount, monthlyPayments, loanTerm){
    var maxMonthly = monthlyPayments

    if(loanAmount < 1500) {
        return "false"
    } else if(loanAmount == 2000) {
        consolidateLoanPL(monthlyPayments, 0, maxMonthly)
    } else if(loanAmount <= 2500){
        consolidateLoanPL(monthlyPayments, 1, maxMonthly)
    } else if(loanAmount <= 3000){
        consolidateLoanPL(monthlyPayments, 2, maxMonthly)
    } else if(loanAmount <= 3500){
        consolidateLoanPL(monthlyPayments, 3, maxMonthly)
    } else if(loanAmount <= 4000){
        consolidateLoanPL(monthlyPayments, 4, maxMonthly)
    } else if(loanAmount <= 4500){
        consolidateLoanPL(monthlyPayments, 5, maxMonthly)
    } else if(loanAmount <= 5000){
        consolidateLoanPL(monthlyPayments, 6, maxMonthly)
    } else if(loanAmount >= 10000 && loanAmount <= 250000){
        consolidateLoanHOL(monthlyPayments, loanTerm, loanAmount, maxMonthly)
    }
}


// FUNCTION: find out which loan term is suitable from similar loan amount based on current payments
function consolidateLoanPL(monthlyPayments, appropriateLoan, maxMonthly) {
    var $creditBalance = loansAvailable[appropriateLoan].loanAmount,
        $repaymentLength = loansAvailable[appropriateLoan].loanTerm,
        $interestRate = loansAvailable[appropriateLoan].apr;

    var loanTerm = $repaymentLength[$repaymentLength.length - 1],
        monthlyRate = calculateMonthly($creditBalance,loanTerm,$interestRate);

    // get personal loan with lowest monthly payments
    if(monthlyRate < monthlyPayments && monthlyRate <= maxMonthly) {			
        foundLoan = {
            loanAmount: loansAvailable[appropriateLoan].loanAmount,
            loanTerm: loanTerm,
            apr: loansAvailable[appropriateLoan].apr,
            monthly: monthlyRate
        }
        console.log(foundLoan)    
        return foundLoan
    }
}


// FUNCTION: homeowner loan loan finder
function consolidateLoanHOL(monthlyPayments,loanTerm, loanAmount, maxMonthly) {
    loanTerm = loanTerm || 36
    var minTerm = (Math.ceil(loanTerm/12)*12);
    if(minTerm > 360) {
        minTerm = 360
    }
    var term2 = (Math.ceil(loanTerm/12)*12) + 24;
    if(term2 > 360){
        term2 = 360;
    }

    console.log(minTerm + " " + term2)
    // array to contain loan amounts
    var $suggestedLoanTerm = minTerm
    
    // round loan amount up to nearest 1000
    var $suggestedLoanAmount = (Math.ceil(loanAmount/1000)*1000)
    
    // find APR
    var $APR = calculateApr($suggestedLoanAmount)
    console.log("apr: " + $APR)
    
    
    // calculate monthly rate
    var monthlyRate = calculateMonthly($suggestedLoanAmount,$suggestedLoanTerm,$APR)
    
    console.log("monthly: " + monthlyRate)

    // only show loans with lower monthly payments
    if(monthlyRate < monthlyPayments && monthlyRate <= maxMonthly) {			
        // add available loan
        foundLoan = {
            loanAmount: $suggestedLoanAmount,
            loanTerm: $suggestedLoanTerm,
            apr: $APR,
            monthly: monthlyRate
        }
        console.log(foundLoan)
        return foundLoan
    }			
}


// FUNCTION: calculate monthly payments
function calculateMonthly($balance,$term,$apr){
	var aprmonthly = 100 * (Math.pow((1 + $apr / 100), 1 / 12) - 1);
	aprmonthly = aprmonthly.toFixed(4)

	var actualcalc = aprmonthly * 12

	var n = $term - (2 * $term)
	var R = actualcalc / 1200
	var Pv = $balance
	var Left = Pv * R
	var Right = 1 - Math.pow((1 + R), n)
	var MonthlyPayment = (Left / Right)

	return MonthlyPayment		
}


// FUNCTION: calculate term function
function termCalculate(debt,apr,monthly) {
    
    var $interestRate = unformat(apr),
    $creditBalance = unformat(debt),
    $monthlyRepayment = unformat(monthly),
    nnn=(Math.log($monthlyRepayment)-Math.log($monthlyRepayment-($creditBalance*$interestRate)/1200))/Math.log(1+($interestRate/1200));

    var term = Math.ceil(10*nnn)/10,
            term = Math.round(term);
    
    var years = term / 12; // 1
    years = Math.floor(years);
    var remainingMonths = term % 12;
    
    if( isFinite(remainingMonths) ) {
        console.log(term)
        console.log(remainingMonths)
        return term
    }	
}

// FUNCTION: calculate apr
function calculateApr(loanAmount){
    var apr;
    if (loanAmount >= 1000 && loanAmount <= 3900) {
        apr = 44.9;
    } else if (loanAmount >= 4000 && loanAmount <= 5000) {
        apr = 79.9;
    } else if (loanAmount >= 10000 && loanAmount <= 25000) {
        apr = 5.9;
    } else if (loanAmount > 25000 && loanAmount <= 45000) {
        apr = 6.4;
    } else if (loanAmount > 45000 && loanAmount <= 65000) {
        apr = 5.8;
    } else if (loanAmount > 65000 && loanAmount <= 250000) {
        apr = 5.4;
    }


    return apr
}