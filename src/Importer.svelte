<script>
	import { onMount } from 'svelte';
	import Papa from 'papaparse';

	const extractOnlyEmailFromStr = str => {
		const matches = str.match(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
		);
		if (matches !== null) {
			return matches[0];
		}
		return null;
	};

	export let handleComplete = emails => {
		console.log('emails', emails);
	};

	const emails = [];

	const insertRecord = email => {
		emails.push(email);
	};

	const isEmail = (email = '') => {
		if (email.indexOf('@') > -1) {
			return true;
		}
		return false;
	};
	/*
	전송된 컬럼에서 이메일이 있는 컬럼을 추출
	*/
	const extractOnlyEmail = arr => {
		if (!Array.isArray(arr)) {
			return null;
		}
		const email = arr.find(v => isEmail(v));
		return email;
	};

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

				// Do something with line
				const email = extractOnlyEmailFromStr(line);
				if (email !== null) {
					insertRecord(email);
				}
				// var result = Papa.parse(line);
				// if (result.data.length === 1) {
				// 	const email = extractOnlyEmail(result.data[0]);
				// 	if (email !== null) {
				// 		insertRecord(email);
				// 	}
				// }
			}

			// progress is a position of the last read line as % from whole file length

			// End of file
			if (isEof) {
				handleComplete(emails);
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
