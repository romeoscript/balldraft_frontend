// ProfileForm.js
"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import {
    TextField,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Checkbox, FormControlLabel } from '@mui/material';

const MuiFormikCheckbox = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
        <FormControlLabel
            className="my-[0.5rem]"
            control={<Checkbox {...field} checked={field.value} color="primary" />}
            label={label}
        />
    );
};

const StyledTextField = styled(TextField)(({ error }) => ({
    ...(error && {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
    }),
}));

const MuiFormikField = ({ field, form: { touched, errors }, icon, ...props }) => (
    <FormControl fullWidth error={touched[field.name] && !!errors[field.name]}>
        <StyledTextField
            {...field}
            {...props}
            error={touched[field.name] && !!errors[field.name]}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
            }}
        />
        {touched[field.name] && errors[field.name] && (
            <FormHelperText>{errors[field.name]}</FormHelperText>
        )}
    </FormControl>
);

const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().when('showNewPassword', {
        is: true,
        then: Yup.string().required("New password is required")
    }),
    confirmPassword: Yup.string().when('showNewPassword', {
        is: true,
        then: Yup.string()
            .required("Please confirm your new password")
            .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    }),
});

const Changepassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        rememberMe: false,
        showNewPassword: false
    };

    const onSubmit = (values) => {
        console.log(values);
        // Handle form submission
    };

    return (
        <div className="p-6 rounded-lg w-[70%]">
            <Formik
                initialValues={initialValues}
                validationSchema={ChangePasswordSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="text-center my-[1rem]">
                            <h2 className="font-bold text-2xl">Change Your Password</h2>
                            <p>To enhance your security, please update your password below.</p>
                        </div>

                        {!showNewPassword && (
                            <>
                                <Field
                                    name="currentPassword"
                                    component={MuiFormikField}
                                    label="Current Password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    icon={<LockIcon />}
                                />
                                <Button
                                    type="button"
                                    className="bg-[#012C51] w-full text-white p-[1rem] hover:bg-[#4096FF] rounded-[30px]"
                                    onClick={() => {
                                        setShowNewPassword(true);
                                        setFieldValue("showNewPassword", true);
                                    }}
                                >
                                    Continue
                                </Button>
                            </>
                        )}

                        {showNewPassword && (
                            <>
                                <Field
                                    name="newPassword"
                                    component={MuiFormikField}
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    icon={<LockIcon />}
                                />
                                <Field
                                    name="confirmPassword"
                                    component={MuiFormikField}
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    icon={<LockIcon />}
                                />
                                <MuiFormikCheckbox
                                    name="rememberMe"
                                    label="By clicking “Save change” you confirm that you are the account holder and authorize the Email Address update."
                                />
                                <Button
                                    type="submit"
                                    className="bg-[#012C51] w-full text-white p-[1rem] hover:bg-[#4096FF] rounded-[30px]"
                                    disabled={isSubmitting}
                                >
                                    Save Changes
                                </Button>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Changepassword;
