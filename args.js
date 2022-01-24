const getArgs = () => {
    const [,,...args] = process.argv;
    return args;
}

const args = getArgs();
console.log(args);
