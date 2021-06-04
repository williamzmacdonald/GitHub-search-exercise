import React from 'react';
import { Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchSearchResults, selectLoading } from '../store/searchResultsSlice'
import SearchResults from './SearchResults';
import './Search.css';
import { useTypedSelector } from '../store/store';

const Search = (): JSX.Element => {
    const dispatch = useDispatch();
    const searchStatus = useTypedSelector((state) => selectLoading(state)) ;

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        dispatch(fetchSearchResults(target.search.value))
    };

    return (
        <div className='searchContainer'>
            <form onSubmit={submitHandler} className='searchForm'>
                <TextField label='Search' name='search'/>
                {/* <Select /> */}
            </form>
            {searchStatus === 'idle' ? <SearchResults /> : null}
        </div>
    );
}

export default Search;