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

    play() {
        this.print();

        while (true) {
            let input = this.getInput();
            let delta = this.getDelta(input);
            this.move(delta);
        }
    }

    print() {
        console.clear();
        this.field.forEach(row => {
            let printRow = row.join('');
            console.log(printRow);
        })
    }

    getInput() {
        const validInput = ['u', 'd', 'l', 'r'];

        while (true) {
            let input = prompt('Which direction? ').toLowerCase();
            if (validInput.includes(input)) {
                return input;
            } else {
                this.print();
            }
        }
    }

    getDelta(input) {
        let delta = {};

        switch (input) {
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
        }

        return delta;
    }

    move(delta) {
        let newPosition = {
            x: this.currentPosition.x + delta.x,
            y: this.currentPosition.y + delta.y
        };

        if (newPosition.x < 0 || newPosition.x >= this.fieldSize.x ||
            newPosition.y < 0 || newPosition.y >= this.fieldSize.y) {
            this.endGame('Out of bounds');
        } else if (this.field[newPosition.y][newPosition.x] === hole) {
            this.endGame('You fell in a hole.');
        } else if (this.field[newPosition.y][newPosition.x] === hat) {
            this.endGame('Congrats! You found your hat.');
        } else {
            this.updatePosition(newPosition);
        }
    }

    endGame(message) {
        console.log(message);
        process.exit();
    }

    updatePosition(newPosition) {
        this.currentPosition = newPosition;
        this.field[this.currentPosition.y][this.currentPosition.x] = pathCharacter;
        this.print();    
    }
}

testField = [
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
];

myField = new Field(testField);
myField.play();