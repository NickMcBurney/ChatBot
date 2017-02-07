var step = $("<div></div>");
// create step
function createStep(counter, type) {
	
	
	var Service = chatOptions.service[type]
	
	// set id with counter
	var id = "step" + counter;
	console.log(chatOptions.service[0].steps[counter - 1].step)
	// add step to .chat
	$(step).clone().prop("id", id).insertAfter($("#step" + (counter - 1)));
	console.log($("#step" + (counter - 1)))
	
	// set bot chat message
	var message = chatOptions.service[0].steps[counter - 1].question
	// create bot chat
	createBot(message, $("#" + id))
	
	// set bot chat message
	var qtype = chatOptions.service[0].steps[counter - 1].type,
		 options = chatOptions.service[0].steps[counter - 1].options,
		 name = chatOptions.service[0].steps[counter - 1].name;
	
	if(qtype == "loading") {
		// next step
		setTimeout(function(){
			createStep(counter + 1, type)
		}, 1500)
	} else if(qtype == "result") {
		// find loan
		var resultStep = getResultStepNo();

		var amount = chatOptions.service[0].steps[resultStep - 1].options.amount,
			 monthly = chatOptions.service[0].steps[resultStep - 1].options.monthly;

		findLoan(amount, monthly);
	} else {
		// create bot chat
		createUser(qtype, options, $("#" + id), name)
	}
	// debug
	console.log("id: " + id)
	console.log("message: " + message)
}
// create bot chat
function createBot(message, target) {
	var chatBot = $("<div class='chat-bot hide'></div>");
	// add chat bot with message and remove hide class
	$(target).append($(chatBot).text(message).removeClass("hide"))
}
// create user input or action
function createUser(type, options, target, inputName) {
	var chatUser = $("<div class='chat-user hide'></div>");
	
	// add chat user and remove hide class
	$(target).append($(chatUser).removeClass("hide"))

	
	if (type == "input") {
		$(chatUser).addClass("chat-input").append(
			"<input data-name='" + inputName + "'/>"
		)
	} else if (type == "buttons") {
		for (var i = 0; i < options.length; i++) {
			$(chatUser).addClass("chat-action").append(
				"<span class='chat-action-option' data-value='" + options[i] + "'></span>"
			)
		} 
	}
}

// on key down
$(document).on("keyup", ".chat-user input", function(e){
	if(e.keyCode == 13) {
		nextStep($(this))
		
		setPropertyValue($(this))
	}
})
// on user button click
$(document).on("click", ".chat-action-option", function(e){
	var type = $(this).data("no");
	if(type) {
		nextStep($(this), type)
	} else {
		nextStep($(this))
	}
})

// create next step
function nextStep(elm, type){
	var step = $(elm).parent().parent().prop("id").replace(/\D/g,'')
	var nextStep = Number(step) + 1
	createStep(nextStep, type)
}

// set object property value
function setPropertyValue(elm) {
	var value = $(elm).val(),
		 name = $(elm).data("name");
	
	// if input has value and name
	if(value && name) {
		
		// get step number from result object
		var step = getResultStepNo();
		
		// set requested loan amount or monthly payment
		if(name == "amount"){
			chatOptions.service[0].steps[step - 1].options.amount = value;
		} else if (name == "monthly") { 
			chatOptions.service[0].steps[step - 1].options.monthly = value;
		}			
	} 
	
}


function getResultStepNo(){
	var ResultObject = chatOptions.service[0].steps.filter(function( obj ) {
		return obj.name == "result";
	});
	return ResultObject[0].step;
}
