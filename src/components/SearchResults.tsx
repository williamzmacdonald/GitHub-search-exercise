import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { selectResults } from '../store/searchResultsSlice';
import { useTypedSelector } from '../store/store';

const columns: GridColDef[] = [
    {field: 'repoName', headerName: 'Repository Name', width: 200},
    {field: 'stars', headerName: 'Stars', width: 200},
    {field: 'language', headerName: 'Language', width: 200},
]

const SearchResults = (): JSX.Element => {
    const searchResults = useTypedSelector((state) => selectResults(state)) ;
    const rows = searchResults.map(result => ({
        id: result.id,
        repoName: result.name,
        stars: result.stargazers_count,
        language: result.language,
    }));
    return (
        <DataGrid rows={rows} columns={columns} pageSize={30} />
    );
}

export default SearchResults;