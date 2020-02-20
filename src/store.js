import { writable } from 'svelte/store';
import FileSaver from 'file-saver';
import Papa from 'papaparse';

// 용량이 크므로 plain array로 처리
export let emails = [];

export let emailLength = (() => {
	const { set, subscribe } = writable(0);

	const update = () => {
		set(emails.length);
	};

	return {
		update,
		subscribe,
	};
})();

export const insertEmail = email => {
	emails.push(email);
};

export const removeEmail = email => {
	const index = emails.indexOf(email);
	emails.splice(index, 1);
};

export const step = (() => {
	const { set, update, subscribe } = writable(0);

	const next = () =>
		update(_ => {
			emailLength.update();
			_++;
			return _;
		});

	const prev = () =>
		update(_ => {
			emailLength.update();
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
			insertEmail(email);
		}
	},
	remove: line => {
		const email = getCleanedEmail(line);
		if (email !== null) {
			removeEmail(email);
		}
	},
};

export const downloadEmalsAsCsv = () => {
	var i,
		j,
		times,
		chunk = 9999;
	for (i = 0, j = emails.length, times = 0; i < j; i += chunk) {
		const chunkArr = emails.slice(i, i + chunk);
		downloadEachChunk(chunkArr, ++times);
	}
	step.next();
};

const downloadEachChunk = (chunkArr, times) => {
	const arrWithNum = chunkArr.map((email, i) => {
		return [i + 1, email];
	});
	var blob = new Blob(
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
	FileSaver.saveAs(
		blob,
		`emails-${step == 1 ? 'raw' : 'clean'}-${
			times < 10 ? '0' : ''
		}${times}.csv`
	);
};
