import React, { useState } from 'react';
import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../store/searchResults/searchResultsSlice'
import SearchResults from '../SearchResults/SearchResults';
import './Search.css';

const Search = (): JSX.Element => {
    const [searchText, setSearchText] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [sortBy, setSortBy] = useState('');

    const dispatch = useDispatch();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        // Build our query string using our searchText, and optionally add the language filter
        // and sort arguments
        let queryString = searchText;
        if (languageFilter) {
            queryString += ` language:${languageFilter}`;
        }
        if (sortBy) {
            queryString += ` sort:${sortBy}`
        }
        // Dispatch our async thunk, fetchSearchResults
        dispatch(fetchSearchResults(queryString));
    };

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguageFilter(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortBy(event.target.value as string);
    };

    return (
        <div className='searchContainer'>
            <form onSubmit={submitHandler} className='searchForm'>
                <div className='formItem'>
                    <TextField
                        label='Search'
                        name='search'
                        value={searchText}
                        onChange={handleSearchTextChange}
                    />
                </div>
                <div className='formItem'>
                    <TextField
                        label='Language Filter'
                        name='languageFilter'
                        value={languageFilter}
                        onChange={handleLanguageChange}
                    />
                </div>
                <div className='formItem'>
                    <InputLabel id='sortByLabel'>Sort By...</InputLabel>
                    <Select
                        labelId='sortByLabel'
                        id='sortBy'
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value=''>Best Match</MenuItem>
                        <MenuItem value='stars'>Stars</MenuItem>
                    </Select>
                </div>
                <div className='formItem'>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </div>
            </form>
            <div className='resultsContainer'>
                <SearchResults />
            </div>
        </div>
    );
}

export default Search;