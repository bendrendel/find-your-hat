const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.fieldSize = { width: field[0].length, height: field.length };
        this.currentPosition = this.findStartPosition(field);
    }

    findStartPosition(field) {
        let startPosition = {};
        
        startPosition.y = field.findIndex(row => {
            startPosition.x = row.indexOf(pathCharacter);
            return startPosition.x === -1 ? false : true;
        });

        return startPosition;
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

        if (newPosition.x < 0 || newPosition.x >= this.fieldSize.width ||
            newPosition.y < 0 || newPosition.y >= this.fieldSize.height) {
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

    static generateField(width, height, holeFraction) {
        let numCells = width * height;
        let numHoles = Math.floor(numCells * holeFraction);
        let numFieldCharacters = numCells - numHoles - 2;
        
        let fieldCells = [pathCharacter, hat];
        for (let i = 0; i < numHoles; i++) {
            fieldCells.push(hole);
        }
        for (let i = 0; i < numFieldCharacters; i++) {
            fieldCells.push(fieldCharacter);
        }

        let field = [];
        for (let i = 0; i < height; i++) {
            let newRow = [];
            field.push(newRow);
            for (let j = 0; j < width; j++) {
                let randomCellIndex = Math.floor(Math.random() * fieldCells.length);
                let newCell = fieldCells.splice(randomCellIndex, 1)[0];
                field[i].push(newCell);
            }
        }

        return field;
    }
}

myField = new Field(Field.generateField(10, 10, 0.3));
myField.play();