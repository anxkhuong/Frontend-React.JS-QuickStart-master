import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import {handleLoginApi} from '../../services/userService'
import * as actions from "../../store/actions";
import './Login.scss';
// import { every } from 'lodash';
// import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
this.state ={
    username:'',
    password:'',
isShowPassword:false,
errMessage: '',
}
    }

    handleOnChangeUserName =(event) => {
    this.setState({
        username:event.target.value
    })
}
handleOnChangePassword =(event) => {
    this.setState({
        password:event.target.value
    })
}
handleLogin = async() =>{
    this.setState({
        errMessage: ''
    })
    try {
       let data = await handleLoginApi(this.state.username, this.state.password);
        // console.log('hoidanit',res)
        if(data && data.errCode !== 0){
this.setState({
    errMessage:data.message
})
        }
        if(data && data.errCode === 0){
            this.props.userLoginSuccess(data.user)
            console.log('login successd')
        }
        if(data && data.errCode === 1){
            console.log('Email does not exist in the system. Please try another email.')
        }
       
    } catch (error) {
       if ( error.response){
        if(error.response.data){
            this.setState({
                errMessage: error.response.data.message
            })
        }
       }
       console.log('khuongcute', error.response)
    

    }

}
handleShowHidePassword=()=>{
    this.setState({
        isShowPassword: !this.state.isShowPassword
    })
}
    handleKeyDown=(event) =>{
    if(event.key === 'Enter' || event.keyCode === 13){
        this.handleLogin();
    }
    }

    render() {


        return ( 
            <div className='login-background'>
          <div className='Login-container'>
            <div className='login-content'>
<div className='cold-12 text-login'>Login</div>
<div className='cold-12 form-group login-input'>
    <label>Username</label>
    <input type='text' className='form-control' placeholder='enter your username'
    value={this.state.username}
    onChange={(event) => this.handleOnChangeUserName(event)}
    />
    </div>

    <div className='cold-12 form-group login-input' >
    <label>Password:</label>
    <div className='custom-input-password'>
    <input type={this.state.isShowPassword ? 'text' : 'password'} 
    className='form-control'
     placeholder='enter your password'
     onChange={(event) =>{
        this.handleOnChangePassword(event)
     }}
           onKeyDown={(event)=>this.handleKeyDown(event)}
     />
     <span  onClick = {() => {this.handleShowHidePassword()}}>
      
        <i className={this.state.isShowPassword ? "far fa-eye" : 'far fa-eye-slash'}></i>
     
     </span>
     
    </div>
    <div className='col-12' style={{color: 'red'}}>
        {this.state.errMessage}
    </div>
</div>
<button className='btn-login' onClick={() =>{this.handleLogin()}}>Login</button>
<div className='col-12'>
    <span className='forgot-password'>Forgot your password</span>
</div>
<div className='col-12 text-center mt-3'>
    <span className='text-orther-login '> or login with</span>
</div>
<div className='col-12 social-login'>
<i className="fab fa-google google"></i>
<i className="fab fa-facebook-f facebook"></i>
</div>
            </div>
          </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);