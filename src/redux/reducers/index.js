import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import pcnInfo from './pcnInfoReducer';
import getPcn from './pcnReducer';
import pcnPart from './pcnPartReducer';
import pmDashboard from './pmDashboardReducer';
import createPcnReducer from './createPcnReducer';
import searchPcn from './searchReducer';
import adminDashboard from './adminDashboardReducer';
import currentPartsReducer from './currentPartsReducer';
import searchPartReducer from './searchPartReducer';
import currentPcnReducer from './currentPcnReducer';
import createEolReducer from './createEolReducer';
import currentEolReducer from './currentEolReducer';
import pcnImage from './pcnImageReducer';
import createNpiReducer from './createNpiReducer';
import currentNpiReducer from './currentNpiReducer';
import messages from './messagesReducer';
import unreadMessages from './unreadMessagesReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  pcnInfo, // stores details of a selected PCN for viewing
  pcnPart, // stores parts attached to a selected PCN
  getPcn, // will hold the pcn reducer information.
  pmDashboard,
  createPcnReducer,
  searchPcn,
  adminDashboard,
  currentPartsReducer,
  searchPartReducer,
  currentPcnReducer,
  createEolReducer,
  currentEolReducer,
  createNpiReducer,
  currentNpiReducer,
  pcnImage,
  messages,
  unreadMessages,
});

export default rootReducer;
