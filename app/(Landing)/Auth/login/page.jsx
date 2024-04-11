'use client'
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
const MuiFormikDatePicker = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={{ width: '100%' }}
                label={label}
                value={field.value}
                onChange={(date) => helpers.setValue(date)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched && meta.error ? meta.error : null}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <IconButton>
                                    <EventIcon />
                                </IconButton>
                            ),
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

const Page = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const onSubmit = (values) => {
        console.log(values);
        // Handle form submission
    };

    return (

        <AuthLayout>
            {/* <Loader /> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='text-center my-[1rem]'>
                            <h2 className='font-bold text-2xl'>Sign In</h2>
                            <p>Welcome back! Please enter your details</p>
                        </div>
                        <Field
                            name="email"
                            component={MuiFormikField}
                            label="Email Address"
                            variant="outlined"
                            margin="normal"
                            icon={<EmailIcon />}
                        />

                        <Field
                            name="password"
                            component={MuiFormikField}
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            icon={<LockIcon />}
                        />
                        <MuiFormikCheckbox
                            name="rememberMe"
                            label="remember me"
                        />
                        <br />
                        <Button type="submit" className='bg-[#012C51] w-full text-white p-[1rem] hover:bg-[#4096FF] rounded-[30px]' disabled={isSubmitting}>
                            Sign in <ArrowForwardIcon />
                        </Button>
                        <div className='flex gap-4 my-[1.5rem] items-center justify-center'>
                            <aside className='w-2/5 border-[1px] border-[black] h-[2px]'></aside>
                            or
                            <aside className='w-2/5 border-[1px] border-[black] h-[2px]'></aside>
                        </div>
                        <button type="submit" className=' flex items-center justify-center text-[black] border-[2px] border-[#012C51] w-full text-white p-[0.7rem] bg-white hover:bg-white rounded-[30px]' disabled={isSubmitting}>
                            Continue with <Image src={google} height={20} className='ml-[0.5rem]' alt="" />
                        </button>

                        <div className='mb-[2rem]'>
                            <p className='text-center mt-[1rem]'>
                                Yet to Create an account?{' '}
                                <a href="#" className='text-[#012C51] hover:underline'>
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default Page;
