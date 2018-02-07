let requireDirectory = require('require-directory');

let task = function () {
	let tasks = requireDirectory(module);
	for (let task in tasks) {
		tasks[task].run();
	}
};
module.exports = task;
