<script>
	import { step } from './store.js';
	import { onMount } from 'svelte';
	import Importer from './Importer.svelte';
	import Downloader from './Downloader.svelte';
	import WrongEmails from './WrongEmails.svelte';

	const compArr = [Importer, Downloader, WrongEmails, Downloader];
</script>

<main>
	step: {$step}
	<svelte:component this="{compArr[$step]}" />
</main>
