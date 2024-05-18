import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files


// import { FormattedMessage } from 'react-intl';

// import { changeLanguageApp } from '../../store/actions';


class About extends Component {
 
    render() {
       
        return (
            <div className='home-footer'>
         &copy; 2024 Choloé. All rights reserved.
          
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);