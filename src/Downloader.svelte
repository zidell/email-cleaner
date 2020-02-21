<script>
	import { step, download } from './store.js';
	let enableNext = false;
	$: {
		enableNext = $download.count >= $download.total;
	}
</script>

{#if $download.count < $download.total}
<button on:click="{download.saveAs}">
	Download({$download.count}/{$download.total})
</button>
{:else} Completed {/if}

<div>
	{#if enableNext}
	<button on:click="{step.next}">next</button>
	{/if}
</div>
