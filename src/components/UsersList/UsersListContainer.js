import React from 'react';
import {connect} from "react-redux";
import {compose} from 'redux';
import { withRouter } from "react-router";
import {
    getUsers,
    deleteUserThunk,
} from "../../store/actions/users";
import {UsersList} from "./UsersList";

class UsersListContainer extends React.Component {
    componentDidMount() {
        const {currentPage} = this.props;
        this.props.getUsers(currentPage);
    }
    onSetCurrentPage = (page) => {
        this.props.getUsers(page);
    };
    render() {
        const {
            users,
            currentPage,
            totalCount,
            perPage,
            deleteUserThunk,
        } = this.props;
        return (
            <>
                <UsersList
                    users={users}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    perPage={perPage}
                    deleteUser={deleteUserThunk}
                    onSetCurrentPage={this.onSetCurrentPage}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.UsersList.users,
        currentPage: state.UsersList.currentPage,
        totalCount: state.UsersList.totalCount,
        perPage: state.UsersList.perPage,
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {getUsers, deleteUserThunk})
)(UsersListContainer);