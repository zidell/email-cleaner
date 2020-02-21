<script>
	import { step, restart } from './store.js';
</script>

<style lang="scss">
	#header {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 1.3rem;
		color: #999;
		a {
			color: #222;
			text-decoration: none;
			font-weight: bold;
			cursor: pointer;
		}
	}
</style>

<div id="header">
	<a on:click="{restart}">이메일클리너</a>
	<div>
		{$step + 1} / 5
	</div>
</div>
