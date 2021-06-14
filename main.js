const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let direction = prompt('Which way?')

class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        this.field.forEach(row => {
            let printRow = row.join('');
            console.log(printRow);
        })
    }

    
}

testField = [
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
];

myField = new Field(testField);

myField.print();