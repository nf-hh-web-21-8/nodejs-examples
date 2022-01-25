import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

const getArgs = () => {
	const [, , ...args] = process.argv;
	return args;
};

const fileName = "db.json";

/**
 * Initializes the database with a model
 * @return {Promise<void>}
 * @example
 * init({users: []})
 */
const init = async model => {
	return writeFile(fileName, JSON.stringify(model));
};

/**
 * Adds a user to the collection.
 * @param {string} name
 * @return {Promise<void>}
 * @example
 * addUser("Max")
 */
const addUser = async name => {
	const previous = await readFile(fileName, "utf-8");
	const previousData = JSON.parse(previous);
	previousData.users.push({ name, id: uuid() });
	return writeFile(fileName, JSON.stringify(previousData));
};

/**
 * Remover a user from the collection.
 * @param {string} id
 * @return {Promise<void>}
 * @example
 * removeUser("b9460cd0-b323-4c50-a623-271c658851f7")
 */
const removeUser = async id => {
	const previous = await readFile(fileName, "utf-8");
	const previousData = JSON.parse(previous);
	const index = previousData.users.findIndex(user => user.id === id);
	previousData.users.splice(index);
	return writeFile(fileName, JSON.stringify(previousData));
};

const [action, data] = getArgs();

switch (action) {
	case "init":
		void init({ users: [] });
		break;
	case "remove":
		void removeUser(data);
		break;
	case "add":
		void addUser(data);
		break;
	default:
		console.log("not implemented");
}
