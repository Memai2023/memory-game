import {fireEvent, render, screen} from '@testing-library/react'
import GameOver from '.';

const mockHandleRestart = jest.fn();
const headingText:string="How did you like this game?"

describe("GameOver component", () => {

    test("Check that Congratulations is visible", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const text = screen.getByText("Congratulations!");
        expect(text).toBeInTheDocument()
        expect(text).toHaveTextContent("Congratulations!");
    })

    test("Check that Play again! button is visible", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const button = screen.getByTestId("restartButton");
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent("Play again!");
    })
    
    test("Check if feedback header is visible", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const feedbackHeader = screen.getByRole("heading", {level: 2, name: headingText});
        expect(feedbackHeader).toBeInTheDocument();
        expect(feedbackHeader).toHaveTextContent(headingText);
    })

    test("Check if textbox is visible", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const textbox = screen.getByPlaceholderText("Write something!")
        expect(textbox).toBeInTheDocument();
    })

    test("Check that Send feedback button is visible", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const button = screen.getByTestId("feedbackButton");
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent("Send feedback");
    })

    test("Verfiy you can write in the form", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const textbox = screen.getByPlaceholderText("Write something!")
        fireEvent.change(textbox, { target: { value: "Your game is awesome!"}})
        expect(textbox).toHaveValue("Your game is awesome!");
    })

    test("Test that Send feedback button works", () => {
        render(<GameOver handleRestart={mockHandleRestart} />)
        const textbox = screen.getByPlaceholderText("Write something!")
        const button = screen.getByTestId("feedbackButton");
        fireEvent.change(textbox, { target: { value: "Your game sucks. Boo!"}})
        fireEvent.click(button)
        expect(textbox).not.toBeInTheDocument();
        expect(button).not.toBeInTheDocument();
        const response = screen.getByText("Thanks for your feedback!");
        expect(response).toBeInTheDocument();
        expect(response).toHaveTextContent("Thanks for your feedback!");
    })
})
