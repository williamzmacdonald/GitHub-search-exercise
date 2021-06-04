import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Endpoints } from '@octokit/types';
import { Octokit } from '@octokit/rest';

type searchReposResponse = Endpoints['GET /search/repositories']['response'];
type searchResults = searchReposResponse['data']['items'];

const octokit = new Octokit();

type LoadingStatus = 'idle' | 'loading';

// Define a type for the searchResults state
interface SearchResultsState {
    results: searchResults;
    loading: LoadingStatus;
    error: string | null;
}

// Define the initial state
const initialState: SearchResultsState = {
    results: [],
    loading: 'idle',
    error: null,
}

// Create an async thunk to handle fetching search results and setting our 'loading' and 'error state
export const fetchSearchResults = createAsyncThunk<
    searchReposResponse['data'],
    string,
    { rejectValue: string | null }
>(
    'searchResults/fetchResults',
    async (queryString: string, thunkAPI) => {
        const results = await octokit.request('GET /search/repositories', {
            q: queryString,
        });
        if (results.status !== 200) {
            return thunkAPI.rejectWithValue('Failed to fetch repositories.')
        }
        return results.data;
    }
);

// Create our searchResults slice
export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = action.payload.items;
            state.loading = 'idle';
        });
        builder.addCase(fetchSearchResults.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.loading = 'idle';
        });    
    },
})

// Export our state selectors
export const selectLoading = (state: RootState): LoadingStatus => state.searchResults.loading;
export const selectError = (state: RootState): string | null => state.searchResults.error;
export const selectResults = (state: RootState): searchResults => state.searchResults.results;

export default searchResultsSlice.reducer