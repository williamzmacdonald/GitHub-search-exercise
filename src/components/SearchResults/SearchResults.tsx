import { CircularProgress } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { select, selectError, selectLoading, selectResults } from '../../store/searchResults/searchResultsSlice';
import { useTypedSelector } from '../../store/store';
import './SearchResults.css';

const Star = () => <StarBorderIcon />;

const columns: GridColDef[] = [
    {field: 'repoName', headerName: 'Repository Name', flex: 1},
    {
        field: 'stars',
        flex: .5,
        renderHeader: Star,
    },
    {field: 'language', headerName: 'Language', flex: .75},
];

const SearchResults = (): JSX.Element => {
    const history = useHistory();
    const searchResults = useTypedSelector((state) => selectResults(state));
    const error = useTypedSelector((state) => selectError(state));
    const searchStatus = useTypedSelector((state) => selectLoading(state));

    const dispatch = useDispatch();
    
    // Build our data grid rows using our search results
    const rows = searchResults.map(result => ({
        id: result.id,
        repoName: result.name,
        stars: result.stargazers_count,
        language: result.language,
    }));
    
    // Select the row's id, then navigate to the details page
    const rowClickHandler = (param: GridRowParams) => {
        dispatch(select(param.id as number));
        history.push('/details');
    };

    if (searchStatus === 'loading') {
        return (
            <div className='progress'>
                <CircularProgress size={100} />
            </div>
        );
    }

    return (
        <div className='searchResults'>
            {error ? <p className='error'>Failed to fetch repositories: {error}</p> : null}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={30}
                autoHeight
                onRowClick={rowClickHandler}
            />
        </div>
        
    );
}

export default SearchResults;