<script>
	import { step, emailLength } from './store.js';
	import { onMount } from 'svelte';
	import Importer from './Importer.svelte';
	import Download from './Download.svelte';
	import WrongEmails from './WrongEmails.svelte';
</script>

<main>
	step: {$step}, count: {$emailLength}
	<Importer />
	<Download />
	<WrongEmails />
</main>
