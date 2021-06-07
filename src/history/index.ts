import { createBrowserHistory, createMemoryHistory } from 'history';

const isTest = process.env.NODE_ENV === 'test';

export const URLs = {
    base: '/GitHub-search-exercise',
    details: '/GitHub-search-exercise/details',
};

export const history = isTest
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();