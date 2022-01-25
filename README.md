# nodejs-examples


1. ## Project Setup

**As a Developer,  
I need a development environment,  
so that I can develop an app.**

AC:
* [ ] should run node.js

> Solution:  
> Add a package.json with the following content:  
> ```json
> {
>   "name": "my-app"
> }
> ```


2. ## Hello World

**As a User,  
I want to execute a file,  
so that I get a response.**

AC:
* [ ] should print "Hello World" to the console

> Solution:  
> Create a file called index.js and add the following content:  
> ```js 
> console.log("Hello World");
> ```
> See [index.js](./index.js)

3. ## Write files

**As a User,  
I want to write files,  
so that I can read them later.**

AC:
* [ ] should write files
* [ ] should prettify JSON

> Solution:
> Create a new file called "writing-files.js".  
> Use the Node builtin file-system:
> ```js 
> import {writeFile} from "fs/promises";
> ```
> Stringify/Prettify JSON data with this builtin JavaScript method:
> ```js
> JSON.stringify({users: []}, null, 4);
> ```
> See [writing-files.js](./writing-files.js)

4. ## Read files

**As a User,  
I want to read files,  
so that I can use the content.**

AC:
* [ ] should read files
* [ ] should parse JSON

> Solution:
> Create a new file called "reading-files.js".  
> Use the Node builtin file-system:
> ```js 
> import {readFile} from "fs/promises";
> ```
> Parse JSON data with this builtin JavaScript method:
> ```js
> JSON.parse('{"users": []}');
> ```
> See [reading-files.js](./reading-files.js)


5. ## Use arguments

**As a User,  
I want to pass arguments to my script,  
so that I can use it in my operations.**

AC:
- [ ] should print all arguments to the console

> Solution:  
> Create a new file called "args.js".  
> Use one of the following methods:  
> **V1**  
> ```js
> process.argv.slice(2);
> ```
> **V2**  
> ```js
> [,,...args];
> ```
> See [args.js](./args.js)
