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
		다운로드 버튼을 여러 번 클릭
	</h1>
	{:else}
	<h1>최종 다운로드 버튼을 여러 번 클릭</h1>
	<h2>최종 메일주소 {$emailLength}개</h2>
	{/if}

	<div>
		{#if $download.count < $download.total}
		<button class="btn btn-lg btn-info" on:click="{download.saveAs}">
			{$download.count + 1}번째 파일 다운받기
		</button>
		{:else}
		<button class="btn btn-lg btn-outline-dark" disabled>
			모두 다운받음
		</button>
		{/if}
	</div>
</div>

<div class="bottom">
	{#if enableNext}
	<button class="btn btn-lg btn-secondary" on:click="{step.next}">
		다음 >
	</button>
	{/if}
</div>
