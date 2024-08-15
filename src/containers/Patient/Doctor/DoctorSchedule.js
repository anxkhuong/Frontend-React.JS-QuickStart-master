import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {LANGUAGES} from "../../../utils";
import {getScheduleDoctorByDate} from '../../../services/userService';
import {FormattedMessage} from "react-intl";

export class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state ={
            allDays: [],
            allAvalableTime:[],
        }
    }
    async componentDidMount(){
        let {language} = this.props;
let allDays = this.getArrDays(language);
    this.setState({
        allDays:allDays,
    })


    }
capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
}
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.EN) {
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelEn = moment(new Date()).add(i, 'days').format('ddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelEn);
                }
            } else {
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    };

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            console.log('Language changed from', prevProps.language, 'to', this.props.language);            this.forceUpdate();
         let allDays = this.getArrDays(this.props.language);
           this.setState({
               allDays:allDays
           })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
this.setState({
allAvalableTime: res.data ? res.data : []
})
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            if(res && res.errCode === 0){
              this.setState({
                  allAvalableTime: res.data ? res.data: []
              })
          }
            console.log('check res schedule from react: ', res);
        } else {
            console.error('Doctor ID is missing or invalid');
        }
    };
    render() {
        let {allDays, allAvalableTime} = this.state;
        let {language} = this.props;
        return (
              <div className='doctor-schedule-container'>
                  <div className='all-schedule'>
                      <select onChange={(event) => this.handleOnChangeSelect(event)}>
                              {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return(
                                  <option
                                      key={index}
                                      value={item.value}>
                                      {item.label}
                                  </option>
                                )
                              })}
                      </select>
                  </div>
                  <div className='all-availabel-time'>
<div className='text-calendar'>
    <i className='fas fa-calendar-alt'><span><FormattedMessage id='patient.detail-doctor.schedule' /></span></i>
</div>
                      <div className='time-content'>
                          {allAvalableTime && allAvalableTime.length > 0 ?
                              <React.Fragment>
                                  <div className='time-content-btns'>
                                      {  allAvalableTime.map((item, index) => {
                                          let timedisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                          return(
                                              <button key={index} className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}>{timedisplay}</button>
                                          )
                                      })
                                      }
                                  </div>

                              <div className='book-free'>
                                  <span><FormattedMessage id={'patient.detail-doctor.choose'}  /><i className='far fa-hand-point-up'></i> <FormattedMessage id={'patient.detail-doctor.book-free'} /> </span>
                              </div>
                              </React.Fragment>
                      :
                              <div className="no-schedule" ><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                          }
                      </div>
                  </div>
              </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);