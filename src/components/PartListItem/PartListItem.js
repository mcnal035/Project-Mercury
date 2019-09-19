import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchReplacementListItem from '../SearchReplacementListItem/SearchReplacementListItem';

//Material-UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

//Icons
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    partIn: {
        display: 'inline-block',
        width: '55%'
    },
    partSub: {
        float: 'right',
        backgroundColor: '#3D3D5C',
        color: 'white',
        marginTop: '5%'
    },
    search: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflowY: 'auto',
        height: '40%'
    }
})

class PartListItem extends Component {
    state = {
        search: '',
        show: false
    }
    handleDelete = () => {
        this.props.dispatch({type: 'DELETE_PCN_PART', payload: {id: this.props.part.id, pcnId: this.props.pcnId, type: this.props.type}})
    }

    handleChange = (event) => {
        this.setState({search: event.target.value})
    }

    // OPEN MODAL
    handleOpen = (event) => {
        this.setState({show: true})
    }

    // CLOSE MODAL
    handleClose = () => {
        this.setState({show: false})
    }

    handleSearch = (event) => {
        this.props.dispatch({type: 'SEARCH_PARTS', payload: {query: event.target.value}})
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <TableRow>
                <TableCell>{this.props.part.number}</TableCell>
                <TableCell>{this.props.part.name}</TableCell>
                <TableCell>{this.props.part.description}</TableCell>
                {this.props.type === 'eol' ? 
                this.props.part.replacement_number 
                    ? 
                        <TableCell>{this.props.part.replacement_number}</TableCell>
                        :
                        <TableCell>
                            <Button onClick={this.handleOpen} style={{fontSize: '.75em', textTransform: 'none'}}>Add...</Button>
                        </TableCell> 
                    : 
                    <> </>}
                <TableCell><Button onClick={() => this.handleDelete()} color="secondary"><DeleteIcon /></Button></TableCell>
            </TableRow>
            <Modal
                open={this.state.show}
                onClose={this.handleClose}>
                <div style={{top: '10%', left: '35%'}} className={classes.search}>
                    <TextField onChange={(event) => this.handleSearch(event)} label="Search" />
                    <Table>
                        <TableHead>
                            <TableCell>Part Number</TableCell>
                            <TableCell>Part Name</TableCell> 
                            <TableCell>Part Description</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxStore.searchPartReducer ?
                            this.props.reduxStore.searchPartReducer.map(part => <SearchReplacementListItem partId={this.props.part.id} pcnId={this.props.pcnId} part={part} /> ) 
                            :
                            <></>
                            }
                        </TableBody>
                    </Table>
                </div>
            </Modal>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(PartListItem));