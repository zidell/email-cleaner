<script>
	import { step, download, emailLength } from './store.js';
	let enableNext = false;
	$: {
		enableNext = $download.count >= $download.total;
	}
</script>

<div class="top">
	{#if $step === 1}
	<h1>
		단순히 업로드 단위로 쪼개진 파일입니다.
	</h1>
	{:else}
	<h1>정제된 최종 파일입니다</h1>
	{/if}
	<h2>아래의 다운로드 버튼을 여러 번 클릭하십시오.</h2>

	<div>
		{#if $download.count < $download.total}
		<button on:click="{download.saveAs}">
			Download({$download.count}/{$download.total})
		</button>
		{:else} Completed {/if}
	</div>
</div>

<div class="bottom">
	{#if enableNext}
	<button on:click="{step.next}">next</button>
	{/if}
</div>
