import React, { Component } from 'react'; // Removed unnecessary "component" import
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // Corrected import path
import './BookingModal.scss';
import {Modal} from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from 'lodash';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }; // Added semicolon
        return; // Removed return statement from constructor
    }

    async componentDidMount() {
        // Your componentDidMount logic here
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // Your logic when language changes
        }
    }

    render() {
        let {isOpenModal,closeBookingClose,dataTime} = this.props
        let doctorId = '';
        if(dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log('check datatime: ',dataTime)
        return (
           <Modal
               isOpen={isOpenModal}
               className={'booking-modal-container'}
               size='lg'
               centered>
               <div className='booking-modal-content'>
                   <div className='booking-modal-header'>
                       <span className='left'>THong tin dat lich kham benh</span>
                       <span className='right'
                             onClick={closeBookingClose}
                       >
                           <i className='fas fa-times'/>
                       </span>
                   </div>
                   <div className='booking-modal-body'>
                       <div className='doctor-infor'>
<ProfileDoctor doctorId={doctorId}/>
                       </div>
                       <div className='price'>
                           gia kham 500.000VND
                       </div>
                       <div className='row'>
                           <div className='col-6 form-group'>
                               <label>Ho ten</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>so dien thoai</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Dia Chi Email</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Dia chi lien he</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Ly do kham</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Dat cho ai</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Dia Chi Email</label>
                               <input className='form-control'/>
                           </div>
                           <div className='col-6 form-group'>
                               <label>Gioi tinh</label>
                               <input className='form-control'/>
                           </div>
                       </div>
                   </div>
                   <div className='booking-modal-footer'>
                       <button className='btn-booking-confirm' onClick={closeBookingClose}>Xac nhan</button>
                       <button className='btn-booking-cancel' onClick={closeBookingClose}>Cancel</button>

                   </div>
               </div>

           </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);