import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../store/actions";
import {deleteAUser, fetchAllUserFailed} from "../../../store/actions";


class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
usersRedux: []
        }
    }
    componentDidMount() {
this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) =>{
       this.props.deleteAUserRedux(user.id)
    }
    render() {
console.log('an nhien check all users: ', this.props.listUsers);
console.log('check state tablema: ', this.state.usersRedux);
let arrayUsers = this.state.usersRedux;
        return (
                    <table id='TableManagerUser'>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrayUsers && arrayUsers.length > 0 && arrayUsers.map((item,index) =>{
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        {/* Thêm các nút hành động tại đây */}
                                        <button className='btn-edit'>
                                            <i className='fas fa-pencil-alt'> < /i>
                                        </button>
                                        <button onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash"> < /i>
                                        </button>
                                    </td>
                                </tr>

                            )
                        })}
                        <tbody>

                        </tbody>
                    </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);