// перемешать набор чисел (всего n чисел)  - два поднабора от 0 до n/2 - 1
export const createRandomArray = (n: number): Array<number> => {
    const result: Array<number> = [];
    const arrayOfPositions: Array<number> = [];
    const arrayOfValues: Array<number> = [];
    for (let i = 0; i < n / 2; i++) { // 0 ... n/2 - 1
        for (let j = 0; j < 2; j++) { // каждое число в количестве 2
            while (true) {
                let number = Math.round(-0.5 + Math.random() * (n - 1 + 1)); // номер позиции -  случайное число от 0 до n - 1
                if (!arrayOfPositions.includes(number)) {
                    arrayOfPositions.push(number);
                    arrayOfValues.push(i)
                    break;
                }
            }
        }
    }
    arrayOfPositions.forEach((position, index) => result[position] = arrayOfValues[index])
    return result
};