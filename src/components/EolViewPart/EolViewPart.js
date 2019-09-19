import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: '.9em',
    },
}))(TableCell);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    cell: {
        border: '1px solid black',
    },
    rightbottom: {
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
    },
    leftbottom: {
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
    },
    bottom: {
        borderBottom: '1px solid black',
    },
});

class EolViewPart extends Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow>
                    <CustomTableCell className={classes.rightbottom}>{this.props.part.number}</CustomTableCell>
                    <CustomTableCell className={classes.bottom}>{this.props.part.name}</CustomTableCell>
                    <CustomTableCell className={classes.leftbottom}>{this.props.part.description}</CustomTableCell>
                    <CustomTableCell className={classes.leftbottom}>{this.props.part.replacement_number}</CustomTableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(EolViewPart));
