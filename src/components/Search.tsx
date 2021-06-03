import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Endpoints } from '@octokit/types';
import { Octokit } from '@octokit/rest';

type listSearchReposParameters = Endpoints['GET /search/repositories']['response'];

const Search = (): JSX.Element => {
    const [searchResults, setSearcResults] = useState<listSearchReposParameters>();
    const octokit = new Octokit();

    const submitHandler = async (e: React.FormEvent) => {
        // fetch some stuff
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        // console.log(target.search.value);
        const results = await octokit.request('GET /search/repositories', {
            q: target.search.value,
        });
        setSearcResults(results);
    };

    const results = searchResults?.data.items.map(repo => (
        <p key={repo.node_id}>{repo.name}</p>
    ));

    return (
        <>
            <form onSubmit={submitHandler}>
                <TextField label='Search' name='search'/>
            </form>
            {results}
        </>
    );
}

export default Search;