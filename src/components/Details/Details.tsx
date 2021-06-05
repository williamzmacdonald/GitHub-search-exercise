import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { selectResult } from '../../store/searchResults/searchResultsSlice';
import { useTypedSelector } from '../../store/store';
import './Details.css'

const Details = (): JSX.Element => {
    // Select our searchResult, if that fails display an error
    const searchResult = useTypedSelector((state) => selectResult(state));

    if (!searchResult) {
        return <h1>Whoops, nothing selected!</h1>
    }

    return (
        <div className='details'>
            <TableContainer component={Paper} className='tableContainer'>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Description</TableCell>
                            <TableCell align='right'>Stars</TableCell>
                            <TableCell align='right'>Language</TableCell>
                            <TableCell align='right'>Owner Name</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{searchResult.name}</TableCell>
                            <TableCell align='right'>{searchResult.description}</TableCell>
                            <TableCell align='right'>{searchResult.stargazers_count}</TableCell>
                            <TableCell align='right'>{searchResult.language}</TableCell>
                            <TableCell align='right'>{searchResult.owner.login}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Details;