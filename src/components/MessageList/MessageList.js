import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import './MessageList.css'


// Component returns message items in the messages modal in the Nav
class MessageList extends Component {

    navigate = (id) => {
        const type = id.substring(0, 3)
        this.props.history.push(`/${type}-view/${type}/${id}`)
    }

    checkStatus = (message, type) => {
        if( message.status === 'PUBLISHED' || message.status === 'DENIED'){
            if(type === 'unread'){
                return (<div className={'messagediv'}
                ><p className={'messagetext'} onClick={() => this.navigate(message.id)}>
                    {message.id} was denied on {Moment(message.message_time).format('MM/DD/YYYY')}
                </p></div>)
            }
            else if (type === 'read') {
                return (<div className={'messagediv'}> <p className={'messagetext'} onClick={() => this.navigate(message.id)}>
                    {message.id} was {message.status.toLowerCase()} on {Moment(message.message_time).format('MM/DD/YYYY')}
                </p> </div>)
            }
        }
    }

    render() {
        return (
            <>
                {this.checkStatus(this.props.message, this.props.type, this.props.key)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(MessageList);
