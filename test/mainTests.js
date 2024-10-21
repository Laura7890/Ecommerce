const assert = require('chai').assert;

const main = require('../js/main.min');

//Resultados

const helloWorldText = main.helloWorld();
const subtractionResult = main.subtraction(4,2);
const arrayOfNumbers = main.arrayOfNumbers();

describe('Main Suite', function(){

    describe('Hello world Method - Test Cases', function(){
        it('Hello World text is expected', function(){
            assert.equal(helloWorldText, 'hello world');
        });
    });
});

