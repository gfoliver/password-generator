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
    
    console.log(password);
} else {
    console.log("missing parameters");
}