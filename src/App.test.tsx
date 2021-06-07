import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { RenderWithProvider } from './test-utils/RenderWithProvider';
import { history, URLs } from './history';
import { RenderWithRouter } from './test-utils/RenderWithRouter';

const url = 'https://api.github.com/search/repositories';

// Our mock server response to be used
const mockResponse = {
    'items': [
        {
            'id': 304681897,
            'name': 'dungeon-hud',
            'full_name': 'Fresh-Mints/dungeon-hud',
            'owner': {
                'login': 'Fresh-Mints',
            },
            'html_url': 'https://github.com/Fresh-Mints/dungeon-hud',
            'description': 'This is a dungeon hud',
            'stargazers_count': 1,
            'language': 'TypeScript',
        }
    ]
};

const server = setupServer(
    // Intercepted request
    rest.get(url, (_, res, ctx) => {
        // mocked JSON response
        return res(ctx.json(mockResponse));
    })
);

// setup API mocks before any tests run
beforeAll(() => server.listen());

// rerender, while wrapping 
beforeEach(() => {
    history.push(URLs.base);
});

// reset any request handlers that were set after each test
afterEach(() => server.resetHandlers());

// close the server when done
afterAll(() => server.close());

const renderApp = () => render(RenderWithProvider(RenderWithRouter(<App />)));

test('submitting our form should load results that route us to the details screen', async () => {
    renderApp();
    // Search for 'dungeon-hud'
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'dungeon-hud' } });
    // With a langue filter of 'TypeScript'
    fireEvent.change(screen.getByLabelText('Language Filter'), { target: { value: 'TypeScript' } });
    // And a sort value of 'stars'
    fireEvent.mouseDown(screen.getByTestId('sortBy'));
    const stars = await waitFor(() => screen.getByText(/stars/i));
    fireEvent.click(stars);
    // Submit our query
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    // We should then find our query result within the grid
    const repoNameCell = await waitFor(() => within(screen.getByRole('grid')).findByText('dungeon-hud'));
    expect(repoNameCell).toBeInTheDocument();
    // It should route to details when clicked
    fireEvent.click(repoNameCell);
    await waitFor(() => expect(history.location.pathname).toBe(URLs.details));
    await waitFor(() => expect(screen.getByText(/This is a dungeon hud/i)).toBeInTheDocument());
});

test('handles server error', async () => {
    renderApp();
    server.use(
        // override the request handler to return a 500 Server Error
        rest.get(url, (_, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({ error: { message: 'Error!' } }),
            );
        })
    );

    // Submit our query
    fireEvent.click(await waitFor(() => screen.getByRole('button', { name: /submit/i })));

    // We should then display an error message
    const error = await waitFor(() => screen.getByRole('alert'));
    expect(error).toBeInTheDocument();
});
