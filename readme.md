![Password Generator](https://repository-images.githubusercontent.com/241496427/01397400-6a28-11ea-8c86-455467ca2a9a)

# Password Generator

Generate passwords based on certain characteristics selected by the user.

## Features

* Select the length of the generated password
* Select one or multiple of the following: `Include uppercase letters`, `Include lowercase letters`, `Include numbers`, `Include symbols`
* By clicking the `Generate password` button, the user can see a password being generated
* Copy password to clipboard
* Password strength check

## Usage

### Web

* Select the length, and the types of characters you want and click the button `Generate password`

### Node

* **Command:** `node index.js ${length} ${character types}`
* **Length:** Number
* **Character types:** initial letters without space `['u', 'l', 'n', 's']`
* **Example:** `node index.js 20 ulns`

## Built with

* JavaScript
* [NodeJS](https://nodejs.org/en/)

## Authors

* Guilherme Fleck Oliveira

## Credits
* Project Idea from [florinpop17/app-ideas](https://github.com/florinpop17/app-ideas)
