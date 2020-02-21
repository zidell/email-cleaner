<script>
	import { step, emailLength, extractEmailFromLine } from './store.js';
	let enableNext = true;
	let value = '';
	const handleSubmit = () => {
		value.split('\n').forEach(line => {
			extractEmailFromLine.remove(line);
		});
		emailLength.update();
		step.next();
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<textarea bind:value />
</form>

<div>
	{#if enableNext}
	<button on:click="{handleSubmit}">next</button>
	{/if}
</div>
