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
	const placeholder= [
		'1. 잘못된 메일 주소 형식 입니다. 수신 메일: xxx@naver.con',
		'2. 잘못된 메일 주소 형식 입니다. 수신 메일: xxx@naver.com',
	].join("\n");
</script>

<style lang="scss">
	textarea {
		width: 80%;
		max-width: 600px;
		height: 200px;
		font-size:0.9rem;
		&::placeholder {
			color: #ccc;
		}
	}
</style>

<div class="top">
	<h1>각 파일을 업로드하고<br/>잘못된 메일을 아래에 붙여넣기</h1>
	<textarea class="form-control" bind:value placeholder={placeholder}/>
</div>

<div class="bottom">
	{#if enableNext}
	<button class="btn btn-lg btn-secondary" on:click="{handleSubmit}">다음 ></button>
	{/if}
</div>
