import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import * as actions from "../../../store/actions";
import {deleteAUser, fetchAllUserFailed, getRequiredDoctorInfor} from "../../../store/actions";
// import react, react-markdown-editor-lite, and a markdown parser you like
// import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './TableManagerUser.scss';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
import Select from 'react-select';
import {CRUD_ACTIONS, LANGUAGES} from "../../../utils";
import {getDetailInforDoctor} from "../../../services/userService";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManagerDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:'',
            listDoctors:[],
            hasOldData:false,

            //save to doctor_infor Table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            nameClinic:'',
            addressClinic:'',
            note:'',
        }
    }
    componentDidMount() {
this.props.fetchAllDoctors();
this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0) {
            if(type === 'USERS'){
                // eslint-disable-next-line array-callback-return
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi =  `${item.lastName} ${item.firstName}` ;
                    let labelEn =  `${item.firstName} ${item.lastName}` ;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
if(type === 'PRICE'){
    inputData.map((item, index) => {
        let object = {};
        let labelVi =  `${item.valueVi}` ;
        let labelEn =  `${item.valueEn} USD`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.keyMap;
        result.push(object)
    })
}
            if(type === 'PAYMENT'){
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi =  `${item.valueVi}` ;
                    let labelEn =  `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'PROVINCE'){
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi =  `${item.valueVi}` ;
                    let labelEn =  `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }
        return  result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
if(prevProps.allDoctors !== this.props.allDoctors) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
    let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
    let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
    let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
    let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');

    this.setState({
        listDoctors:dataSelect,
        listPrice:dataSelectPrice,
        listPayment:dataSelectPayment,
        listProvince:dataSelectProvince,
    })
}


        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
        let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');

          console.log('check data new: ', dataSelectPrice,dataSelectPayment,dataSelectProvince)
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
                })
        }
        // if (prevState.selectedDoctor !== this.state.selectedDoctor) {
        //     if (this.state.selectedDoctor) {
        //         this.props.fetchDoctorDetails(this.state.selectedDoctor.value);
        //     }
        // }
        // if (prevProps.doctorDetails !== this.props.doctorDetails) {
        //     const { description, contentMarkdown } = this.props.doctorDetails;
        //     this.setState({
        //         description: description,
        //         contentMarkdown: contentMarkdown,
        //         contentHTML: mdParser.render(contentMarkdown),
        //     });
        // }
        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');

            this.setState({
                listDoctors:dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
            })
        }
    }

     handleEditorChange = ({ html, text }) => {
       this.setState({
           contentMarkdown:text,
           contentHTML:html,
       })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData, selectedDoctor, contentHTML, contentMarkdown, description } = this.state;

        // Kiểm tra xem doctorId có tồn tại không
        if (!selectedDoctor || !selectedDoctor.value) {
            console.error('doctorId is missing');
            return;
        }

        let doctorId = selectedDoctor.value;

        this.props.saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: doctorId,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
       selectedPrice: this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        });
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });  // Đảm bảo selectedDoctor được cập nhật
        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML || '',
                contentMarkdown: markdown.contentMarkdown || '',
                description: markdown.description || '',
                hasOldData: true
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            });
        }
        console.log('Doctor details response:', res);
    }

    handleChangeSelectDoctorInfor = async (selectedOption,name) =>{
    let stateName = name.name;
    let stateCopy = {...this.state};
    stateCopy[stateName] = selectedOption;
    this.setState({
        ...stateCopy
    })
    }

    handleOnChangeText = (event,id) =>{
       let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
          ...stateCopy
        })
    }
    render() {
let {hasOldData} = this.state;

        return (
            <div className='manager-doctor-container'>
              <div className='manager-doctor-title'> <FormattedMessage id='admin.manager-doctor.title' /></div>
<div className='more-info'>
    <div className='content-left form-group'>

        <label><FormattedMessage id='admin.manager-doctor.select-doctor'/></label>
        <Select
            value={this.state.selectedOption}
            onChange={this.handleChangeSelect}
            options={this.state.listDoctors}
            placeholder={<FormattedMessage id='admin.manager-doctor.select-doctor'/>}
        />
    </div>
    <div className='content-right'>
        <label><FormattedMessage id='admin.manager-doctor.intro'/></label>
        <textarea className='form-control'
                  onChange={(event) => this.handleOnChangeText(event,'description')}
         value={this.state.description}
        >
        </textarea>
    </div>
</div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.price'/></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manager-doctor.price'/>}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.payment'/></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manager-doctor.payment'/>}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.province'/></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manager-doctor.province'/>}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.nameClinic'/></label>
                        <input className='form-control'
                               onChange={(event) => this.handleOnChangeText(event,'nameClinic')}
                               value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.addressClinic'/></label>
                        <input className='form-control'
                               onChange={(event) => this.handleOnChangeText(event,'addressClinic')}
                               value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manager-doctor.note'/></label>
                        <input className='form-control'
                               onChange={(event) => this.handleOnChangeText(event,'note')}
                               value={this.state.note}
                        />
                    </div>
                </div>

                <div className='manager-doctor-editor'>
                <MdEditor style={{height: '500px'}} renderHTML={text =>
                        mdParser.render(text)}
                              onChange={this.handleEditorChange}
                              value={this.state.contentMarkdown}

                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ? <span><FormattedMessage id='admin.manager-doctor.save'/></span> : <span><FormattedMessage id='admin.manager-doctor.add'/></span>}
            </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        doctorDetails: state.admin.doctorDetails, // Chi tiết bác sĩ
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor:(data) => dispatch(actions.saveDetailDoctor(data)),
        fetchDoctorDetails: (doctorId) => dispatch(actions.fetchDoctorDetails(doctorId)), // Action để lấy chi tiết bác sĩ
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);