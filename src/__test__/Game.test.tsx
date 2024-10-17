import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  test("Check that two non-matching cards flip back", () => {
    render(<Game/>)
    const firstCard = screen.getByTestId("card-0");
    const secondCard = screen.getByTestId("card-1");
    const thirdCard = screen.getByTestId("card-2");
 
    fireEvent.click(firstCard);
    fireEvent.click(secondCard);

    let openCards = screen.getAllByAltText("card front");

    const firstCardImg = openCards[0] as HTMLImageElement;
    const secondCardImg = openCards[1] as HTMLImageElement;

    if (firstCardImg.src !== secondCardImg.src) {
      fireEvent.click(thirdCard);
      openCards = screen.getAllByAltText("card front");
      expect(openCards).toHaveLength(1);
    }
  })

  test('Check that two matched cards stay open', () => {
    render(<Game />);
    
    const cards = screen.getAllByTestId(/card-\d+/);
    let openCards = screen.queryAllByAltText("card front");

    for (let i=1; i<cards.length; i++) {
      fireEvent.click(cards[i]);
      fireEvent.click(cards[0]);
      
      openCards = screen.queryAllByAltText("card front");

      if (openCards.length === 2) {
        const firstCardImg = openCards[0] as HTMLImageElement;
        const secondCardImg = openCards[1] as HTMLImageElement;

        if (firstCardImg.src === secondCardImg.src) {
          let randomClick: number;
          
          do {
            randomClick = Math.floor(Math.random() * 15) + 1;
          } while (randomClick === i);

          fireEvent.click(cards[randomClick]);
          break;
        }
      }
    }
    openCards = screen.queryAllByAltText("card front");
    expect(openCards).toHaveLength(3);
  })

  test('Check that the game can be solved', async () => {
    render(<Game />);

    const cards = screen.getAllByTestId(/card-\d+/);
    let openCards = screen.queryAllByAltText("card front");
    expect(openCards).toHaveLength(0);

    for (let i=0; i<cards.length-1; i++) {

      const firstCardImg = cards[i].querySelector('img') as HTMLImageElement;

      if (firstCardImg.alt === 'card front') {
        continue;
      }

      for (let j=i+1; j<cards.length; j++) {
        const secondCardImg = cards[j].querySelector('img') as HTMLImageElement;

        if (secondCardImg.alt === 'card front') {
          continue;
        }
        
        fireEvent.click(cards[j]);
        await waitFor(() => {
          expect(secondCardImg.alt).toBe('card front');
        });

        fireEvent.click(cards[i]);
        await waitFor(() => {
          expect(firstCardImg.alt).toBe('card front');
        });

        if (firstCardImg.src === secondCardImg.src) {
          break;
        }
      }
    }

    openCards = screen.queryAllByAltText("card front");
    expect(openCards).toHaveLength(16);

    const text = screen.getByText("Congratulations!");
    expect(text).toBeInTheDocument();

    const restartBtn = screen.getByTestId("restartButton");
    expect(restartBtn).toBeInTheDocument()
    expect(restartBtn).toHaveTextContent("Play again!");

    const headingText:string="How did you like this game?"
    const feedbackHeader = screen.getByRole("heading", {level: 2, name: headingText});
    expect(feedbackHeader).toBeInTheDocument();
    expect(feedbackHeader).toHaveTextContent(headingText);

    const textbox = screen.getByPlaceholderText("Write something!")
    expect(textbox).toBeInTheDocument();

    const feedbackBtn = screen.getByTestId("feedbackButton");
    expect(feedbackBtn).toBeInTheDocument()
    expect(feedbackBtn).toHaveTextContent("Send feedback");
  }) 
})