<script>
	import { step } from './store.js';
</script>

<style lang="scss">
	#header {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

<div id="header">
	<a href="">이메일클리너</a>
	<div>
		{$step + 1} / 5
	</div>
</div>
