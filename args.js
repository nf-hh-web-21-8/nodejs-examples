import process from "node:process";

// Version 2
const getArgs = () => {
	const [, , ...args] = process.argv;
	return args;
};

const args = getArgs();

console.log(args);

// Version 2
const getArgs2 = () => {
	const args = process.argv.slice(2);
};

const args2 = getArgs2();

console.log(args2);
