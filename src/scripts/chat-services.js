function formatPercent(value) {
	if (value) {
		var percent = value + "%"
		return percent;
	}
}

function formatCurrency(value) {
	if(value){
		nStr = value.toFixed(2);
		nStr = nStr.replace(/,/g, "");
		nStr = nStr.replace(/£/g, "");
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		if(x.length > 1 && x[1] != "00") {
			x2 = '.' + x[1];
		} else {
			x2 = ''
		}
		//x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return "£" + x1 + x2;
	}
}


function formatMonths(months) {
	if(months){
		var years = months / 12; // 1
		var remainingMonths = months % 12; 
		
		years = Math.floor(years);

		var formatted = ""
		if(remainingMonths >= 1 && years < 1){
			formatted = remainingMonths + " months"
		} else if(years >= 1 && remainingMonths < 1){
			formatted = years + " years"
		} else if(years >= 1 && remainingMonths >= 1 && remainingMonths == 6){
			formatted = years + "½ years"
		} else if(years >= 1 && remainingMonths >= 1){
			formatted = years + " years and " + remainingMonths + " months"
		} else {
			formatted = ""
		}
				
		return formatted;
	}
}

function unformat(value){
    return value.replace("£","").replace(",","").replace("%","")
}