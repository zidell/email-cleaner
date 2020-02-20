<script>
	import { step, extractEmailFromLine } from './store.js';

	let value = '';
	const handleSubmit = () => {
		value.split('\n').forEach(line => {
			extractEmailFromLine.remove(line);
		});
		step.next();
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<textarea bind:value />
	<button type="submit">Apply</button>
</form>
