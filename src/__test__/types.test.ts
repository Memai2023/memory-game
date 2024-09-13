import { imgCards } from './types';

describe("Checking how many image and what the imgCards array contains", () => {
    test("Check that the array should contain 8 image names", () => {
        expect(imgCards).toHaveLength(8);
    });
    
    test("Check that the array should contain specific image names", () => {
        const expectedImages = ["apple", "coffee", "flower", "leaf", "note", "umbrella", "water", "paint"];
        expectedImages.forEach(image => {
            expect(imgCards).toContain(image);
        });
    });
});