import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService,deleteUserSerivce,editUserService  } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser:false,
            isOpenModalEditUser: false,
            userEdit:{}
        }
    }

    getAllUsersFromReact = async() =>{
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }
    }
handleAddNewUser= () => {
this.setState({
    isOpenModalUser:true,
})
}
toggleUserModal = () => {
    this.setState({
        isOpenModalUser: !this.state.isOpenModalUser,
    })
}
toggleUserEditModal = () =>{
    this.setState({
        isOpenModalEditUser: !this.state.isOpenModalEditUser,
    })
}
createNewUser = async(data) =>{
   try {
   let response = await createNewUserService(data);
   if(response && response.errCode !==0){
    alert(response.errMessage)
   }
   else{
    await this.getAllUsersFromReact();
    this.setState({
        isOpenModalUser: false
    })
    emitter.emit('EVENT_CLEAR_MODAL_DATA',{'id':'your id'})
   }
   console.log('reponse crate user: ',response)
   } catch (e) {
    console.log(e)
   } 
    console.log("check data from child: ", data)
}

    async componentDidMount() {
       await this.getAllUsersFromReact();

    }
    handleDeleteUser = async(user) =>{
        console.log('delete click',user)
        try {
       let res = await deleteUserSerivce(user.id)
       if(res && res.errCode === 0){
        await this.getAllUsersFromReact();
       }else{
        alert(res.errMessage)
       }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) =>{
        console.log('chec edit user ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }
    doEditUser = async(user) =>{
        try {
             let res = await editUserService(user);
             if(res&& res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
             }
             else{
                alert(res.errCode)
             }
        } catch (e) {
            console.log(e)
        }
       
        
    }

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return ( <
            div className = "users-container" >
            <ModalUser 
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
            createNewUser={this.createNewUser}
            
            
            />
{
    this.state.isOpenModalEditUser &&
            <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser = {this.state.userEdit}
            editUser={this.doEditUser}
            // createNewUser={this.createNewUser}
            />}

            < div className = 'title text-center' > Manage users with an nhien

            <
            /div>
            <ModalUser></ModalUser> <
            div className = 'mx-1' >
            
            <button className = 'btn btn-primary px-3' onClick={()=>this.handleAddNewUser()}><i className='fas fa-plus'></i> add new users <
            /button></div >
            <
            div className = 'users-table mt-3 mx-2' >
            <
            table id = "customers" >
            <
            tr >
            <
            th > Email < /th> <
            th > First Name < /th> <
            th > Last Name < /th> <
            th > Address < /th> <
            th > Action < /th> < /
            tr >

            {
                arrUsers && arrUsers.map((item, index) => {
                    console.log('ereic check map', item, index)
                    return ( <
                        tr >
                        <
                        td > { item.email } < /td>     <
                        td > { item.firstName } < /td> <
                        td > { item.lastName } < /td> <
                        td > { item.address } < /td> <
                        td >
                        <
                        button className = 'btn-edit' 
                        onClick={()=> this.handleEditUser(item)}
                        > < i class = 'fas fa-pencil-alt' > < /i></button >
                        <
                        button className = 'btn-delete'
                        onClick={()=> this.handleDeleteUser(item)}
                        > < i class = "fas fa-trash" > < /i></button >
                        <
                        /td> < /
                        tr >
                    )
                })
            }



            <
            /table> < /
            div > <
            /div >
        );
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);