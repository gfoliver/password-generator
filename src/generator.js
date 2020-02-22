function createGenerator() {
    const generators = {
        uppercase() {
            return String.fromCharCode(Math.floor(Math.random() * (90 - 65)) + 65)
        },
        lowercase() {
            return String.fromCharCode(Math.floor(Math.random() * (122 - 97)) + 97)
        },
        numbers() {
            return Math.floor(Math.random() * 9)
        },
        symbols() {
            const symbolsArr = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
            return symbolsArr[Math.floor(Math.random() * symbolsArr.length)]
        }
    }
    
    const checkStrength = (pass) => {
        if (! pass)
            return false;
        
        let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        let mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    
        if (strongRegex.test(pass)) {
            return {
                className: 'success',
                text: 'Strong'
            }
        } 
        else if (mediumRegex.test(pass)) {
            return {
                className: 'warning',
                text: 'Medium'
            }
        } 
        else { 
            return {
                className: 'danger',
                text: 'Weak'
            }
        }
    }
    
    const generatePassword = (passwordLength, includes) => {
    
        let password = '';
    
        let includedTypes = [];
    
        for (const include of Object.keys(includes)) {
            if (includes[include]) {
                includedTypes.push(include);
            }
        }
    
        if (! includedTypes.length) {
            return false;
        }
    
        for (let i = 0; i < passwordLength; i++) {
            let type = includedTypes[Math.floor(Math.random() * includedTypes.length)]
    
            password += generators[type]();
        }
    
        return password;
    }

    return {
        generatePassword,
        checkStrength
    }
}

module.exports = createGenerator