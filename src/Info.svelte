<script>
	import { info } from './store.js';

	const closeInfo = () => {
		localStorage.defaultShow = 'y';
		$info = false;
	};
</script>

<style lang="scss">
	#info {
		position: fixed;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.8);
		justify-content: center;
		z-index: 1;
		> div {
			padding: 30px;
			box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
			background: #fff;
			max-width: 500px;
			h2 {
				font-size: 1.7rem;
				opacity: 0.9;
				margin-bottom: 1em;
			}
			p {
				font-size: 0.95rem;
			}
		}
	}
</style>

{#if $info}
<div id="info">
	<div>
		<h2>사이트 이용안내</h2>
		<p>
			이 사이트는
			<a href="https://www.toast.com/kr" class="btn-link" target="_blank"
				>Toast</a
			>등의 대량메일 발송서비스를 이용할 때, 이메일 리스트를 업로드하기
			좋은 단위로 분할(chunk)하기 위한 도구입니다. 분할 외에도 중복 메일
			제거, 빈 문자 제거, 오류난 메일 제거 등의 기능을 제공합니다.
		</p>
		<p>
			사이트의 모든 작업은 사용자의 브라우저상에서만 이루어지며, 따라서
			사이트를 닫는 동시에 모든 데이터는 증발됩니다. 사이트의 소스는
			<a
				href="https://github.com/zidell/email-cleaner"
				class="btn-link"
				target="_blank"
				>깃헙 저장소</a
			>에서 확인하실 수 있습니다.
		</p>
		<p>
			마지막으로 이 서비스를 사용함에 있어서의 모든 책임은 사용자에게
			있음을 알립니다.
		</p>
		<div class="text-center">
			<button class="btn btn-primary" on:click="{closeInfo}">확인</button>
		</div>
	</div>
</div>
{/if}
