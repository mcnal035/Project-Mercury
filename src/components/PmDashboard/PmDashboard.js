import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PmDashboard.css';
import PmDashboardList from '../PmDashboardList/PmDashboardList';
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
    zIndex: 100,
    
  },
  tableDiv: {
    position: 'sticky',
    marginLeft: 'auto',
    marginRight: 'auto',
    width:'50%',
    borderWidth: '50px',
    marginBottom: '65px',
  },
  tableCell: {
    color: 'white',
    textAlign: 'left',
    width: '25%',
    backgroundColor: '#666F99',
  }, 
  tableCell4: {
    color: 'white',
    textAlign: 'right',
    width: '25%',
    backgroundColor: '#666F99',
  },
  welcome: {
    backgroundColor: '#666F99',
    marginTop: 0
  },
  welcomeText: {
    marginTop: 0,
    color: 'white',
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
});

class PmDashboard extends Component {
  // Set state to 'empty' so on page load no buttons will be highlighted
  // Once a filter button is clicked, state will be updated
  state = {
    status: 'empty'
  }
  // Fetch PCNs for Product Manager (PM) on page load
  // Send payload to fetchDashboardSaga
  componentDidMount() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: ''
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }
  // Conditionally rendering if the button will be highlighted in light blue or else
  // Once button is clicked, handlePending() will run
  ifPending() {
    if (this.state.status == 'PENDING') {
      return <Button size="small" variant="outlined" style={{
        textTransform: 'none',
        backgroundColor: '#D6E4FF',
        fontSize: '10px'
      }} onClick={() => this.handlePending()}>Pending</Button>;
    } else {
      return <Button size="small" variant="outlined" style={{
        textTransform: 'none',
        backgroundColor: '#E5E7EE',
        fontSize: '10px',
      }} onClick={() => this.handlePending()}>Pending</Button>;
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
        backgroundColor: '#E5E7EE',
        fontSize: '10px'
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
        backgroundColor: '#E5E7EE',
        fontSize: '10px'
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
        backgroundColor: '#E5E7EE',
        fontSize: '10px'
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
        backgroundColor: '#E5E7EE',
        fontSize: '10px',
      }} onClick={() => this.handleAll()}>All</Button>;
    }
  }
  // Set state to 'PENDING' so only pending PCNs will be shown
  // Dispatch will send payload to get only PCNs that are 'PENDING' and created by the logged-in PM
  handlePending() {
    this.setState({status: 'PENDING'});
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'PENDING'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }
  // Set state to 'PUBLISHED' so only published PCNs will be shown
  // Dispatch will send payload to get only PCNs that are 'PUBLISHED' and created by the logged-in PM
  handlePublished() {
    this.setState({ status: 'PUBLISHED' });
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'PUBLISHED'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }
  // Set state to 'INCOMPLETE' so only incomplete PCNs will be shown
  // Dispatch will send payload to get only PCNs that are 'INCOMPLETE' and created by the logged-in PM
  handleIncomplete() {
    this.setState({ status: 'INCOMPLETE' });
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'INCOMPLETE'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }
  // Set state to 'DENIED' so only denied PCNs will be shown
  // Dispatch will send payload to get only PCNs that are 'DENIED' and created by the logged-in PM
  handleDenied() {
    this.setState({ status: 'DENIED' });
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'DENIED'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }
  // Set state to empty string so all PCNs will be shown
  // Dispatch will send payload to get all PCNs created by the logged-in PM
  handleAll() {
    this.setState({ status: '' });
    const data = {
      userId: this.props.reduxStore.user.id,
      status: ''
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <div style={{ zIndex: 1000 }} className={classes.position}>
        <Nav history={this.props.history} />
        
        <div className={classes.welcome}>
          <h4 className={classes.welcomeText}>Product Manager Dashboard</h4>
        </div>
        <p className="filter">Filter: &nbsp;&nbsp;
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
        <Table  style={{ zIndex: 1000 }} className={classes.table}>
          <TableHead>
            <TableRow style={{ zIndex: 100 }}>
              <TableCell className={classes.tableCell}>PCN - #</TableCell>
              <TableCell className={classes.tableCell}>Status</TableCell>
              <TableCell className={classes.tableCell}>Date</TableCell>
              <TableCell style={{ zIndex: 1 }} className={classes.tableCell4}>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.pmDashboard.map(item => <PmDashboardList key={item.id} item={item} history={this.props.history} />
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

export default withStyles(styles)(connect(mapStateToProps)(PmDashboard));
