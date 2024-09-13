import {render, screen} from '@testing-library/react'
import Card from '.';

const index:number = 0;
const card:string = "mockimage.jpg";
let isFlipped = false;
const isSolved = false;
const onClick = jest.fn();

describe("Card component", () => {
    test("Check if card initially show back of the card", () => {
        render(<Card
            index={index}
            card={card}
            isFlipped={isFlipped}
            isSolved={isSolved}
            onClick={onClick}
        />)
        const cardImage = screen.getByAltText("card back") as HTMLImageElement;
        expect(cardImage).toBeInTheDocument();
        expect(cardImage.src).toContain('back.jpg');
    })
    
    test("Check if card shows front if flipped", () => {
        isFlipped = true;
        render(<Card
            index={index}
            card={card}
            isFlipped={isFlipped}
            isSolved={isSolved}
            onClick={onClick}
        />)
        const cardImage = screen.getByAltText("card front") as HTMLImageElement;
        expect(cardImage).toBeInTheDocument();
        expect(cardImage.src).toContain('mockimage.jpg');
    })
})
