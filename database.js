import {promises as fs} from "fs";
import {v4 as uuid} from "uuid";

const getArgs = () => {
    const [,,...args] = process.argv;
    return args;
}
const fileName = "db.json";
const init =  () => {
   fs.writeFile(fileName, JSON.stringify({users:[]}))
}
const addUser = async (name) => {
    const previous = await fs.readFile(fileName, "utf-8");
    const previousData = JSON.parse(previous);
    previousData.users.push({name, id: uuid()});
    await fs.writeFile(fileName, JSON.stringify(previousData))
}

const removeUser = async (id) => {
    const previous = await fs.readFile(fileName, "utf-8");
    const previousData = JSON.parse(previous);
    previousData.users.splice(previousData.users.findIndex(user => user.id === id));
    await fs.writeFile(fileName, JSON.stringify(previousData))
}

const [action, data] = getArgs();

switch(action) {
    case "init":
        init(data);
        break;
    case "remove":
        removeUser(data);
        break;
    case "add":
        addUser(data)
        break;
    default:
        console.log("not implemented")
}
