import { TextField } from '@material-ui/core';
import React from 'react';

const Search = (): JSX.Element => {
    const submitHandler = (e: React.FormEvent) => {
        // fetch some stuff
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        console.log(target.search.value);
    };

    return (
        <form onSubmit={submitHandler}>
            <TextField label='Search' name='search'/>
        </form>
    );
}

export default Search;