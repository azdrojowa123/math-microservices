import {ChangeEvent, useState} from "react";
import {
    Box,
    Button,
    Grid,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

const useStyles = makeStyles(theme => ({
    button: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #239890 30%, #47EEE3 90%)',
        color: '#1a0000',
        '&:hover': {
            backgroundColor: '#A8AEAE',
        },
        marginTop: '10px',
        marginBottom: '10px',
        width: '20vh',
        height: '5vh'
    }
}));

export function CsvReader() {
    const [csvFile, setCsvFile] = useState<File>();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCsvFile(event.target.files?.[0])
        setDisableSubmit(false);
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target?.result as string;
            processCSV(text);
        }
        if (file != undefined) {
            reader.readAsText(file);
        }
    }

    const processCSV = (str: string, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\r\n')).split(delim);
        const rows = str.slice(str.indexOf('\r\n') + 2).split('\r\n').slice(0, -1);
        const newArray = rows.map((row: any) => {
            const values = row.split(delim);
            if (values.length !== 0) {
                const singleObject: any = {}
                headers.forEach((value: string, index: number) => {
                    singleObject[value] = values[index]
                })
                return singleObject
            }
        })
        console.log(newArray)
    }

    return (
        <>
            <Grid container direction={"row"} spacing={10}>
                <Grid item>
                    <Box borderRadius={8}>
                        <Typography variant="h1" component="div">
                            Wymagania dotyczące importowania pliku CSV
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Pierwsza kolumna w pliku odpowiada czasowi odbytej próby"/>
                                <ListItemIcon>
                                    <KeyboardArrowRightSharpIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Druga kolumna, przyjmuje wartość 0 lub 1 w zależności czy próba jest ucięta(0)/zakończona powodzeniem(0)/zakończona niepowodzeniem(1)"/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
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
                    <Button className={classes.button}
                            disabled={disableSubmit}
                            onClick={submit}>
                        Załaduj dane z pliku CSV
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}