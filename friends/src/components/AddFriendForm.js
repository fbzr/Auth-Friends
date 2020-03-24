import React from 'react';
import { Collapse, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import { Form, withFormik, useField } from 'formik';
import * as yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// Material UI TextField with access to Formik Field's props and methods 
const MuiFormikTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField 
            {...field}
            {...props}
            label={label}
            error={meta.error && meta.touched}
            helperText={ (meta.error && meta.touched) && meta.error }
        />         
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))

const FriendForm = props => {
    const { isSubmitting, expanded } = props;
    const classes = useStyles();
    return (
        <Collapse className={classes.root} in={expanded} timeout="auto" unmountOnExit>
            <Form>
                <Grid container justify='space-between' alignItems='flex-end' wrap='wrap'>
                    <MuiFormikTextField style={{width: '60%'}} type='text' label='Name' name='name' id='name' />
                    <MuiFormikTextField style={{width: '30%'}} type='number' label='Age' name='age' id='age' />
                    <MuiFormikTextField style={{width: '60%'}} type='text' label='Email' name='email' id='email' />
                    <Button style={{width: '30%', height: '40px'}} disabled={isSubmitting} variant="contained" color="primary" type='submit'>Add Friend</Button>
                </Grid>
            </Form>    
        </Collapse>
    )
}

const AddFriendForm = withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        age: ''
    }),
    validationSchema: yup.object().shape({
        name: yup.string()
            .min(2, 'Name must have at least 2 characters')
            .required('Name is required'),
        email: yup.string().email()
            .required('Email is required'),
        age: yup.number()
            .required('Age is required')
    }),
    handleSubmit: (values, { resetForm, setSubmitting, props }) => {
        setSubmitting(true);
        const { name, email, age } = values;
        const data = {
            name,
            email,
            age
        }
        
        axiosWithAuth().post('/api/friends/', data)
            .then(res => {
                console.log(res);
                setSubmitting(false);
                resetForm();
                props.resetList(true);
            })
            .catch(err => console.log(err))
        
    }
})(FriendForm);

export default AddFriendForm
