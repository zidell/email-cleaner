<script>
	import { onMount } from 'svelte';
	import { step, extractEmailFromLine } from './store.js';
	// import Papa from 'papaparse';

	const handleFiles = e => {
		const file = e.target.files[0];
		if (/\.csv$/i.test(file.name) === false) {
			return false;
		}

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
				step.next();
				return false;
			}

			// Reading next chunk, adding number of lines read to first line in current chunk
			navigator.readSomeLines(index + lines.length, linesReadHandler);
		});
	};
</script>

<style lang="scss"></style>

<div>
	<input type="file" on:change="{handleFiles}" />
</div>
