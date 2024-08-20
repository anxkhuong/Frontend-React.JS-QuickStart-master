import React, { Component } from 'react'; // Removed unnecessary "component" import
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // Corrected import path
import './ManagePatient.scss';
import DatePicker from "../../../components/Input/DatePicker";
import {getAllPatientForDoctor} from "../../../services/userService";
import moment from "moment";
import {LANGUAGES} from "../../../utils";
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate:moment (new Date()).startOf('day').valueOf(),
            dataPatient:[]
        }; // Added semicolon
        return; // Removed return statement from constructor
    }

    async componentDidMount() {
       let {user} = this.props;
       let {currentDate} = this.state;
       let formatedDate = new Date(currentDate).getTime();
       this.getDataPatient(user,formatedDate)
    }
    getDataPatient = async (user,formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient:res.data,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // Your logic when language changes
        }
    }
    handleOnChangeDatePicker =(date) =>{
        this.setState({
            currentDate:date[0]
        },()=>{
            let {user} = this.props;
            let {currentDate} = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user,formatedDate)
        }) }
    handleBtnConfirm = (item) =>{
console.log('check item: ',item);
alert('click me')
    }
    handleBtnRemedy = () =>{

    }
    render() {
        let {language} = this.props;
        console.log('check state manage patient: ', this.state);
        let {dataPatient} = this.state;
        return (
            <div className='manage-patient-container'>
               <div className='m-p-title'>
                   Quản lý bệnh nhân khm bệnh
               </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>CHọn ngày khám</label>
                        <DatePicker onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}

                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width:'100%'}} >
                            <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Actions</th>
                            </tr>
                            {dataPatient && dataPatient.length > 0 ?
                                dataPatient.map((item,index)=>{
                               let time = language ===   LANGUAGES.VI ?
                                   item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                               let gender = language === LANGUAGES.VI ?
                                   item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                               return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{time}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{gender}</td>
                                        <td>
                                            <button className='mp-btn-confirm' onClick={() =>this.handleBtnConfirm(item)}>Xacs Nhan</button>
                                            <button className='mp-btn-remedy' onClick={() =>this.handleBtnRemedy()}>Guửi hóa đơn</button>

                                        </td>
                                    </tr>
                                )
                            })
                                :
                                <tr>No DATA</tr>
                            }
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user:state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Add actions to dispatch if needed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);