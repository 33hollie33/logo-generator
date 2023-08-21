const fs = require('fs').promises;
const readLineSync = require('readline-sync');

class Logo {
    constructor(shape, color, text) {
        this.shape = shape;
        this.color = color;
        this.text = text;
    }

    getShape() {
        switch (this.shape) {
            case 'circle':
                return `<circle cx="250" cy="250" r="100" fill="${this.color} " />`;
            case 'rect':
                return `<rect width="200" height="200" x="150" y="150" fill="${this.color} " />`;
            case 'triangle':
                return `<polygon fill="${this.color}" points="250,150 150,350 350,350"/>`;
            default:
                console.log("Invalid shape! Defaulting to circle!");
                return `<circle cx="250" cy="250" r="100" fill="${this.color} " />`;
        }

    }

    generateSvg() {
        return `<svg version = "1.1" width = "500" height = "500" xmlns = "http://www.w3.org/2000/svg" >
                    ${this.getShape()}
                <text x="50%" y="50%" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="white">${this.text}</text>
        </svg > `;
    }

    async saveFile() {
        try {
            await fs.writeFile("logo.svg", this.generateSvg());
            console.log("The logo has been generated and saved under 'logo.svg'!");
        }
        catch (err) {
            console.log(err);
        }
    }
}
let shape = readLineSync.question("Pick one shape to generate -> rect, circle, triangle? ");
let color = readLineSync.question("Pick any color you like ");

if (color == "") {
    console.log("No color input, defaulting to green");
    color = "green";
}

let text = readLineSync.question("Pick any text (max. 3 letters) ");
if (text == "") {
    console.log("No text input, defaulting to ABC");
    text = "ABC";
}

const logo = new Logo(shape, color, text);

logo.saveFile();