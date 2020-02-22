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

const generator = createGenerator();

$(document).ready(() => {

    $(form).on('submit', e => {
        e.preventDefault();

        const passwordLength = parseInt(lengthInput.val());
        const includes = handleIncludes();

        const pass = generator.generatePassword(passwordLength, includes);

        if (pass) {
            $('.form-wrapper').fadeOut(500);
            setTimeout(async () => {
                $('.result').fadeIn();
                
                for (const char of pass) {
                    await new Promise(r => setTimeout(r, 70))
                    $('.result h2').append(char);
                }

                let strength = generator.checkStrength(pass);
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