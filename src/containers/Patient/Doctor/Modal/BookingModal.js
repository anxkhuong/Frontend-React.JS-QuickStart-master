// import React, { Component } from 'react'; // Removed unnecessary "component" import
// import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl'; // Corrected import path
// import './BookingModal.scss';
// import {Modal} from 'reactstrap';
// import ProfileDoctor from "../ProfileDoctor";
// import _ from 'lodash';
// import DatePicker from "../../../../components/Input/DatePicker";
// import * as actions from "../../../../store/actions";
// import {LANGUAGES} from "../../../../utils";
// import Select from "react-select";
// import {postPatientBookAppointment} from "../../../../services/userService";
// import {toast} from "react-toastify";
//
// class BookingModal extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             fullName:'',
//             phoneNumber:'',
//             email:'',
//             address:'',
//             reason:'',
//             birthday:'',
//             selectedGender:'',
//             doctorId:'',
//             genders:'',
//             timeType:'',
//         };
//
//     }
//
//     async componentDidMount() {
//         this.props.getGenders();
//     }
// buildDataGender = (data)=>{
//         let result = [];
//         let language = this.props.language;
//         if(data && data.length > 0){
//             data.map(item =>{
//                 let object = {};
//                 object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
//                 object.value = item.keyMap;
//                 result.push(object)
//             })
//         }
//         return result;
// }
//     // async componentDidUpdate(prevProps, prevState, snapshot) {
//     //     if (this.props.language !== prevProps.language) {
//     //        this.setState({
//     //            genders:this.buildDataGender(this.props.genders)
//     //        })
//     //     }
//     //     if(this.props.genders !== prevProps.genders){
//     //         this.setState({
//     //             genders: this.buildDataGender(this.props.genders)
//     //         })
//     //     }
//     //     if(this.props.dataTime !== prevProps.dataTime){
//     //         if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
//     //             let doctorId = this.props.dataTime.doctorId;
//     //             let timeType = this.props.dataTime.timeType;
//     //             this.setState({
//     //                 doctorId:doctorId,
//     //                 timeType:timeType,
//     //
//     //             })
//     //         }
//     //     }
//     // }
//
//     async componentDidUpdate(prevProps) {
//         // Nếu ngôn ngữ thay đổi hoặc dữ liệu giới tính thay đổi, cập nhật state
//         if (this.props.language !== prevProps.language || this.props.genders !== prevProps.genders) {
//             let genders = this.buildDataGender(this.props.genders);
//
//             // Chỉ cập nhật nếu dữ liệu giới tính khác với dữ liệu hiện tại trong state
//             if (JSON.stringify(genders) !== JSON.stringify(this.state.genders)) {
//                 this.setState({
//                     genders: genders,
//                     selectedGender: genders.length > 0 ? genders[0] : ''
//                 });
//             }
//         }
//
//         if (this.props.dataTime !== prevProps.dataTime) {
//             if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
//                 let doctorId = this.props.dataTime.doctorId;
//                 let timeType = this.props.dataTime.timeType;
//                 this.setState({
//                     doctorId: doctorId,
//                     timeType: timeType,
//                 });
//             }
//         }
//     }
//
//
//
//     handleOnchangeInput = (event, id) => {
//         let valueInput = event.target.value;
//         let stateCopy = { ...this.state };
//         stateCopy[id] = valueInput;
//         this.setState({
//             ...stateCopy
//         });
//         console.log('check state from onchange input: ', stateCopy);
//     }
//
//     handleOnchangeDatePicker = (date) =>{
//         this.setState({
//             birthday: date[0]
//         })
//     }
//     handleChangeSelect = (selectedOption) =>{
//         this.setState({
//             selectedGender : selectedOption
//         });
//     }
//     handleConfirmBooking = async () => {
//         let date = new Date(this.state.birthday).getTime();
//
//         try {
//             let res = await postPatientBookAppointment({
//                 fullName: this.state.fullName,
//                 phoneNumber: this.state.phoneNumber,
//                 email: this.state.email,
//                 address: this.state.address,
//                 reason: this.state.reason,
//                 date: date,
//                 selectedGender: this.state.selectedGender.value,
//                 doctorId: this.state.doctorId,
//                 timeType: this.state.timeType,
//             });
//
//             if (res && res.errCode === 0) {
//                 toast.success('Booking a new appointment succeeded!');
//                 this.props.closeBookingClose();
//             } else {
//                 toast.error('Booking a new appointment failed: ' + res.errMessage);
//             }
//         } catch (error) {
//             toast.error('An error occurred while booking: ' + error.message);
//         }
//     }
//
//
//     render() {
//         let {isOpenModal,closeBookingClose,dataTime} = this.props
//         let doctorId = '';
//         if(dataTime && !_.isEmpty(dataTime)) {
//             doctorId = dataTime.doctorId;
//         }
//         console.log('check datatime: ',dataTime)
//         console.log('check state ', this.state)
//         return (
//            <Modal
//                isOpen={isOpenModal}
//                className={'booking-modal-container'}
//                size='lg'
//                centered>
//                <div className='booking-modal-content'>
//                    <div className='booking-modal-header'>
//                        <span className='left'><FormattedMessage id='patient.booking-modal.title'/></span>
//                        <span className='right'
//                              onClick={closeBookingClose}
//                        >
//                            <i className='fas fa-times'/>
//                        </span>
//                    </div>
//                    <div className='booking-modal-body'>
//                        <div className='doctor-infor'>
//                            <ProfileDoctor
//                                doctorId={doctorId}
//                                isShowDescriptionDoctor={false}
//                                dataTime={dataTime}
//                            />
//
//                        </div>
//                        {/*<div className='price'>*/}
//                        {/*    gia kham 500.000VND*/}
//                        {/*</div>*/}
//                        <div className='row'>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.fullName'/></label>
//                                <input className='form-control'
//                                       value={this.state.fullName}
//                                       onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
//                                />
//                            </div>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.phoneNumber'/></label>
//                                <input className='form-control'
//                                       value={this.state.phoneNumber}
//                                       onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
//                                />
//                            </div>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.email'/></label>
//                                <input className='form-control'
//                                       value={this.state.email}
//                                       onChange={(event) => this.handleOnchangeInput(event, 'email')}
//                                />
//                            </div>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.address'/></label>
//                                <input className='form-control'
//                                       value={this.state.address}
//                                       onChange={(event) => {
//                                           this.handleOnchangeInput(event, 'address')
//                                       }}
//                                />
//                            </div>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.reason'/></label>
//                                <input className='form-control'
//                                       value={this.state.reason}
//                                       onChange={(event) => {
//                                           this.handleOnchangeInput(event, 'reason')
//                                       }}
//                                />
//                            </div>
//                            {/*<div className='col-6 form-group'>*/}
//                            {/*    <label>Dat cho ai</label>*/}
//                            {/*    <input className='form-control'/>*/}
//                            {/*</div>*/}
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.birthday'/></label>
//                                <DatePicker
//                                    onChange={this.handleOnchangeDatePicker}
//                                    className='form-control'
//                                    value={this.state.birthday}
//                                />
//                            </div>
//                            <div className='col-6 form-group'>
//                                <label><FormattedMessage id='patient.booking-modal.gender'/></label>
//                                <Select
//                                    value={this.state.selectedGender}
//                                    onChange={this.handleChangeSelect}
//                                    options={this.state.genders}
//                                />
//                            </div>
//
//                        </div>
//                    </div>
//                    <div className='booking-modal-footer'>
//                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}>
//                            <FormattedMessage id='patient.booking-modal.btnConfirm'/></button>
//                        <button className='btn-booking-cancel' onClick={closeBookingClose}><FormattedMessage
//                            id='patient.booking-modal.btnCancel'/></button>
//
//                    </div>
//                </div>
//
//            </Modal>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         language: state.app.language,
//         genders:state.admin.genders
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getGenders:() => dispatch(actions.fetchGenderStart())
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
//
//
//

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from 'lodash';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment/moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: null,
            doctorId: '',
            genders: [],
            timeType: '',
        };
    }

    componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.forEach(item => {
                let object = {
                    label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                    value: item.keyMap,
                };
                result.push(object);
            });
        }
        return result;
    };

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language || this.props.genders !== prevProps.genders) {
            let genders = this.buildDataGender(this.props.genders);
            if (JSON.stringify(genders) !== JSON.stringify(this.state.genders)) {
                this.setState({
                    genders: genders,
                    selectedGender: genders.length > 0 ? genders[0] : null,
                });
            }
        }

        if (this.props.dataTime !== prevProps.dataTime && this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
            let doctorId = this.props.dataTime.doctorId;
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
            });
        }
    }

    handleOnchangeInput = (event, id) => {
        this.setState({ [id]: event.target.value });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({ birthday: date[0] });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`;
        }
        return '';
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI
                ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return '';
    };

    handleConfirmBooking = async () => {
        let { fullName, phoneNumber, email, address, reason, birthday, selectedGender, doctorId, timeType } = this.state;

        // Validate input
        if (!fullName || !phoneNumber || !email || !address || !reason || !birthday || !selectedGender) {
            toast.error('Please fill in all required fields.');
            return;
        }

        let date = new Date(birthday).getTime(); // Get timestamp of birthday
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        try {
            let res = await postPatientBookAppointment({
                fullName,
                phoneNumber,
                email,
                address,
                reason,
                date:this.props.dateTime.date,
                gender: selectedGender.value, // Use .value for gender
                doctorId,
                timeType,
                birthday:date,
                language: this.props.language,
                timeString,
                doctorName,

            }); console.log('check date:', date);

            if (res && res.errCode === 0) {
                toast.success('Booking a new appointment succeeded!');
                this.props.closeBookingClose();
            } else {
                toast.error('Booking a new appointment failed: ' + res.errMessage);
            }
        } catch (error) {
            toast.error('An error occurred while booking: ' + error.message);
        }
    };

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title'/></span>
                        <span className='right' onClick={closeBookingClose}>
                            <i className='fas fa-times'/>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullName'/></label>
                                <input className='form-control'
                                       value={this.state.fullName}
                                       onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phoneNumber'/></label>
                                <input className='form-control'
                                       value={this.state.phoneNumber}
                                       onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email'/></label>
                                <input className='form-control'
                                       value={this.state.email}
                                       onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address'/></label>
                                <input className='form-control'
                                       value={this.state.address}
                                       onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason'/></label>
                                <input className='form-control'
                                       value={this.state.reason}
                                       onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday'/></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender'/></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={this.handleConfirmBooking}>
                            <FormattedMessage id='patient.booking-modal.btnConfirm'/>
                        </button>
                        <button className='btn-booking-cancel' onClick={closeBookingClose}>
                            <FormattedMessage id='patient.booking-modal.btnCancel'/>
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
