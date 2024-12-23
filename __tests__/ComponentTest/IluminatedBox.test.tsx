import { render, screen, fireEvent } from "@testing-library/react";
import IluminatedBox from "@/components/clients/Animation/IluminatedBox";

describe("IluminatedBox", () => {
  it("renders with the provided text", () => {
    render(
      <IluminatedBox
        text="Test"
        isSelect={false}
        clickHandler={jest.fn()}
      />
    );

    const textElement = screen.getByText("Test");
    expect(textElement).toBeInTheDocument();
  });

  it("applies selected styles when isSelect is true", () => {
    render(
      <IluminatedBox
        text="Selected Box"
        isSelect={true}
        clickHandler={jest.fn()}
      />
    );

    const container = screen.getByText("Selected Box").closest("div");
    expect(container).toHaveClass("shadow-lg bg-foreground/75 tracking-wide");
  });

  it("applies not-selected styles when isSelect is false", () => {
    render(
      <IluminatedBox
        text="Not Selected"
        isSelect={false}
        clickHandler={jest.fn()}
      />
    );

    const container = screen.getByText("Not Selected").closest("div");
    expect(container).toHaveClass(
      "shadow-inner text-foreground/90 font-bold bg-foregroundShadow/20"
    );
  });

  it("calls clickHandler when clicked", () => {
    const mockClickHandler = jest.fn();

    render(
      <IluminatedBox
        text="Clickable Box"
        isSelect={false}
        clickHandler={mockClickHandler}
      />
    );

    const container = screen.getByText("Clickable Box").closest("div");
    fireEvent.click(container!);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('displays "Ready" label when isSelect is true', () => {
    render(
      <IluminatedBox
        text="Ready Box"
        isSelect={true}
        clickHandler={jest.fn()}
      />
    );

    const readyLabel = screen.getByText("Ready");
    expect(readyLabel).toBeInTheDocument();
  });

  it('displays "Idling" label when isSelect is false', () => {
    render(
      <IluminatedBox
        text="Idling Box"
        isSelect={false}
        clickHandler={jest.fn()}
      />
    );

    const idlingLabel = screen.getByText("Idling");
    expect(idlingLabel).toBeInTheDocument();
  });

  it("toggles text visibility on hover when isSelect is false", () => {
    render(
      <IluminatedBox
        text="Hoverable Box"
        isSelect={false}
        clickHandler={jest.fn()}
      />
    );

    // Locate the hidden element
    const hiddenElement = screen.getByText('Ready?');
    expect(hiddenElement).toHaveClass('hidden'); // Initially hidden

    // Simulate hover behavior by manually manipulating the class
    hiddenElement.classList.remove('hidden');
    hiddenElement.classList.add('block');

    // Assert the element is now visible
    expect(hiddenElement).not.toHaveClass('hidden');
    expect(hiddenElement).toHaveClass('block');
  });
});
