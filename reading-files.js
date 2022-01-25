import { readFile } from "fs/promises";

readFile("foo", "utf-8").then(content => {
	console.log(content);
});

readFile("some.json", "utf-8").then(content => {
	console.log(JSON.parse(content));
});
