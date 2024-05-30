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
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
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
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

     handleEditorChange = ({ html, text }) => {
       this.setState({
           contentMarkdown:text,
           contentHTML:html,
       })
    }

    handleSaveContentMarkdown = () =>{
        console.log('check contentmarkdown state: ', this.state);
    }
    handleChange = selectedDoctor =>{
this.setState({selectedDoctor});
    }

    handleOnChangeDesc = (event) =>{
        this.setState({
          description: event.target.value
        })
    }
    render() {


        return (
            <div className='manager-doctor-container'>
              <div className='manager-doctor-title'> Tạo thêm thông tin bác sĩ</div>
<div className='more-info'>
    <div className='content-left form-group'>

        <label>Chon bac si</label>
        <Select
            value={this.state.selectedDoctor}
            onChange={this.handleChange}
            options={options}
        />
    </div>
    <div className='content-right'>
        <label>Thong tin gioi thieu</label>
        <textarea className='form-control' rows='4'
                  onChange={(event) => this.handleOnChangeDesc(event)}
        value={this.state.description}
        >
            adadad
        </textarea>
    </div>
</div>

                <div className='manager-doctor-editor'>
                    <MdEditor style={{height: '500px'}} renderHTML={text =>
                    mdParser.render(text)}
                          onChange={this.handleEditorChange} />

            </div>
            <button
                onClick={() => this.handleSaveContentMarkdown()}
                className='save-content-doctor'>Luu thong tin</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) =>dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);