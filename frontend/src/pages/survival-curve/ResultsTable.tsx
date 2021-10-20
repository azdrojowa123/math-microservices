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
                            <TableCell align="right">Period number</TableCell>
                            <TableCell align="right">Number of observations</TableCell>
                            <TableCell align="right">Number of failures</TableCell>
                            <TableCell align="right">Survival probability</TableCell>
                            <TableCell align="right">Kaplan-Meier estimator</TableCell>
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