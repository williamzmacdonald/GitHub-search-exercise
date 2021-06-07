import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import searchResultsReducer from './searchResults/searchResultsSlice';

export const store = configureStore({
    reducer: {
      searchResults: searchResultsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {searchResults: SearchResults}
export type AppDispatch = typeof store.dispatch;

/**
 * Exports the 'useSelector' hook with react-redux's TypedUseSelectorHook for simple reuse.
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;