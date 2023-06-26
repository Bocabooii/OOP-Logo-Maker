const fs = require('./node_modules/graceful-fs/graceful-fs');
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require('./lib/shape');

class SvgGenerator {
	constructor() {
	  this.textElement = '';
	  this.shapeElement = '';
	}
  
	render() {
	  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
	}
  
	setTextElement(text, color) {
	  this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
	}
  
	setShapeElement(shape) {
	  this.shapeElement = shape.render();
	}
  }
  
  function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
	  if (err) {
		console.log(err);
	  } else {
		console.log(`Congratulations, you have generated ${fileName}!`);
	  }
	});
  }
  
  async function promptUser() {
	const answers = await inquirer.prompt(questions);
	return answers;
  }
  
  function validateText(text) {
	return text.length > 0 && text.length < 4;
  }
  
  function getShapeInstance(shapeType) {
	switch (shapeType.toLowerCase()) {
	  case 'circle':
		return new Circle();
	  case 'square':
		return new Square();
	  case 'triangle':
		return new Triangle();
	  default:
		return null;
	}
  }
  
  async function generateLogo() {
	try {
	  console.log('Starting logo generation...');
	  const answers = await promptUser();
  
	  const text = answers.text;
	  if (!validateText(text)) {
		console.log('Invalid user text field detected! Please enter 1-3 characters.');
		return;
	  }
  
	  const textColor = answers['text-color'];
	  const shapeColor = answers.shape;
	  const shapeType = answers['pixel-image'];
  
	  const shape = getShapeInstance(shapeType);
	  if (!shape) {
		console.log('Invalid shape!');
		return;
	  }
	  shape.setColor(shapeColor);
  
	  const svg = new SvgGenerator();
	  svg.setTextElement(text, textColor);
	  svg.setShapeElement(shape);
  
	  const svgString = svg.render();
	  console.log('Generated SVG:');
	  console.log(svgString);
  
	  const fileName = 'logo.svg';
	  writeToFile(fileName, svgString);
	} catch (error) {
	  console.log('An error occurred during logo generation:', error);
	}
  }
  
  const questions = [
	{
	  type: 'input',
	  name: 'text',
	  message: 'TEXT: Enter up to (3) characters:',
	},
	{
	  type: 'input',
	  name: 'text-color',
	  message: 'TEXT COLOR: Enter a color keyword (or a hexadecimal number):',
	},
	{
	  type: 'input',
	  name: 'shape',
	  message: 'SHAPE COLOR: Enter a color keyword (or a hexadecimal number):',
	},
	{
	  type: 'list',
	  name: 'pixel-image',
	  message: 'Choose which Pixel Image you would like?',
	  choices: ['Circle', 'Square', 'Triangle'],
	},
  ];
  
  generateLogo();