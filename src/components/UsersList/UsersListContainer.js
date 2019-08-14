import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux';
import { withRouter } from "react-router";
import {Redirect} from "react-router-dom";
import {
    getUsers,
    changeUrl,
    deleteUser,
} from "../../store/actions/users";

import {UsersList} from "./ui/UsersList";


class UsersListContainer extends React.Component {
    state = {
        redirect: false,
    };
    static propTypes = {
        users: PropTypes.array.isRequired,
        currentPage: PropTypes.number,
        totalCount: PropTypes.number,
        perPage: PropTypes.number,
        getUsers: PropTypes.func.isRequired,
        changeUrl: PropTypes.func.isRequired,
        deleteUser: PropTypes.func,
    };
    static defaultProps = {
        users: [],
        currentPage: 1,
        totalCount: 100,
        perPage: 20,
        getUsers: ()=>{},
        changeUrl: ()=>{},
        deleteUser: ()=>{},
    };
    componentDidMount() {
        const { page } = this.props.match.params;
        const { getUsers, currentPage } = this.props;
        if (page !== undefined) {
            if (currentPage ===  1) {
                getUsers(Number(page));
            }
        } else {
            getUsers(1);
        }
    }
    onSetCurrentPage = (page) => {
        const {changeUrl, getUsers} = this.props;
        if (page === 1) {
            this.setState({redirect: true});
        } else {
            changeUrl(page);
            getUsers(page);
        }
    };
    render() {
        const {
            users,
            currentPage,
            totalCount,
            perPage,
            deleteUser,
        } = this.props;

        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }

        return (
                <UsersList
                    users={users}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    perPage={perPage}
                    deleteUser={deleteUser}
                    onSetCurrentPage={this.onSetCurrentPage}
                />
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