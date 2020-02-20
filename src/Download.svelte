<script>
	import FileSaver from 'file-saver';
	import Papa from 'papaparse';

	const downloadChunk = 9999;
	export let emails = [];
	export let step = '';
	const startDownload = () => {
		var i,
			j,
			times,
			temparray,
			chunk = 9999;
		for (i = 0, j = emails.length, times = 0; i < j; i += chunk) {
			const chunkArr = emails.slice(i, i + chunk);
			downloadEachChunk(chunkArr, ++times);
		}
	};
	const downloadEachChunk = (chunkArr, times) => {
		const arrWithNum = chunkArr.map((email, i) => {
			return [i + 1, email];
		});
		var blob = new Blob(
			[
				Papa.unparse(arrWithNum, {
					quotes: true,
					quoteChar: '"',
					escapeChar: '"',
				}),
			],
			{
				type: 'text/csv;charset=utf-8',
			}
		);
		FileSaver.saveAs(
			blob,
			`emails-${step}-${times < 10 ? '0' : ''}${times}.csv`
		);
	};
</script>

<button on:click="{startDownload}">Download</button>
입력된 이메일 수 : {emails.length}
