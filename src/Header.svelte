<script>
	import { step, restart, info } from './store.js';

	const openInfo = () => {
		$info = true;
	};
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
		.btn {
			line-height: 1.1;
			padding-top: 6px;
			opacity: 0.7;
		}
	}
</style>

<div id="header">
	<div>
		<a on:click="{restart}">이메일클리너</a>
		<button class="btn btn-sm btn-outline-secondary" on:click="{openInfo}">
			정보
		</button>
	</div>
	<div>
		{$step + 1} / 5
	</div>
</div>
