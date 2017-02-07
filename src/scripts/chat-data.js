var chatOptions = {
	service: [
		{
			name: "Loan",
			steps: [
				{
					name: "amount",
					step: 1,
					question: "Ok, how much would you like to borrow?",
					type: "input",
					options: "",
					inputValue: ""
				},
				{
					name: "monthly",
					step: 2,
					question: "How much do you want to pay back each month?",
					type: "input",
					options: "",
					inputValue: ""
				},
				{
					step: 3,
					question: "What are you using the money for?",
					type: "buttons",
					options: ["Car or Motorcycle", "Debt Consolidation", "Holiday", "Home Improvements", "Wedding", "Other"]
				},
				{
					step: 4,
					type: "loading",
					question: "We're searching for your loan now",
				},
				{
					name: "result",
					step: 5,
					type: "result",
					options: {
						amount: "",
						term: "",
						apr: "",
						monthly: ""
					}
				}
			]
		}
	]
}