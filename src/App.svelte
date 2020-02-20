<script>
	import { onMount } from 'svelte';
	import Importer from './Importer.svelte';
	import Download from './Download.svelte';
	import WrongEmails from './WrongEmails.svelte';

	let emails = [];
	let step = 'ready';

	// 최초의 raw email이 완료된 직후 호출
	const handleUpload = (result) => {
		emails = result;
		step = 'raw';
	}

	// 잘못된 이메일 처리
	const handleWrongs = (result) => {
		console.log('result', result);
		// 기존의 메일에서 아래 이메일들을 제거
		result.forEach(wrongEmail => {
			const index = emails.indexOf(wrongEmail);
            console.log("TCL: handleWrongs -> index", index)
			emails.splice(index, 1);
		});
		step = 'clean';
	}
</script>

<main>
	<Importer handleComplete={handleUpload}/>
	<Download emails={emails} step={step} />
	<WrongEmails handleComplete={handleWrongs} />
</main>
