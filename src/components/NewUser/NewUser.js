import React from 'react';
import styles from './NewUser.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {connect} from "react-redux";
import * as Yup from 'yup';
import cx from 'classnames';
import {Redirect} from "react-router-dom";
import MaskedInput from 'react-text-mask';

class NewUser extends React.Component {
    state = {
        redirect: false
    };
    onClickSave = (fields) => {
        console.log(fields);
        this.setState({redirect: true});
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
        return (
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    website: ""
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup
                        .string()
                        .min(3, 'Minimal 3 characters')
                        .required('First Name is required'),
                    lastName: Yup
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
                        .min(9, 'Minimal 10 characters')
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
                                <label className={styles.label} htmlFor='firstName'>First Name</label>
                                <Field
                                    type="text"
                                    id='firstName'
                                    name='firstName'
                                    placeholder='First Name'
                                    className={cx(
                                        styles.textInput,
                                        errors.firstName && touched.firstName ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor='lastName'>Last Name</label>
                            <Field
                                    type="text"
                                    id='lastName'
                                    name='lastName'
                                    placeholder='Last Name'
                                    className={cx(
                                        styles.textInput,
                                        errors.lastName && touched.lastName ?  styles.isInvalid : null
                                    )}
                                />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
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
                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
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
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
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
                                <ErrorMessage name="website" component="div" className="invalid-feedback" />
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
)}};
const mapStateToProps = (state) => {
    return {

    }
};
export default connect(mapStateToProps,{})(NewUser);