import { render, screen, renderHook } from '@testing-library/react';
import { useSessionContext, SessionProvider } from '@/hooks/context/useSessionContext';
import { act } from 'react';

describe('useSessionContext', () => {
    it('throws an error when used outside SessionProvider', () => {
        try {
            const { result } = renderHook(() => useSessionContext());

            expect(result.current).toEqual(
                undefined
            );
        } catch (ex) {
            expect(ex).toEqual(new Error("useLoading must be used within an LoadingProvider"));
        }

    });
});
describe('SessionProvider', () => {
    // Helper component to test the context
    const TestComponent = () => {
        const {
            name,
            rules,
            id,
            question,
            time,
            setName,
            setRules,
            setId,
            setQuestion,
            setTime,
            reset,
        } = useSessionContext();

        return (
            <div>
                <p data-testid="name">{name}</p>
                <p data-testid="rules">{JSON.stringify(rules)}</p>
                <p data-testid="id">{id}</p>
                <p data-testid="question">{question}</p>
                <p data-testid="time">{time}</p>
                <button
                    data-testid="setName"
                    onClick={() => setName('UpdatedName')}
                >
                    Set Name
                </button>
                <button
                    data-testid="reset"
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        );
    };

    it('provides default values', () => {
        render(
            <SessionProvider>
                <TestComponent />
            </SessionProvider>
        );

        expect(screen.getByTestId('name').textContent).toBe('FooBoo');
        expect(screen.getByTestId('rules').textContent).toBe('[]');
        expect(screen.getByTestId('id').textContent).toBe('');
        expect(screen.getByTestId('question').textContent).toBe('-1');
        expect(screen.getByTestId('time').textContent).toBe('-1');
    });

    it('updates values via context setters', () => {
        render(
            <SessionProvider>
                <TestComponent />
            </SessionProvider>
        );

        const nameElement = screen.getByTestId('name');
        const setNameButton = screen.getByTestId('setName');

        expect(nameElement.textContent).toBe('FooBoo');

        act(() => {
            setNameButton.click();
        });

        expect(nameElement.textContent).toBe('UpdatedName');
    });

    it('resets values to defaults', () => {
        render(
            <SessionProvider>
                <TestComponent />
            </SessionProvider>
        );

        const nameElement = screen.getByTestId('name');
        const setNameButton = screen.getByTestId('setName');
        const resetButton = screen.getByTestId('reset');

        // Update name
        act(() => {
            setNameButton.click();
        });
        expect(nameElement.textContent).toBe('UpdatedName');

        // Reset values
        act(() => {
            resetButton.click();
        });
        expect(nameElement.textContent).toBe('FooBoo');
    });
});
