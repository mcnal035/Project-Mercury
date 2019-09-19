import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminDashboard.css';
import AdminDashboardList from '../AdminDashboardList/AdminDashboardList';
import Nav from '../Nav/Nav';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    table: {
        width: '100%',
        margin: 'auto',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '2px',
    },
    tableDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width:'50%',
        height: '500px',
        borderWidth: '50px',
        marginBottom: '65px',
    },
    tableCell: {
        color: 'white',
        textAlign: 'left',
        width: '35%',
        backgroundColor: '#666F99',
    },
    welcome: {
        backgroundColor: '#666F99',
        marginTop: 0,
    },
    welcomeText: {
        color: 'white',
        marginTop: 0,
        textAlign: 'right',
        fontWeight: 'lighter',
        marginRight: '1%'
    },
    position:{
        position: 'sticky',
    top: 0,
    backgroundColor: '#C7CAD9',
    paddingBottom: '1%',
    
    }
})

class AdminDashboard extends Component {
    // Set state to 'empty' so on page load no buttons will be highlighted
    // Once a filter button is clicked, state will be updated
    state = {
        status: 'empty'
    }
    // Fetch PCNs for admin on page load
    // Send payload to fetchAdminDashboardSaga
    componentDidMount() {
        const data = {
            status: ''
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data })
    }
    // Conditionally rendering if the button will be highlighted in light blue or else
    // Once button is clicked, handlePending() will run
    ifPending() {
        if(this.state.status == 'PENDING'){
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                backgroundColor: '#D6E4FF',
                fontSize: '10px'}} onClick={() => this.handlePending()}>Pending</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                backgroundColor: '#E5E7EE',
                fontSize: '10px'}} onClick={() => this.handlePending()}>Pending</Button>;
        }
    }
    // Conditionally rendering if the button will be highlighted in light blue or else
    // Once button is clicked, handlePublished() will run
    ifPublished() {
        if (this.state.status == 'PUBLISHED') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handlePublished()}>Published</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#E5E7EE',
            }} onClick={() => this.handlePublished()}>Published</Button>;
        }
    }
    // Conditionally rendering if the button will be highlighted in light blue or else
    // Once button is clicked, handleIncomplete() will run
    ifIncomplete() {
        if (this.state.status == 'INCOMPLETE') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleIncomplete()}>Incomplete</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#E5E7EE',
            }} onClick={() => this.handleIncomplete()}>Incomplete</Button>;
        }
    }
    // Conditionally rendering if the button will be highlighted in light blue or else
    // Once button is clicked, handleDenied() will run
    ifDenied() {
        if (this.state.status == 'DENIED') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleDenied()}>Denied</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#E5E7EE',
            }} onClick={() => this.handleDenied()}>Denied</Button>;
        }
    }
    // Conditionally rendering if the button will be highlighted in light blue or else
    // Once button is clicked, handleAll() will run
    ifAll() {
        if (this.state.status == '') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleAll()}>All</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#E5E7EE',
            }} onClick={() => this.handleAll()}>All</Button>;
        }
    }
    // Set state to 'PENDING' so only pending PCNs will be shown
    // Dispatch will send payload to get only PCNs that are 'PENDING'
    handlePending() {
        this.setState({status: 'PENDING'});
        const data = {
            status: 'PENDING'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }
    // Set state to 'PUBLISHED' so only published PCNs will be shown
    // Dispatch will send payload to get only PCNs that are 'PUBLISHED'
    handlePublished() {
        this.setState({ status: 'PUBLISHED' });
        const data = {
            status: 'PUBLISHED'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }
    // Set state to 'INCOMPLETE' so only incomplete PCNs will be shown
    // Dispatch will send payload to get only PCNs that are 'INCOMPLETE'
    handleIncomplete() {
        this.setState({ status: 'INCOMPLETE' });
        const data = {
            status: 'INCOMPLETE'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }
    // Set state to 'DENIED' so only denied PCNs will be shown
    // Dispatch will send payload to get only PCNs that are 'DENIED'
    handleDenied() {
        this.setState({ status: 'DENIED' });
        const data = {
            status: 'DENIED'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }
    // Set state to empty string so all PCNs will be shown
    // Dispatch will send payload to get all PCNs
    handleAll() {
        this.setState({ status: '' });
        const data = {
            status: ''
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <div style={{ zIndex: 1000 }} className={classes.position}>
                <Nav history={this.props.history} />
                <div className={classes.welcome}>
                    <h4 className={classes.welcomeText}>Admin Dashboard</h4>
                </div>
                <p stickyheader="true" className="welcome">Filter: &nbsp;&nbsp;
                    {this.ifPending(this.props.status)}
                    &nbsp;
                    &nbsp;
                    {this.ifPublished(this.props.status)}
                    &nbsp;
                    &nbsp;
                    {this.ifIncomplete(this.props.status)}
                    &nbsp;
                    &nbsp;
                    {this.ifDenied(this.props.status)}
                    &nbsp;
                    &nbsp;
                    {this.ifAll(this.props.status)}
                </p>
                </div>
                <div className={classes.tableDiv}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow component="tr" scope="row" className="header">
                            <TableCell className={classes.tableCell}>PCN - #</TableCell>
                            <TableCell className={classes.tableCell}>Status</TableCell>
                            <TableCell className={classes.tableCell}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxStore.adminDashboard.map(item => <AdminDashboardList key={item.id} item={item} history={this.props.history} />
                        )}
                    </TableBody>
                </Table>
                </div>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(AdminDashboard));
