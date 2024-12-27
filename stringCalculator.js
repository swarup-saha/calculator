// String Calculator implementation using TDD

class StringCalculator {
    add(numbers) {
        if (!numbers) return 0;

        const { delimiters, numbersString } = this.extractDelimitersAndNumbers(numbers);
        const numberList = this.splitNumbers(numbersString, delimiters);

        const negatives = numberList.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
        }

        return numberList.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
    }

    extractDelimitersAndNumbers(numbers) {
        const multiDelimiterMatch = numbers.match(/^\/\/(\[.+?\])+\n/);
        const singleDelimiterMatch = numbers.match(/^\/\/(.)\n/);

        if (multiDelimiterMatch) {
            const delimiters = multiDelimiterMatch[0]
                .match(/\[.+?\]/g)
                .map(d => d.slice(1, -1));
            const numbersString = numbers.slice(multiDelimiterMatch[0].length);
            return { delimiters, numbersString };
        } else if (singleDelimiterMatch) {
            const delimiters = [singleDelimiterMatch[1]];
            const numbersString = numbers.slice(singleDelimiterMatch[0].length);
            return { delimiters, numbersString };
        }

        return { delimiters: [',', '\n'], numbersString: numbers };
    }


    splitNumbers(numbers, delimiters) {
        const regex = new RegExp(delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|'));
        return numbers.split(regex).map(num => parseInt(num, 10)).filter(num => !isNaN(num));
    }
}

// Exporting the class for testability
module.exports = StringCalculator;
