const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.fieldSize = { x: 3, y: 3 };
        this.currentPosition = { x: 0, y: 0 };
    }

    print() {
        console.clear();
        console.log('Find your hat!');
        this.field.forEach(row => {
            let printRow = row.join('');
            console.log(printRow);
        })
    }

    play() {
        let delta;
        let newPosition;
        let direction = prompt('Which direction? ');
        
        switch (direction.toLowerCase()) {
            case 'u':
                delta = { x: 0, y: -1 };
                break;
            case 'd':
                delta = { x: 0, y: 1 };
                break;
            case 'l':
                delta = { x: -1, y: 0 };
                break;
            case 'r':
                delta = { x: 1, y: 0 };
                break;
            default:
                delta = { x: 0, y: 0 };
                this.print();
                this.play();
        }

        newPosition = {
            x: this.currentPosition.x + delta.x,
            y: this.currentPosition.y + delta.y
        };

        if (newPosition.x < 0 || newPosition.x >= this.fieldSize.x ||
            newPosition.y < 0 || newPosition.y >= this.fieldSize.y) {
            console.log('Out of bounds.');
        } else if (this.field[newPosition.y][newPosition.x] === hole) {
            console.log('You fell in a hole.');
        } else if (this.field[newPosition.y][newPosition.x] === hat) {
            console.log('Congrats! You found your hat.');
        } else {
            this.field[newPosition.y][newPosition.x] = pathCharacter;
            this.currentPosition = newPosition;
            this.print();
            this.play();
        }
    }

}

testField = [
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
];

myField = new Field(testField);

myField.print();
myField.play();