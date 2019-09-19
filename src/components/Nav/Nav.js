import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import MessageList from '../MessageList/MessageList';
import './Nav.css';


//Material-UI Icons
import UserIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Build';
import MessageIcon from '@material-ui/icons/Message';

//Material-UI
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  settingsBtn: {
    marginLeft: 'auto',
    color: 'white',
    paddingRight: '0%',
    paddingLeft: '0%',
    display: 'inline-block',
    paddingTop: '5.5%',
  },
  paper: {
    marginLeft: 'auto',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  input: {
    width: '100%',
    margin: 'auto'
  },
  passBtn: {
    marginTop: '5%',
    marginLeft: '40%'
  },
  settingsBtnAdmin: {
    marginLeft: 'auto',
    color: 'white',
    paddingRight: '0%',
    paddingLeft: '0%',
    display: 'inline-block',
    paddingTop: '8.5%',
  },
  textField: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    overFlow: "auto",
  },
})

function getModalStyle() {
  const top = 0;
  const left = 0;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
    textAlign: 'center',
  };

}


class Nav extends Component{
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email:'',
    access: 0,
    open: null,
    show: false,
    window: false,
    showCreate: null,
		showMessage: false,
		messages: 'new'
  }


  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          access: this.state.access,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
    this.setState({
      window: false
    })
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.reduxStore.createPcnReducer !== prevProps.reduxStore.createPcnReducer){
      this.props.history.push(`/pcn-form/${this.props.reduxStore.createPcnReducer[0].id}`)
    } else if (this.props.reduxStore.createEolReducer !== prevProps.reduxStore.createEolReducer){
      this.props.history.push(`/eol-form/${this.props.reduxStore.createEolReducer[0].id}`)
    } else if (this.props.reduxStore.createNpiReducer !== prevProps.reduxStore.createNpiReducer){
      this.props.history.push(`/npi-form/${this.props.reduxStore.createNpiReducer[0].id}`)
    }
  }

  handleOpenSettings = event => {
    this.setState({open: event.currentTarget})
  }

  handleClose = () => {
    this.setState({open: null})
  }

  handleOpenCreateUser = (event) =>{
    this.setState({
      window: true
    })
  }
  handleCloseCreateUser = () =>{
    this.setState({
      window: false
    })
  }

  handleOpenChangePassword = () => {
    this.setState({
      show: true
    })
  }

  handleCloseChangePassword = () => {
    this.setState({
      show: false
    })
  }

  handleSubmitNewPassword = event => {
    event.preventDefault();
    this.setState({show: false})
  }

  handleChange = (event, propToChange) => {
    this.setState({newPassword: {...this.state.newPassword, [propToChange]: event.target.value}})
  }

  handleOpenCreate = (event) => {
    this.setState({showCreate: event.currentTarget})
  }

  handleCloseCreate = (event) => {
    this.setState({showCreate: null})
  }

  handleOpenMessages = (event) => {
		const data = {
			userId: this.props.reduxStore.user.id,
		}
		this.props.dispatch({ type: 'FETCH_MESSAGES', payload: data });
		this.props.dispatch({ type: 'FETCH_UNREAD_MESSAGES', payload: data })
    this.setState({ showMessage: true })
  }

  handleOpenDashboard = (event) => {
    this.props.history.push('/dashboard');
  }

  handleOpenSearch = (event) => {
    this.props.history.push('/search');
  }

  handleCloseMessages = (event) => {
    this.setState({ showMessage: false })
  }

  handlePcn = () => {
    this.props.dispatch({type: 'CREATE_PCN', payload: {type: 'pcn'}})
  }

  handleEol = () => {
    this.props.dispatch({type: 'CREATE_EOL', payload: {type: 'eol'}})
  }

  handleNpi = () => {
    this.props.dispatch({type: 'CREATE_NPI', payload: {type: 'npi'}})
	}

  // Function to check user messages and render them
	checkMessages = () => {
		if( this.state.messages === 'new' ){
			if( this.props.reduxStore.unreadMessages.length === 0 ){
				return (<>
					<Button size="small" variant='contained' color='primary' onClick={() => this.setState({ messages: 'new' })}>Unread</Button>
					<Button size="small" onClick={() => this.setState({ messages: 'all' })}>All</Button>
					<div>
						<p>No unread Messages</p>
					</div>
				</>)
			}
			else{
				return(
					<>
					<Button size="small" variant='contained' color='primary' onClick={() => this.setState({ messages: 'new' })}>Unread</Button>
					<Button size="small" onClick={() => this.setState({ messages: 'all' })}>All</Button>
					<div>
						{this.props.reduxStore.unreadMessages.map((message, i) => {
							return (<MessageList history={this.props.history} message={message} key={i} type='unread' />);
						})}
					</div>
					</>
				)
			}
		}
		else if (this.state.messages === 'all') {
			return (
				<>
					<Button size="small" onClick={() => this.setState({ messages: 'new' })}>Unread</Button>
					<Button size="small" variant='contained' color='primary' onClick={() => this.setState({ messages: 'all' })}>All</Button>
					<div>
						{this.props.reduxStore.messages.map((message, i) => {
							return (<MessageList history={this.props.history} message={message} key={i} type='read' />);
						})}
					</div>
				</>
			)
		}
	}

  render(){
    const {classes} = this.props;
    return(
      <div className="nav">
        <Link to="/dashboard">
          <h2 className="nav-title">Project Mercury</h2>
        </Link>
        <div className="nav-right">
          {!this.props.user.id ?
          <Link className={classes.settingsBtn} to="/dashboard">Login</Link> : <></>}
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.user.id && (
            <>
              <Tooltip title="Settings"> 
                <Button onClick={event => this.handleOpenSettings(event)}size="small" className={this.props.user.admin === 2 ? classes.settingsBtnAdmin : classes.settingsBtn}>
                  <SettingsIcon />
                </Button>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={this.state.open}
                open={Boolean(this.state.open)}
                onClose={this.handleClose}>
                  <MenuItem onClick={this.handleOpenChangePassword}>Change Password</MenuItem>
                 {this.props.user.admin === 2 &&( <MenuItem onClick={this.handleOpenCreateUser}>Create User</MenuItem>)}
              </Menu>
              <Modal
              open={this.state.show}
              onClose={this.handleCloseChangePassword}>
                <div className={classes.paper} style={{top: '20%', left: '35%'}}>
                  <Typography style={{textAlign: 'center'}}>Change Password</Typography>
                  <form onSubmit={event => this.handleSubmitNewPassword(event)}>
                    <TextField className={classes.input} type="password" onChange={event => this.handleChange(event, 'currentPassword')} label="Current Password" />
                    <br />
                    <TextField className={classes.input} type="password" onChange={event => this.handleChange(event, 'newPassword')} label="New Password" />
                    <br />
                    <TextField className={classes.input} type="password" onChange={event => this.handleChange(event, 'reenterPassword')} label="Re-enter New Password" />
                    <br />
                    <Button variant="contained" className={classes.passBtn} type="submit">Submit</Button>
                  </form>
                </div>
              </Modal>
              <Modal open={this.state.window}
              onClose={this.handleCloseCreateUser}>
                <div className={classes.paper} style={{top: '20%', left: '35%'}}>
                  <Typography style={{textAlign: 'center'}}>Register New User</Typography>
                  <div>
                      {this.props.errors.registrationMessage && (
                        <h2
                          className="alert"
                          role="alert"
                        >
                          {this.props.errors.registrationMessage}
                        </h2>
                      )}
                      <form onSubmit={this.registerUser} >
                      <div> 
                            <TextField className={classes.input} 
                              type="firstName"
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.handleInputChangeFor('firstName')}
                              label="First Name"
                            />
                        </div>
                        <br/>
                      <div> 
                            <TextField className={classes.input} 
                              type="lastName"
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.handleInputChangeFor('lastName')}
                              label="Last Name"
                            />
                          </div>
                          <br/>
                        <div>
                            <TextField className={classes.input} 
                              type="text"
                              name="username"
                              value={this.state.username}
                              onChange={this.handleInputChangeFor('username')}
                              label="User Name"
                            />
                        </div>
                        <br/>
                        <div> 
                            <TextField className={classes.input} 
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleInputChangeFor('password')}
                              label="Password"
                            />
                          <div/>
                          
                          <div>
                            <TextField className={classes.input} 
                              type="email"
                              name="Email"
                              value={this.state.email}
                              onChange={this.handleInputChangeFor('email')}
                              label="Email"
                            />
                          </div>
                          <br/>
                          <div>
                            <Select  className={classes.textField} value={this.state.access}  onChange={this.handleInputChangeFor('access')}  
                                  inputProps={{name: 'none',}}>
                                  <MenuItem value={"0"}>Select Access Level</MenuItem>
                                  <MenuItem value={"1"}>Level 1 - Product Manager</MenuItem>
                                  <MenuItem value={"2"}>Level 2 - Admin</MenuItem>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Button
                            className="register"
                            type="submit"
                          >
                            Register
                          </Button>
                        </div>
                      </form>
                    </div>
                </div>
             
              </Modal>
              <Tooltip title="Dashboard">
                <Button onClick={event => this.handleOpenDashboard(event)} size="small" className={this.props.user.admin === 2 ? classes.settingsBtnAdmin : classes.settingsBtn}>
                  <UserIcon />
                </Button>
              </Tooltip>
            </>
          )}
          {/* Always show this link since the about page is not protected */}
          <Tooltip title="Search">
            <Button onClick={event => this.handleOpenSearch(event)} size="small" className={this.props.user.admin === 2 ? classes.settingsBtnAdmin : classes.settingsBtn}>
              <SearchIcon />
            </Button>
          </Tooltip>
          {this.props.user.id && (
            <>{this.props.user.admin === 1 ?
              <>
              <Tooltip title="Create"><Button onClick={event => this.handleOpenCreate(event)} size="small" className={classes.settingsBtn}><CreateIcon /></Button></Tooltip>
              <Tooltip title="Messages"><Button onClick={event => this.handleOpenMessages(event)} size="small" className={classes.settingsBtn}><MessageIcon /></Button></Tooltip>
              <Modal
                aria-labelledby="View Messages"
                aria-describedby="Modal to view messages"
                open={this.state.showMessage}
                onClose={this.handleCloseMessages}
              >
                <div style={getModalStyle()} className={classes.paper} >
                  <div className={classes.messages}>
										{this.checkMessages()}
                  </div>
                  <Button size='small' color='secondary' onClick={() => this.handleCloseMessages()}>Back</Button>
                </div>
              </Modal>
              <Menu
                id="simple-menu"
                anchorEl={this.state.showCreate}
                open={Boolean(this.state.showCreate)}
                onClose={this.handleCloseCreate}>
                  <MenuItem onClick={this.handlePcn}>PCN</MenuItem>
                  <MenuItem onClick={this.handleNpi}>NPI</MenuItem>
                  <MenuItem onClick={this.handleEol}>EOL</MenuItem>
              </Menu> 
              </>
              :
              <></>
            }
              <LogOutButton className={this.props.user.admin === 2 ? "logoutAdmin" : "logout"} to="/dashboard"/>
            </>
          )}
          
        </div>
      </div>
    )
  }
};


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = reduxStore => ({
  user: reduxStore.user,
  errors: reduxStore.errors,
  reduxStore
});

export default withStyles(styles)(connect(mapStateToProps)(Nav));
