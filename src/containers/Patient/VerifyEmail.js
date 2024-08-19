import React, { Component } from 'react'; // Removed unnecessary "component" import
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // Corrected import path
import {postVerifyBookAppointment} from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import './VerifyEmail.scss'
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
statusVerify: false,
            errCode:0
        }; // Added semicolon
        return; // Removed return statement from constructor
    }

    async componentDidMount() {
       if (this.props.location && this.props.location.search){
           let urlParams = new URLSearchParams(this.props.location.search);
           let token = urlParams.get('token');
           let doctorId = urlParams.get('doctorId');
           let res = await postVerifyBookAppointment({
               token:token,
               doctorId: doctorId
           })
           if(res && res.errCode === 0){
               this.setState({
                   statusVerify:true,
                   errCode:res.errCode
               })
           }else {
               this.setState({
                   statusVerify:true,
                   errCode:res && res.errCode ? res.errCode: -1

               })
           }
       }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // Your logic when language changes
        }
    }

    render() {
        let {statusVerify,errCode} = this.state;
        console.log('check state: ',this.state)
        return (
            <>
                <HomeHeader/>
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div> Loading Data .....</div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công</div> :
                                <div className='infor-booking'>Lịch hẹn không tôồn tại</div>
                            }
                        </div>

                    }
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Add actions to dispatch if needed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);