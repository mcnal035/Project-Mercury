import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import './SearchListItem.css';

const styles = theme => ({
    tableCell1: {
        textAlign: 'left',
        width: '15%',
    },
    tableCell2: {
        textAlign: 'left',
        width: '10%',
    },
    tableCell3: {
        textAlign: 'left',
        width: '25%',
    },
    tableCell4: {
        textAlign: 'left',
        width: '60%',
        padding: '1%',
        
    },
});

class SearchListItem extends Component {
   
    // function creates a clickable event for the pcn document to be opened.
    goToLink = (type) => {
        this.props.history.push(`/${type}-view/${type}/${this.props.item.id}`)
    }

    render() {
        // removes html tags to show the description.
        let html = this.props.item.description;
        console.log(html);
        let div = document.createElement("div");
        div.innerHTML = html;
        console.log(div.textContent);

        const { classes } = this.props;
        return (
            <>
                <TableRow className="tc" align="center" style={{height: 10}} onClick={() => this.goToLink(this.props.item.type)}>
                    <TableCell className={classes.tableCell1}>{this.props.item.id}</TableCell>
                    <TableCell className={classes.tableCell2}>{this.props.item.type}</TableCell>
                    <TableCell className={classes.tableCell3}>{moment(this.props.item.date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell className={classes.tableCell4}>{div.textContent.substr(0, 95)}</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore

});

export default withStyles(styles)(connect(mapStateToProps)(SearchListItem)); 