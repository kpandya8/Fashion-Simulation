function speech_to_text() {
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	const recognition = new SpeechRecognition();
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	recognition.start();

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log(speechResult);
	};

	const commands = [
		{
			pattern: /show me white t-shirts/,
			action: () => {
				console.log('Showing white t-shirts');
			},
		},
		{
			pattern: /show me black t-shirts/,
			action: () => {
				console.log('Showing black t-shirts');
			},
		},
	];

	function matchCommand(input) {
		for (const command of commands) {
			if (input.match(command.pattern)) {
				command.action();
				break;
			}
		}
	}

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log(speechResult);

		matchCommand(speechResult);
	};

}