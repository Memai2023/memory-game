import { fireEvent, render, screen } from "@testing-library/react";
import Game from '.';

describe("Game component", () => {
  test("Check if Game component renders without crashing", () => {
    render(<Game />);
  })

  test("Check that winning message is not displayed at start", () => {
    render(<Game />)
    const winningText = screen.queryByText("Congratulations!");
    expect(winningText).not.toBeInTheDocument();
  })
  
  test("Check that Play again! button is not displayed at start", () => {
    render(<Game />)
    const restartButton = screen.queryByTestId("restartButton");
    expect(restartButton).not.toBeInTheDocument();
  })

  test("Check that feeback form is not displayed at start", () => {
    render(<Game />);
    const gameoverDiv = screen.queryByTestId("feedbackform");
    expect(gameoverDiv).not.toBeInTheDocument();
  })

})

describe("Game component - Integration", () => {
  test("Check that Game renders Board that renders 16 cards", () => {
    render(<Game />)
    const cards = screen.getAllByTestId(/card-\d+/);
    expect(cards).toHaveLength(16);
  })

  test("Check if the Flips works", () => {
    render(<Game />)
    const firstCard = screen.getByTestId("card-0");
    const secondCard = screen.getByTestId("card-1");

    fireEvent.click(firstCard);
    fireEvent.click(secondCard);

    const clickCount = screen.getByTestId("clickCount");
    expect(clickCount).toHaveTextContent("Flips: 1");
  })

  test("Check that only two cards can be open", () => {
    render(<Game/>)
    const firstCard = screen.getByTestId("card-0");
    const secondCard = screen.getByTestId("card-1");
    const thirdCard = screen.getByTestId("card-2");
    fireEvent.click(firstCard);
    fireEvent.click(secondCard);
    fireEvent.click(thirdCard);

    const openCards = screen.getAllByAltText("card front");
    expect(openCards).toHaveLength(1);  
  })

})