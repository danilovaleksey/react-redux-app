import React from 'react';
import {connect} from "react-redux";
import {getUsers} from "../../store/actions/users";
import {UsersList} from "./UsersList";

class UsersListContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        const {users} = this.props;
        return (
            <>
                <UsersList
                    users={users}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.UsersList.users
    }
};

export default connect(mapStateToProps, {getUsers})(UsersListContainer);