import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Endpoints } from '@octokit/types';
import { Octokit } from '@octokit/rest';

// The @octokit/types library allows us to build parameter/response data types for the REST API
type searchReposData = Endpoints['GET /search/repositories']['response']['data'];
type searchResults = searchReposData['items'];
type searchResult = searchResults[number];

// Build an octokit object, the official github API library
const octokit = new Octokit();

type LoadingStatus = 'idle' | 'loading';

interface SearchResultsState {
    results: searchResults;
    loading: LoadingStatus;
    error: string | null;
    selected: number | undefined;
}

const initialState: SearchResultsState = {
    results: [],
    loading: 'idle',
    error: null,
    selected: undefined,
}


// Create an async thunk to query our search results, and automatically
// dispatch our fulfilled, pending, and rejected actions
export const fetchSearchResults = createAsyncThunk<
    // Return type
    searchReposData,
    // Input type
    string
>(
    'searchResults/fetchResults',
    async (queryString: string) => {
        const response = await octokit.request('GET /search/repositories', {
            q: queryString,
        });

        return response.data;
    }
);

// Create our searchResults slice
export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<number>) => {
            state.selected = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    // Our extraReducers will handle our fetchSearchResults automatically dispatched actions
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        });
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = action.payload.items;
            state.loading = 'idle';
        });
        builder.addCase(fetchSearchResults.rejected, (state, action) => {
            let errorMessage = 'Something went wrong.';
            if (action.error.message && action.error.message.includes('API rate limit')) {
                errorMessage = 'too many searches!';
            }
            state.error = errorMessage;
            state.results = [];
            state.loading = 'idle';
        });    
    },
})

export const { select, setError } = searchResultsSlice.actions;

/**
 * Returns the searchResults' loading state.
 */
export const selectLoading = (state: RootState): LoadingStatus => state.searchResults.loading;
/**
 * Returns the searchResults' error state.
 */
export const selectError = (state: RootState): string | null => state.searchResults.error;
/**
 * Returns the searchResults.
 */
export const selectResults = (state: RootState): searchResults => state.searchResults.results;
/**
 * Returns the currently selected searchResult.
 */
export const selectResult = (state: RootState): searchResult | undefined => {
    return state.searchResults.results.find(result => result.id === state.searchResults.selected);
};

export default searchResultsSlice.reducer;