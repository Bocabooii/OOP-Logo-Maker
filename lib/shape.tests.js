const { Circle, Square, Triangle } = require('./shape');

describe('Circle', () => {
  test('render method should return the correct SVG string for a circle shape', () => {
    const shape = new Circle();
    const color = 'blue';
    shape.setColor(color);

    const expectedSvgString = `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`;

    expect(shape.render()).toEqual(expectedSvgString);
  });
});

describe('Square', () => {
  test('render method should return the correct SVG string for a square shape', () => {
    const shape = new Square();
    const color = 'green';
    shape.setColor(color);

    const expectedSvgString = `<rect x="50" height="200" width="200" fill="${color}">`;

    expect(shape.render()).toEqual(expectedSvgString);
  });
});

describe('Triangle', () => {
  test('render method should return the correct SVG string for a triangle shape', () => {
    const shape = new Triangle();
    const color = 'pink';
    shape.setColor(color);

    const expectedSvgString = `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${color}">`;

    expect(shape.render()).toEqual(expectedSvgString);
  });
});