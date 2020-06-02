import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

class LoginView extends Component {

    render() {

        const {errors, values, touched, dirty, isSubmitting, handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <h1>Sign In</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="myUsername">Username</Label>
                        <Field type="email" name="myUsername" className="form-control" autoComplete="email" placeholder="Enter email" />
                        {(touched.myUsername && errors.myUsername) ? <ErrorInnerMessage name="myUsername" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="myPassword">Password</Label>
                        <Field type="password" name="myPassword" className="form-control" placeholder="Enter password" />
                        <ErrorInnerMessage name="myPassword" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Field type="checkbox" name="isRememberMe" checked={values.isRememberMe} />
                        <Label for="autoLogin" className="ml-2 mb-0">Remember me</Label><br />
                        <ErrorInnerMessage className="" name="authentication" />
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Submit</Button>
                </Form>
                <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
            </div>
        );

    }

}

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myUsername: '', myPassword: '', isRememberMe: false}),
    validationSchema: Yup.object().shape({
        myUsername: Yup.string().min(10, 'Username is too short')
                                .max(30, 'Username is too long')
                                .required('Username is required'),
        myPassword: Yup.string().min(8, 'myPassword is too short')
                                .required('myPassword is required')
    }),
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

        fetch('http://localhost:8080/authentication', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify({ 
                username: values.myUsername,
                password: values.myPassword
            }),
        })
        .then(response => response.json())
        .then(json => {
            props.history.push({pathname: '/mypage?id=' + json.id});
        })
        .catch(error => console.error('Error:', error));

    },
})(LoginView);

export default MyEnhancedForm;