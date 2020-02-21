<script>
	import { onMount } from 'svelte';
	import {
		step,
		resetEmails,
		emailLength,
		extractEmailFromLine,
		completeImport,
	} from './store.js';
	let enableNext = false;
	let status = '';
	// import Papa from 'papaparse';

	const handleFiles = e => {
		const file = e.target.files[0];
		if (/\.csv$/i.test(file.name) === false) {
			return false;
		}

		resetEmails();
		status = 'importing';

		var navigator = new LineNavigator(file);
		var indexToStartWith = 0;
		navigator.readSomeLines(indexToStartWith, function linesReadHandler(
			err,
			index,
			lines,
			isEof,
			progress
		) {
			// Error happened
			if (err) throw err;

			// Reading lines
			for (var i = 0; i < lines.length; i++) {
				var lineIndex = index + i;
				var line = lines[i];

				extractEmailFromLine.insert(line.trim().replace(/\s+/, ''));
			}

			// progress is a position of the last read line as % from whole file length

			// End of file
			if (isEof) {
				completeImport();
				status = 'done';
				enableNext = true;
				return false;
			}

			// Reading next chunk, adding number of lines read to first line in current chunk
			navigator.readSomeLines(index + lines.length, linesReadHandler);
		});
	};
</script>

<style lang="scss">
	input[type='file'] {
		display: none;
	}
</style>

<div class="top">
	<h1>원본 이메일리스트 CSV를 선택</h1>
	<label class="btn btn-lg btn-primary">
		<input type="file" on:change="{handleFiles}" />
		파일 선택
	</label>

	<h2>
		{#if status === 'importing'} 인식중... {:else if status === 'done'}
		인식된 메일주소 {$emailLength}개 {/if}
	</h2>
</div>
<div class="bottom">
	{#if enableNext}
	<button class="btn btn-lg btn-secondary" on:click="{step.next}">
		다음 >
	</button>
	{/if}
</div>
