import React, { useState } from 'react';
import { Button, CircularProgress, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchSearchResults, selectLoading } from '../store/searchResultsSlice'
import SearchResults from './SearchResults';
import './Search.css';
import { useTypedSelector } from '../store/store';

const languages = ['JavaScript', 'TypeScript', 'Java'];

const Search = (): JSX.Element => {
    const [searchText, setSearchText] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [sortBy, setSortBy] = useState('');

    const dispatch = useDispatch();
    const searchStatus = useTypedSelector((state) => selectLoading(state));

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        let queryString = searchText;
        if (languageFilter) {
            queryString += ` language:${languageFilter}`;
        }
        if (sortBy) {
            queryString += ` sort:${sortBy}`
        }
        dispatch(fetchSearchResults(queryString));
    };

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLanguageFilter(event.target.value as string);
    };

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortBy(event.target.value as string);
    };

    const menuItems = languages.map(language => (
        <MenuItem value={language} key={language}>{language}</MenuItem>
    ));
    menuItems.push(<MenuItem value='' key='none'>None</MenuItem>);

    return (
        <div className='searchContainer'>
            <form onSubmit={submitHandler} className='searchForm'>
                <TextField
                    label='Search'
                    name='search'
                    value={searchText}
                    onChange={handleSearchTextChange}
                />
                <div>
                    <InputLabel id='languageSelectLabel'>Language Filter</InputLabel>
                    <Select
                        labelId='languageSelectLabel'
                        id='languageSelect'
                        value={languageFilter}
                        onChange={handleLanguageChange}
                        displayEmpty
                    >
                        {menuItems}
                    </Select>
                </div>
                <div>
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
                <Button type='submit'>Submit</Button>
            </form>
            {searchStatus === 'idle' ? <SearchResults /> :
            <div className='progress'>
                <CircularProgress size={100} />
            </div>}
        </div>
    );
}

export default Search;