import express from "express";
import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const port = 1337;
const fileName = "db.json";

const form = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <form id="form">
            <input type="text" name="name"/>
            <button type="submit">Add</button>
            <ul id="user-list"></ul>
        </form>
        <script>
            const form = document.querySelector("#form");
            const userList = document.querySelector("#user-list");
            form.addEventListener("submit", async event_ => {
                event_.preventDefault();
                // Get the data from the form
                const formData = new FormData(event_.target);
                const formValues = Object.fromEntries(formData);
                // Send a POST request to the API route
                const response = await fetch("http://localhost:1337/api/users/add/", {
                    method: "POST",
                    body: JSON.stringify(formValues),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const {data: {users}} = await response.json();

                // Reset the entire form
                event_.target.reset();

                // Overwrite the userList to show new content
                userList.innerHTML = "";
                for (const user of users) {
                    const li = document.createElement("li")
                    li.innerHTML = user.name;
                    userList.append(li);
                }
            });

            // Initial fetch to get all users and display them in a list
            fetch("http://localhost:1337/api/users/get").then(response => response.json()).then(({data: {users}}) => {
                for (const user of users) {
                    const li = document.createElement("li")
                    li.innerHTML = user.name;
                    userList.append(li);
                }
            })
        </script>
    </body>
</html>
`;

app.get("/", (request, response) => {
	response.send("hello world");
});

app.get("/users", (request, response) => {
	response.send(form);
});

app.get("/api/users/get", async (request, response) => {
	const db = await fs.readFile(fileName, "utf-8");
	const data = JSON.parse(db);
	response.json({ meta: { count: data.users.length }, data });
});

app.post("/api/users/add", async (request, response) => {
	const { name } = request.body;
	const db = await fs.readFile(fileName, "utf-8");
	const data = JSON.parse(db);
	const user = { name, id: uuid() };
	data.users.push(user);
	await fs.writeFile("db.json", JSON.stringify(data));
	response.status(200);
	response.json({ meta: { count: data.users.length }, data });
});

app.delete("/api/users/delete", async (request, response) => {
	const { id } = request.body;
	const db = await fs.readFile(fileName, "utf-8");
	const data = JSON.parse(db);
	data.users.splice(data.users.findIndex(user => user.id === id));
	await fs.writeFile("db.json", JSON.stringify(data));
	response.status(200);
	response.json({ meta: { count: data.users.length }, data });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
