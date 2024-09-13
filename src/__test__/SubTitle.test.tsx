import { render, screen } from "@testing-library/react";
import SubTitle from '.';

test("Check that subtitle is rendered with correct text", () => {
    const mockData:string = "Find matching pairs"
    render(<SubTitle subtitle={mockData} />)

    const subtitleText = screen.getByRole("heading", {level: 2, name: mockData });
    expect(subtitleText).toBeInTheDocument();
    expect(subtitleText).toHaveTextContent(mockData);
})