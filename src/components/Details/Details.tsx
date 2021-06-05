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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{searchResult.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{searchResult.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Stars</TableCell>
                            <TableCell>{searchResult.stargazers_count}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell>{searchResult.language}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Owner Name</TableCell>
                            <TableCell>{searchResult.owner.login}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Details;