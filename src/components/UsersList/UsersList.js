import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';
import s from './UsersList.module.scss';

export const UsersList = (props) => {
    const {
        onSetCurrentPage,
        deleteUser,
        users,
        currentPage,
        totalCount,
        perPage
    } = props;
    return (
        <section className={s.users}>
            <Pagination
                onChange={(currentPage) => {
                    onSetCurrentPage(currentPage);
                }}
                current={currentPage}
                total={totalCount}
                pageSize={perPage}
            />
            { users.map((user) => (
                <div className={s.item} key={user.id}>
                    <div className={s.avatar}>
                        <img src={user._links.avatar.href} alt="avatar" />
                    </div>
                    <div className={s.info}>
                        <p><b>Name: </b>{' ' + user.first_name + ' ' + user.last_name}</p>
                        <p><b>Phone: </b>{user.phone}</p>
                        <p><b>Mail: </b>{user.email}</p>
                        <p><b>Website: </b>{user.website}</p>
                    </div>
                    <div className={s.buttons}>
                        <div
                            className={s.buttons__edit}
                            onClick={ () =>{}}
                        >
                            <i className="fas fa-cog"/>
                        </div>
                        <div
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                            className={s.buttons__delete}
                        >
                            <i className="fas fa-trash-alt"/>
                        </div>
                    </div>
                </div>
                )
            )}
        </section>
    )
};

UsersList.propTypes = {
    onSetCurrentPage: PropTypes.func,
    deleteUser: PropTypes.func,
    users: PropTypes.array.isRequired,
    currentPage: PropTypes.number,
    totalCount: PropTypes.number,
    perPage: PropTypes.number,
};
UsersList.defaultProps = {
    deleteUser: ()=> {},
    onSetCurrentPage: ()=> {},
    users: [],
    currentPage: 1,
    totalCount: 100,
    perPage: 20,
};