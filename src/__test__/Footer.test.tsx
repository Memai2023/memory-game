import {render, screen} from '@testing-library/react'
import Footer from '.';

describe("Footer component", () => {
    test("Check footer renders correct text for assignment name", () => {
        render(<Footer />)
        const footerText = screen.getByRole("contentinfo");
        expect(footerText).toBeInTheDocument()
        expect(footerText).toHaveTextContent("Assignment 3, The Memory Game");
    })
    
    test("Check footer renders author name", () => {
        render(<Footer />)
        const footerText = screen.getByRole("contentinfo");
        expect(footerText).toBeInTheDocument()
        expect(footerText).toHaveTextContent("By Maria Hendricks 2024");
    })
})
