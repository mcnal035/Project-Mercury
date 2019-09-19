import React, {Component} from 'react';
import {connect} from 'react-redux';

//Material-UI
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Icons
import ExitIcon from '@material-ui/icons/Cancel'

const styles = theme => ({
    image: {
        width: '75px',
        height: '50px',
        objectFit: 'cover',
        display: 'inline-block',
        marginTop: '3%',
        marginRight: '3%'
    }
})

class ImageListItem extends Component {
    render(){
        const {classes} = this.props;
        return(
            <>
            <div>
                <Button><ExitIcon /></Button>
                <img className={classes.image} src={this.props.image.image_url} />
            </div>   
            </>
        )
    }
}

export default withStyles(styles)(connect()(ImageListItem));
