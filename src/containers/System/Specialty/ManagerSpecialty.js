import React, { Component } from 'react'; // Removed unnecessary "component" import
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // Corrected import path
import './ManagerSpecialty.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {CommonUtils} from "../../../utils";
import {createNewSpecialty} from "../../../services/userService";
import {toast} from "react-toastify";


const mdParser = new MarkdownIt();
class ManagerSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
name:'',
            imageBase64:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
        }; // Added semicolon
    }

    async componentDidMount() {
        // Your componentDidMount logic here
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // Your logic when language changes
        }
    }
    handleOnChangeInput = (event,id) =>{
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({html,text}) =>{
        this.setState({
            descriptionHTML:html,
            descriptionMarkdown:text,
        })
    }
    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64:base64
            })
        }
    }
    handleSaveNewSpecialty = async ()=>{
        let res = await createNewSpecialty(this.state)
        if(res && res.errCode === 0){
            toast.success('Add new specialty succeeds!')
        }else {
            toast.error('Somethings wrongs ....')
            console.log('>> hoi dan it check res: ', res)
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'> Quan ly chuyen khoa</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group' >
                        <label>Ten chuyen khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event,'name')}/>

                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh Chuyen khoa</label>
                        <input className='form-control-file' type='file' onChange={(event) =>this.handleOnchangeImage(event)}/>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{height:'300px'}}
                            renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty' onClick={() => this.handleSaveNewSpecialty()}>Save</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);