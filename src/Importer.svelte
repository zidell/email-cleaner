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
	// import Papa from 'papaparse';

	const handleFiles = e => {
		const file = e.target.files[0];
		if (/\.csv$/i.test(file.name) === false) {
			return false;
		}

		resetEmails();

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

				extractEmailFromLine.insert(line);
			}

			// progress is a position of the last read line as % from whole file length

			// End of file
			if (isEof) {
				completeImport();
				enableNext = true;
				return false;
			}

			// Reading next chunk, adding number of lines read to first line in current chunk
			navigator.readSomeLines(index + lines.length, linesReadHandler);
		});
	};
</script>

<style lang="scss"></style>

<div class="top">
	<h1>원본 CSV를 선택해주세요.</h1>
	<input type="file" on:change="{handleFiles}" />
	count: {$emailLength}
</div>
<div class="bottom">
	{#if enableNext}
	<button on:click="{step.next}">next</button>
	{/if}
</div>
