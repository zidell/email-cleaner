<script>
	export let handleComplete = (wrongEmails) => {
		console.log('wrongEmails', wrongEmails);
	};
	let value = '';


	const extractOnlyEmailFromStr = (str) => {
		const matches = str.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i);
		if (matches !== null) {
			return matches[0];
		}
		return null;
	}

	const handleSubmit = () => {
		const wrongEmails = [];
		value.split("\n").forEach(line => {
        	console.log("TCL: handleSubmit -> line", line)
			const email = extractOnlyEmailFromStr(line);
            console.log("TCL: handleSubmit -> email", email)
			if (email !== null) {
				wrongEmails.push(email);
			}
		});
		handleComplete(wrongEmails);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<textarea bind:value />
	<button type="submit">Apply</button>
</form>
