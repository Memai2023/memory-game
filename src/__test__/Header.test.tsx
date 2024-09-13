import {render, screen} from '@testing-library/react';
import Header from '.';

describe("Header component", () => {
    test("Check header is rendered with correct title", () => {
        render(<Header />)
        const headerText = screen.getByRole("heading", {level: 1, name: "The Memory Game"});
        expect(headerText).toBeInTheDocument()
    })

    test("Check subtitle is rendered with correct text", () => {
        render(<Header />)
        const subTitleText = screen.getByRole("heading", {level: 2})
        expect(subTitleText).toHaveTextContent("Find matching pairs")
    })
})