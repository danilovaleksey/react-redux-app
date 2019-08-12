import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux';
import { withRouter } from "react-router";
import {
    getUsers,
    changeUrl,
    deleteUser,
} from "../../store/actions/users";

import {UsersList} from "./UsersList";


class UsersListContainer extends React.Component {
    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        changeUrl: PropTypes.func.isRequired,
        deleteUser: PropTypes.func,
        users: PropTypes.array.isRequired,
        currentPage: PropTypes.number,
        totalCount: PropTypes.number,
        perPage: PropTypes.number,
    };
    static defaultProps = {
        getUsers: ()=>{},
        changeUrl: ()=>{},
        deleteUser: ()=>{},
        users: [],
        currentPage: 1,
        totalCount: 100,
        perPage: 20,
    };
    componentDidMount() {
        const {page} = this.props.match.params;
        const {getUsers, currentPage} = this.props;
        if (page !== undefined) {
            getUsers(Number(page));
        } else {
            getUsers(currentPage);
        }
    }
    onSetCurrentPage = (page) => {
        this.props.changeUrl(page);
        this.props.getUsers(page);
    };
    render() {
        const {
            users,
            currentPage,
            totalCount,
            perPage,
            deleteUser,
        } = this.props;
        return (
            <>
                <UsersList
                    users={users}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    perPage={perPage}
                    deleteUser={deleteUser}
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
    connect(mapStateToProps, {
        getUsers,
        changeUrl,
        deleteUser,
    }),
    withRouter,
)(UsersListContainer);