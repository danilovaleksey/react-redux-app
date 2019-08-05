import React from 'react';
import PropTypes from 'prop-types';
import s from './UsersList.module.scss';

export const UsersList = (props) => {
    const {users} = props;
    return (
        <section className={s.users}>
            <h3>Users</h3>
            {users.map((user) => (
                    <div className={s.user_item} key={user.id}>
                        <div className={s.user_avatar}>
                            <img src={user._links.avatar.href} alt="avatar" />
                        </div>
                        <div className={s.user_info}>
                            <p><b>Name: </b>{' ' + user.first_name + ' ' + user.last_name}</p>
                            <p><b>Phone: </b>{user.phone}</p>
                            <p><b>Mail: </b>{user.email}</p>
                            <p><b>Website: </b>{user.website}</p>
                        </div>
                        <div className={s.user_buttons}>
                            <div
                                className={s.user_edit_button}
                                onClick={ () =>{}}
                            >
                                <i className="fas fa-cog"/>
                            </div>
                            <div
                                onClick={() => {

                                }}
                                className={s.user_delete_button}
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
    users: PropTypes.array.isRequired,
};
UsersList.defaultProps = {
    users: [],
};