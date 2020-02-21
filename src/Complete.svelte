<script>
	import { restart } from './store.js';
</script>

<div class="top">
	<h1>이메일을 발송하세요</h1>
</div>

<div class="bottom">
	<button class="btn btn-lg btn-warning" on:click="{restart}">
		&lt; 다시 시작
	</button>
</div>
