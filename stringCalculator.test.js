const StringCalculator = require('./stringCalculator');

let calculator;

beforeEach(() => {
    calculator = new StringCalculator();
});

describe('StringCalculator', () => {
    test('should return 0 for an empty string', () => {
        expect(calculator.add("")).toBe(0);
    });

    test('should return the number itself for a single number', () => {
        expect(calculator.add("1")).toBe(1);
    });

    test('should return the sum of two numbers', () => {
        expect(calculator.add("1,2")).toBe(3);
    });

    test('should handle an unknown number of numbers', () => {
        expect(calculator.add("1,2,3,4,5")).toBe(15);
    });

    test('should handle newlines as delimiters', () => {
        expect(calculator.add("1\n2,3")).toBe(6);
    });

    test('should throw an error for negative numbers', () => {
        expect(() => calculator.add("1,-2,3")).toThrow('Negative numbers not allowed: -2');
    });

    test('should show all negative numbers in the exception message', () => {
        expect(() => calculator.add("1,-2,-3,4")).toThrow('Negative numbers not allowed: -2, -3');
    });

    test('should ignore numbers greater than 1000', () => {
        expect(calculator.add("2,1001")).toBe(2);
    });
    
    test('should support single-character custom delimiters', () => {
        expect(calculator.add("//;\n1;2")).toBe(3);
    });    


    test('should support multi-character custom delimiters', () => {
        expect(calculator.add("//[***]\n1***2***3")).toBe(6);
    });

    test('should support multiple custom delimiters', () => {
        expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
    });

    test('should support multiple custom delimiters of varying lengths', () => {
        expect(calculator.add("//[***][%%][#]\n1***2%%3#4")).toBe(10);
    });
});
