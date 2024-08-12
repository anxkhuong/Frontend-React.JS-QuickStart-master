import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import * as actions from "../../../store/actions";
import {deleteAUser, fetchAllUserFailed} from "../../../store/actions";
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
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:'',
            listDoctors:[],
            hasOldData:false,
        }
    }
    componentDidMount() {
this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0) {
            // eslint-disable-next-line array-callback-return
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return  result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
if(prevProps.allDoctors !== this.props.allDoctors) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    this.setState({
        listDoctors:dataSelect
    })
}
if(prevProps.language !== this.props.language) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    this.setState({
        listDoctors:dataSelect
    })
}
        if (prevState.selectedDoctor !== this.state.selectedDoctor) {
            if (this.state.selectedDoctor) {
                this.props.fetchDoctorDetails(this.state.selectedDoctor.value);
            }
        }
        if (prevProps.doctorDetails !== this.props.doctorDetails) {
            const { description, contentMarkdown } = this.props.doctorDetails;
            this.setState({
                description: description,
                contentMarkdown: contentMarkdown,
                contentHTML: mdParser.render(contentMarkdown),
            });
        }
    }

     handleEditorChange = ({ html, text }) => {
       this.setState({
           contentMarkdown:text,
           contentHTML:html,
       })
    }

//     handleSaveContentMarkdown = () =>{
//        let {hasOldData} = this.state;
//         this.props.saveDetailDoctor(
//             {
//                 contentHTML: this.state.contentHTML,
//                 contentMarkdown: this.state.contentMarkdown,
//                 description:this.state.description,
//                 doctorId: this.state.selectedDoctor.value,
//                 action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
//             }
//         );
//         console.log('Data to be saved:', this.props.saveDetailDoctor);  // Log dữ liệu để kiểm tra
// console.log('doctorid', this.state.selectedDoctor.value)
//     }
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
    }

    // handleChangeSelect = async (selectedOption) => {
    //     this.setState({ selectedOption });
    //     let res = await getDetailInforDoctor(selectedOption.value);
    //     if (res && res.errCode === 0 && res.data && res.data.Markdown) {
    //         let markdown = res.data.Markdown;
    //         this.setState({
    //             contentHTML: markdown.contentHTML || '',
    //             contentMarkdown: markdown.contentMarkdown || '',
    //             description: markdown.description || '',  // Đảm bảo rằng description được cập nhật
    //             hasOldData: true
    //         });
    //     } else {
    //         // Đặt lại các trường về giá trị trống nếu không có dữ liệu mới
    //         this.setState({
    //             contentHTML: '',
    //             contentMarkdown: '',
    //             description: '',  // Đặt description về giá trị trống
    //             hasOldData: false
    //         });
    //     }
    //     console.log('check resssss ', res);
    // }

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

    handleOnChangeDesc = (event) =>{
        this.setState({
          description: event.target.value
        })
    }
    render() {
let {hasOldData} = this.state;

        return (
            <div className='manager-doctor-container'>
              <div className='manager-doctor-title'> Tạo thêm thông tin bác sĩ</div>
<div className='more-info'>
    <div className='content-left form-group'>

        <label>Chon bac si</label>
        <Select
            value={this.state.selectedOption}
            onChange={this.handleChangeSelect}
            options={this.state.listDoctors}
        />
    </div>
    <div className='content-right'>
        <label>Thong tin gioi thieu</label>
        <textarea className='form-control' rows='4'
                  onChange={(event) => this.handleOnChangeDesc(event)}
         value={this.state.description}
        >

        </textarea>
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
                {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: (id) => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor:(data) => dispatch(actions.saveDetailDoctor(data)),
        fetchDoctorDetails: (doctorId) => dispatch(actions.fetchDoctorDetails(doctorId)), // Action để lấy chi tiết bác sĩ
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);