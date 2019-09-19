import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PmDashboardList.css';
import moment from 'moment';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    table: {
        width: '50%',
        marginLeft: '25%',
    },
    delete: {
        margin: theme.spacing.unit,
        fontSize: 32,
        color: '#BF0000',
    },
    edit: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    tableCell: {
        textAlign: 'left',
        width: '25%',
        height: '30px',
        minWidth: '92px'
    },
    tableCell4: {
        textAlign: 'right',
        width: '25%',
        padding: '0px',
        height: '30px',
        minWidth: '128px',
    }
});

class PmDashboardList extends Component {
    // When run, user will be brought to the view of the PCN that has been clicked on
    handleClick = () => {
        this.props.history.push(`/${this.props.item.type}-view/${this.props.item.type}/${this.props.item.id}`);
    }
    // Sends the PCN id, type, status, and user id (of the PCN that is to be deleted) to the deletePcnSaga
    // All of the data has to be sent to deletePcnSaga in order for that PCN to be deleted
    deletePcn = () => {
        const data = {
            id: this.props.item.id,
            type: this.props.item.type,
            status: '',
            userId: this.props.reduxStore.user.id
        }
        this.props.dispatch({ type: 'DELETE_PCN', payload: data })
    }
    // Checks if status is 'PUBLISHED' or else
    // If status is 'PUBLISHED', that PCN will not have an edit or a delete icon
    // If status is not 'PUBLISHED', that PCN will have an edit icon and a delete icon
    checkStatus = () => {
        const { classes } = this.props;
        if (this.props.item.status === 'PUBLISHED') {
            return (<></>)
        }
        else {
            return (<><Button  onClick={() => this.props.history.push(`/${this.props.item.type.toLowerCase()}-form/${this.props.item.id}`)}>
                    <EditIcon className={classes.edit} /></Button><Button onClick={() => this.deletePcn()}>
                    <DeleteForeverIcon className={classes.delete} /></Button></>)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow className="tc" align="center">
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{this.props.item.id}</TableCell>
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{this.props.item.status}</TableCell>
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{moment(this.props.item.date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell className={classes.tableCell4}>{this.checkStatus(this.props.item)}</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(PmDashboardList));
