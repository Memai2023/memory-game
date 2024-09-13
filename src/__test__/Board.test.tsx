import { fireEvent, render, screen } from "@testing-library/react";
import Board from '.';

const mockHandleGameOver = jest.fn();
const mockRestart = false;
const mockSetClickCount = jest.fn();

test("Check that Board renders 16 cards", () => {
    render(
        <Board
            handleGameOver={mockHandleGameOver}
            restart={mockRestart}
            setClickCount={mockSetClickCount}
        />
    )
    const cards = screen.getAllByTestId(/card-\d+/);
    expect(cards).toHaveLength(16);
  })