import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    searchRow: {
        '&:hover': {
            backgroundColor: '#e0e0e0',
            border: '1px',
            borderStyle: 'solid',
            cursor: 'pointer'
        }
    }
})

class SearchReplacementListItem extends Component {
    handleAddReplacement = event => {
        this.props.dispatch({ type: 'ADD_REPLACEMENT', payload: { id: this.props.pcnId, type: 'eol', replacement_id: this.props.part.id, part_number: this.props.partId}})
    }

    render(){
        const {classes} = this.props;
        return(
            <>  
                <TableRow className={classes.searchRow} onClick={(event) => this.handleAddReplacement(event)}>
                    <TableCell>{this.props.part.number}</TableCell>
                    <TableCell>{this.props.part.name}</TableCell>
                    <TableCell>{this.props.part.description}</TableCell>
                </TableRow>
            </>
        )
    }
}

export default withStyles(styles)(connect()(SearchReplacementListItem));