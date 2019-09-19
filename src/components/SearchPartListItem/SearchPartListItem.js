import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material-UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    searchItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            border: '1px',
            borderStyle: 'solid'
        }
    }
})

class SearchPartListItem extends Component {
    handleAddPart = () => {
        console.log(this.props.part)
        if(this.props.type === 'PCN'){
            this.props.dispatch({type: 'ADD_PART', payload: {partId: this.props.part.id, id: this.props.pcnNumber, type: 'pcn'}});
        } else if(this.props.type === 'EOL'){
            this.props.dispatch({ type: 'ADD_PART', payload: { partId: this.props.part.id, id: this.props.eolNumber, type: 'eol' } });
        } else if(this.props.type === 'NPI'){
            this.props.dispatch({type: 'ADD_PART', payload: {partId: this.props.part.id, id: this.props.npiNumber, type:'npi'} });
        }
    }

    render(){
        const {classes} = this.props;
        console.log(this.props.part);
        return(
            <>

            <TableRow className={classes.searchItem} divider onClick={(event) => this.handleAddPart(event)}>
                <TableCell>{this.props.part.number}</TableCell>
                <TableCell> {this.props.part.name}</TableCell>
                <TableCell>{this.props.part.description}</TableCell>
            </TableRow>
            </>
        )
    }
}

export default withStyles(styles)(connect()(SearchPartListItem));