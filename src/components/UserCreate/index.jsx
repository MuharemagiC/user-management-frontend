import { useState, useEffect } from 'react';
import { Card, CardHeader, TextField, Button, CircularProgress, Box } from '@mui/material';
import { useForm, Controller} from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserCreate = ({ isEdit, forceUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { control, handleSubmit, setValue } = useForm();
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    (isEdit) ? fetchUserById(id) : setInitialValues()
  }, [])

  const setInitialValues = () => {
    setValue('firstName', "")
    setValue('lastName', "")
    setValue('email', "")
    setValue('status', "")
    setValue('username', "")
  }

  const fetchUserById = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`/user/${id}`)
    if (response.status === 200) {
      const user = response.data
      console.log(user)
      setValue('firstName', user.first_name)
      setValue('lastName', user.last_name)
      setValue('email', user.email)
      setValue('status', user.status)
      setValue('username', user.username)
    }
    } catch (e) {
      setMessage('Problem with fetching user...')
    }
    setLoading(false)
  }

  const onSubmitUser = async (axiosMethod, route, data, statusCode, successMessage, errorMessage) => {
    setLoading(true)
    try {
      const response = await axiosMethod(route, data)
    if (response.status === statusCode) {
      setMessage(successMessage)
      forceUpdate()
      navigate('/')
    }
    } catch (e) {
      setMessage(errorMessage)
    }
    setLoading(false)
  }

  const onSubmit = async data => {
    if (isEdit) {
      await onSubmitUser(
        axios.put,
        `/user/update/${id}`,
        data,
        200,
        'Successfuly edit user',
        'Something went wrong!'
      )
    } else {
      await onSubmitUser(
        axios.post,
        `/user/create`,
        data,
        201,
        'Successfuly added user',
        'User with this email or username already exist'
      )
    }
  }

  return (
    <Card style={{ width: '50%', margin: '0 auto', marginTop: '100px', padding: '30px' }}>
      <CardHeader 
      title={!isEdit ? 'Add user ' : 'Edit user '}
      action={
        <Box>
          { loading && <CircularProgress /> }
        </Box>
      }
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="First Name"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'First name required' }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Last Name"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'Last name required' }}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'Email required' }}
      />
      {!isEdit && <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'Password required' }}
      />}
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Username"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'Username required' }}
      />
      <Controller
        name="status"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Status"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 2 }}
          />
        )}
        rules={{ required: 'Status required' }}
      />
      <div>
        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          { !isEdit ? 'Submit' : 'Save' }
        </Button>
        <div style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center' }}>
        { message }
        </div>
      </div>
    </form>
    </Card>
  )
}

export default UserCreate