import { writeFile } from "fs/promises";

void writeFile("foo", "bar");

const someData = {
	users: [
		{
			id: 1,
			name: "Max Middleton",
			password: "secret",
		},
		{
			id: 2,
			name: "Kim Whitmore",
			password: "secret",
		},
		{
			id: 1,
			name: "Alex Lopez",
			password: "secret",
		},
	],
};

void writeFile("some.json", JSON.stringify(someData, null, 4));
