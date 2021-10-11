import {ChangeEvent, useState} from "react";
import {Button, Grid, Input} from "@material-ui/core";


export function CsvReader() {
    const [csvFile, setCsvFile] = useState<File>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCsvFile(event.target.files?.[0])
    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <Input
                        type='file'
                        inputProps={{accept: '.csv'}}
                        id='csvFile'
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <Button>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}