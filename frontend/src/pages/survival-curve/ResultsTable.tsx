import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import * as React from "react";

interface resultsTableI {
    data: any[]
}


export function ResultsTable(props: resultsTableI){
    return(
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Numer okresu</TableCell>
                            <TableCell align="right">Ilość obserwacji</TableCell>
                            <TableCell align="right">Ilość niepowodzeń</TableCell>
                            <TableCell align="right">Prawdopodobieństwo przeżycia</TableCell>
                            <TableCell align="right">Estymator Kaplana-Meiera</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row) => (
                            <TableRow key={row.periodNumber}>
                                <TableCell component="th" scope="row">{row.periodNumber}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.failures}</TableCell>
                                <TableCell align="right">{row.survivalProbability}</TableCell>
                                <TableCell align="right">{row.estimatorKM}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}