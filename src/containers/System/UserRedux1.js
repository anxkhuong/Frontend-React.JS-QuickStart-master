import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
  constructor(props){
        super(props);
            this.state ={

            }
        }
    
  

    componentDidMount() {
    }


    render() {
        return (
            <><div className='user-redux-container'></div><div className='title'>
                dit me ho nha gai
            </div><div className="user-redux-body">
                <div> Them moi nguoi dungredux</div>
                </div></>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
