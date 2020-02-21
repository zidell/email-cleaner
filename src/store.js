import { writable, get } from 'svelte/store';
import FileSaver from 'file-saver';
import Papa from 'papaparse';

const fx = new Audio('/mario-coin-sound.mp3');

const CHUNK_SIZE = 9999;

Array.prototype.unique = function() {
	return [...new Set(this)];
};

// 용량이 크므로 plain array로 처리
export let emails = [];

export let emailLength = (() => {
	const { set, subscribe } = writable(0);

	const update = () => {
		set(emails.length);
		download.reset();
	};

	return {
		update,
		subscribe,
	};
})();

export let info = writable(!localStorage.defaultShow);

export let restart = () => {
	if (confirm('처음부터 다시 시작하시겠습니까?')) {
		location.reload();
	}
};

export const resetEmails = () => {
	emails = [];
};

export const step = (() => {
	const { set, update, subscribe } = writable(0);

	const next = () =>
		update(_ => {
			_++;
			return _;
		});

	const prev = () =>
		update(_ => {
			_--;
			return _;
		});

	return { set, next, prev, subscribe };
})();

const getCleanedEmail = str => {
	const matches = str.match(
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
	);
	if (matches !== null) {
		return matches[0];
	}
	return null;
};

export const extractEmailFromLine = {
	insert: line => {
		const email = getCleanedEmail(line);
		if (email !== null) {
			emails.push(email);
		}
	},
	remove: line => {
		const email = getCleanedEmail(line);
		if (email !== null) {
			const index = emails.indexOf(email);
			if (index > -1) {
				emails.splice(index, 1);
			}
		}
	},
};

export const completeImport = () => {
	emails = emails.unique();
	emailLength.update();
};

export const download = (() => {
	const initData = () => {
		return {
			count: 0,
			total: Math.ceil(emails.length / CHUNK_SIZE),
		};
	};
	const { set, update, subscribe } = writable(initData());

	const saveAs = () =>
		update(_ => {
			let i, j, times;
			for (i = 0, j = emails.length, times = 0; i < j; i += CHUNK_SIZE) {
				if (_.count === times) {
					const chunkArr = emails.slice(i, i + CHUNK_SIZE);
					downloadEachChunk(chunkArr, _.count + 1);
				}
				times++;
			}
			_.count++;
			return _;
		});

	const reset = () => {
		set(initData());
	};

	return {
		saveAs,
		reset,
		subscribe,
	};
})();

const downloadEachChunk = (chunkArr, count) => {
	fx.volume = 0.7;
	fx.currentTime = 0;
	fx.play();
	const arrWithNum = chunkArr.map((email, i) => {
		return [i + 1, email];
	});
	const blob = new Blob(
		[
			Papa.unparse(arrWithNum, {
				quotes: true,
				quoteChar: '"',
				escapeChar: '"',
			}),
		],
		{
			type: 'text/csv;charset=utf-8',
		}
	);
	const isRaw = get(step) === 1;
	let filename = `emails-${isRaw ? 'raw' : 'cleaned'}-${
		count < 10 ? '0' : ''
	}${count}`;
	if (!isRaw) {
		filename = filename.toUpperCase();
	}
	FileSaver.saveAs(blob, `${filename}.csv`);
};
