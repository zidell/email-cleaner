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

<div class="top">
	<h1>토스트에 쪼개진 단위로 등록을 시도하고, 오류가 날 때마다 아래에 추가하세요.</h1>
	<textarea bind:value />
</div>

<div class="bottom">
	{#if enableNext}
	<button on:click="{handleSubmit}">next</button>
	{/if}
</div>
