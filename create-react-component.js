import process from "node:process";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const getArgs = () => process.argv.slice(2);

const jsxTemplate = component => `import React from "react";

const ${component}  = () => null;
`;

const readmeTemplate = component => `# ${component}

This is a very nice ${component};
`;

// ../foo/bar
// This function needs to be called.
const createReactComponent = async (directory, componentName) => {
	const output = path.join("out", directory, componentName); // `out/${directory}` ".."
	const jsPath = path.join(output, `index.jsx`);
	const readmePath = path.join(output, "README.md");

	// out/foo/bar
	// -> out/foo/bar

	// out/foo/bar/..
	// -> out/foo/  [bar] <- bar is removed since we have ".." ath the end

	// out/foo/bar
	// cd ..
	// -> out/foo

	// out/foo/bar/../baz
	// out/foo/baz
	// -> out/foo/baz

	// out/foo/bar/../../baz
	// -> out/baz

	// cd ..
	// cd ../..
	// "out/foo/bar/baz"

	// We need to create the directory first
	// We need to wait (await) until the directory creation is done
	await mkdir(output, { recursive: true });

	// We can write files independently since they don't have any further requirements.
	writeFile(jsPath, jsxTemplate(componentName)).then(() => {
		console.log("Created: ", jsPath);
	});
	writeFile(readmePath, readmeTemplate(componentName)).then(() => {
		console.log("Created: ", readmePath);
	});
};

// Get arguments from command line
const [directory, componentName] = getArgs();
// Run function
void createReactComponent(directory, componentName);
