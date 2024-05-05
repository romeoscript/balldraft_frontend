// ProfileForm.js
"use client"
import Icon from '@/Reusable/Icons/Icons';
import React from 'react';
import { Formik, Form, Field, useField } from 'formik';
import { TextField, Button, FormControl, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EventIcon from '@mui/icons-material/Event';
import * as Yup from 'yup';
import AuthLayout from '@/components/AuthLayout';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Loader from '@/components/Loader';
import { Checkbox, FormControlLabel } from '@mui/material';
import google from '@/public/images/google.svg';
import Image from 'next/image';


const MuiFormikCheckbox = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
        <FormControlLabel
            className='my-[0.5rem]'
            control={<Checkbox {...field} checked={field.value} color="primary" />}
            label={label}
        />
    );
};
const StyledTextField = styled(TextField)(({ theme, error }) => ({
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
const Changepassword = () => {
   

    const initialValues = {
        Newpassword: '',
        Cpassword: '',
        rememberMe: false,
    };

    const onSubmit = (values) => {
        console.log(values);
        // Handle form submission
    };
    return (
        <div className="p-6 rounded-lg w-[70%]">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='text-center my-[1rem]'>
                            <h2 className='font-bold text-2xl'>Change Your Password</h2>
                            <p>To enhance your security, please update your password below.</p>
                        </div>


                        <Field
                            name="Newpassword"
                            component={MuiFormikField}
                            label="New Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            icon={<LockIcon />}
                        />
                        <Field
                            name="Cpassword"
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
                        <br />
                        <Button type="submit" className='bg-[#012C51] w-full text-white p-[1rem] hover:bg-[#4096FF] rounded-[30px]' disabled={isSubmitting}>
                           Save Changes
                        </Button>
                       
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Changepassword;
