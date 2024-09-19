export function add(x: number, y: number){
    return x + y;
}

describe('Initial Test', () => {
    test('add function', () => {
        expect(add(1, 1)).toEqual(2);
    })
})