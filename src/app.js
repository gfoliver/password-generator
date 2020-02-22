const form = $('#password-form');
const lengthInput = $('#password-length');
const uppercaseInput = $('#password-include-uppercase');
const lowercaseInput = $('#password-include-lowercase');
const numbersInput = $('#password-include-numbers');
const symbolsInput = $('#password-include-symbols');
const submitButton = $('.submit');

const types = ["uppercase", "lowercase", "numbers", "symbols"];

const handleIncludes = () => {
    let ret = {};

    for (const type of types) {
        ret[type] = $(`#password-include-${type}`)[0].checked;
    }

    return ret;
}

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
        alert('Select at least one type of character');
        return false;
    }

    for (let i = 0; i < passwordLength; i++) {
        let type = includedTypes[Math.floor(Math.random() * includedTypes.length)]

        password += generators[type]();
    }

    return password;
}

$(document).ready(() => {

    $(form).on('submit', e => {
        e.preventDefault();

        const passwordLength = parseInt(lengthInput.val());
        const includes = handleIncludes();

        const pass = generatePassword(passwordLength, includes);

        if (pass) {
            $('.form-wrapper').fadeOut(500);
            setTimeout(async () => {
                $('.result').fadeIn();
                
                for (const char of pass) {
                    await new Promise(r => setTimeout(r, 70))
                    $('.result h2').append(char);
                }

                let strength = checkStrength(pass);
                $('.strength').html(`<span class="text-${strength.className}">${strength.text}</span>`);
            }, 500)
        }
    });

    $('#back').on('click', () => {
        $('.result').fadeOut(500);
        setTimeout(() => {
            $('.result h2').html('');
            $('.form-wrapper').fadeIn();
            $('#copy').html('Copy Password').removeClass('copied');
            $('.strength').html('');
        }, 500)
    });

    $('#copy').on('click', () => {
        navigator.clipboard.writeText($('.result h2').text());
        $('#copy').html('Copied!').addClass('copied');
    })
})