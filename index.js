const createGenerator = require('./src/generator');

const generator = createGenerator();

const args = process.argv;

args.splice(0,2);

const passLength = args[0];

const includedChars = args[1];

const includedTypes = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
}

if (includedChars) {
    for (const char of includedChars) {
        switch(char) {
            case 'u':
                includedTypes.uppercase = true;
            break;
            case 'l':
                includedTypes.lowercase = true;
            break;
            case 'n':
                includedTypes.numbers = true;
            break;
            case 's':
                includedTypes.symbols = true;
            break;
        }
    }
    
    const password = generator.generatePassword(passLength, includedTypes);
    
    console.log();
    console.log('\x1b[35m%s\x1b[0m', "Password Generator");
    console.log();
    console.log('\x1b[32m%s\x1b[0m', "Password: ", '\x1b[0m', password);
    console.log('\x1b[32m%s\x1b[0m', "Strength: ", '\x1b[0m', generator.checkStrength(password).text);
    console.log();
} else {
    console.log("\x1b[31m%s\x1b[0m", "missing parameters");
}