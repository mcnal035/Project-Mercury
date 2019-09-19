import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    table: {
        width: '50%',
        marginLeft: '25%'
    },
    tableCell: {
        textAlign: 'left',
        width: '35%',
    },
})

class AdminDashboardList extends Component {
    // When run, user will be brought to the view of the PCN that has been clicked on
    handleClick = () => {
        this.props.history.push(`/${this.props.item.type}-view/${this.props.item.type}/${this.props.item.id}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow className="tc" align="center" onClick={() => this.handleClick()}>
                    <TableCell className={classes.tableCell}>{this.props.item.id}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.item.status}</TableCell>
                    <TableCell className={classes.tableCell}>{moment(this.props.item.date).format('MM/DD/YYYY')}</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(AdminDashboardList));
