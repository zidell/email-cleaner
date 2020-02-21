<script>
	import { step } from './store.js';
	import Header from './Header.svelte';
	import Importer from './Importer.svelte';
	import Downloader from './Downloader.svelte';
	import WrongEmails from './WrongEmails.svelte';
	import Complete from './Complete.svelte';
	import Info from './Info.svelte';

	const compArr = [Importer, Downloader, WrongEmails, Downloader, Complete];
</script>

<style lang="scss">
	#app {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>

<div id="app">
	<Header />
	<div id="body">
		<svelte:component this="{compArr[$step]}" />
	</div>
	<Info />
</div>
