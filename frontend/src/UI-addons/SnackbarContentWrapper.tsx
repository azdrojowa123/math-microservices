import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {Theme, withStyles} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/core";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: theme.palette.success.main
    },
    error: {
        backgroundColor: theme.palette.error.main,
    },
    info: {
        backgroundColor: '#21B8E2',
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
    },
    snackbarWidth: {
        width: '20vw',
        fontSize: 20
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 1,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export interface MySnackbarContentI {
    variant: 'success' | 'warning' | 'error' | 'info',
    onClose: () => void,
    message: string
}

export function SnackbarContentWrapper(props: MySnackbarContentI) {
    const {message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];
    const classes = useStyles();

    return (
        <SnackbarContent
            className={classNames(classes[variant], classes.snackbarWidth)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar">
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}
