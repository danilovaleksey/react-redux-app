import React from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './NewUser.module.scss';
import preloader from './img/preloader.gif';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import {
    createNewUser
} from '../../store/actions/users'


class NewUser extends React.Component {
    static propTypes = {
        preloader: PropTypes.bool,
    };
    static defaultProps = {
        preloader: false,
    };
    state = {
        redirect: false
    };
    onClickSave = (fields) => {
        const {createNewUser} = this.props;
        createNewUser(fields);
    };
    onClickClose = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true,
        })
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
        if (this.props.preloader) {
            return  <div className={styles.preloadPage}>
                <img src={preloader} alt={'preloader'}/>
            </div>
        }
        return (
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    phone: "",
                    email: "",
                    website: "",
                    gender: "male"
                }}
                validationSchema={Yup.object().shape({
                    first_name: Yup
                        .string()
                        .min(3, 'Minimal 3 characters')
                        .required('First Name is required'),
                    last_name: Yup
                        .string()
                        .min(3, 'Minimal 3 characters')
                        .required('Last Name is required'),
                    phone: Yup
                        .string()
                        .matches(/^\d\s.\d\d\d.\s\d\d\d.\d\d\d\d/, 'Phone number is not valid')
                        .required('Phone number is required'),
                    email: Yup
                        .string()
                        .email('Email is not valid')
                        .required('Email is required'),
                    website: Yup
                        .string()
                        .url()
                        .required('Website  is required')
                })}
                onSubmit={fields => {
                    this.onClickSave(fields);
                }}
                render={({ errors, status, touched }) => (
                    <div className={styles.wrapper}>
                        <h3>New User</h3>
                        <Form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='first_name'>First Name</label>
                                <Field
                                    type="text"
                                    id='first_name'
                                    name='first_name'
                                    placeholder='First Name'
                                    className={cx(
                                        styles.textInput,
                                        errors.first_name && touched.first_name ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="first_name" component="div" className={styles.invalidFeedback} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='last_name'>Last Name</label>
                            <Field
                                    type="text"
                                    id='last_name'
                                    name='last_name'
                                    placeholder='Last Name'
                                    className={cx(
                                        styles.textInput,
                                        errors.last_name && touched.last_name ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="last_name" component="div" className={styles.invalidFeedback}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='gender'>Gender</label>
                                <Field component="select"
                                       name="gender"
                                       id='gender'
                                       className={styles.select}
                                >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className={styles.invalidFeedback} />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='phone'>Phone</label>
                                <Field
                                    name={'phone'}
                                    render={({ field }) => {
                                    return <MaskedInput mask={[8, ' ' , '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                        {...field}
                                                        id="phone"
                                                        placeholder="Phone"
                                                        className={cx(
                                                            styles.textInput,
                                                            errors.phone && touched.phone ?  styles.isInvalid : null
                                                        )}/>
                                }} />
                                <ErrorMessage name="phone" component="div" className={styles.invalidFeedback} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='email'>E-mail</label>
                                <Field
                                    type="text"
                                    id='email'
                                    name='email'
                                    placeholder="Email"
                                    className={cx(
                                        styles.textInput,
                                        errors.email && touched.email ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="email" component="div" className={styles.invalidFeedback} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='website'>Website</label>
                                <Field
                                    component="textarea"
                                    type="text"
                                    id='website'
                                    name="website"
                                    placeholder="Website"
                                    className={cx(
                                        styles.textArea,
                                        errors.website && touched.website ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="website" component="div" className={styles.invalidFeedback} />
                            </div>
                            <div className={styles.formButtons}>
                                <button
                                    className={styles.saveButton}
                                    type="submit"
                                >Save</button>
                                <button
                                    className={styles.closeButton}
                                    type="submit"
                                    onClick={this.onClickClose}
                                >Close</button>
                            </div>
                        </Form>
                    </div>
                )}
            />
)}}
const mapStateToProps = (state) => {
    return {
        preloader: state.UsersList.preloader,
    }
};
export default connect(mapStateToProps,{createNewUser})(NewUser);