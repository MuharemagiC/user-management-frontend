import { useState, useEffect } from 'react'
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Tooltip,
  CircularProgress,
  Divider,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import RestoreIcon from '@mui/icons-material/Restore'
import { useForm, Controller } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import AssignRoleStyles from './AssignRoleStyles.module.css'

const AssignRoleComponent = () => {
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [update, setUpdate] = useState(0)
  const { control, handleSubmit, setValue } = useForm()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoles(id)
  }, [update])

  const forceUpdate = () => setUpdate(prevState => prevState + 1)

  const fetchRoles = async (userId) => {
    setLoading(true)
    try {
      const response = await axios.get(`/roles/list/${userId}`)
      if (response.status === 200) {
        setRoles(response.data)
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const deleteRole = async (roleId) => {
    setLoading(true)
    try {
      const response = await axios.delete(`/roles/delete/${roleId}`)
      if (response.status === 200) {
        forceUpdate()
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  const createRole = async (userId, data) => {
    setLoading(true)
    try {
      const response = await axios.post(`/roles/create/${userId}`, data)
      if (response.status === 200) {
        setValue('code', '')
        setValue('description', '')
        forceUpdate()
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const onSubmit = async data => {
    createRole(id, data)
  };

  const handleDelete = (id) => () => deleteRole(id)

  const handleBack = () => navigate('/')

  if (loading) {
    return (
      <div className={AssignRoleStyles.AssignRoleWrapper}>
        <CircularProgress />
      </div>
    )
  }
  
  const renderRoles = () => {
    if (_.isEmpty(roles)) {
      return <div className={AssignRoleStyles.AssignEmpty}>Roles are not available</div>
    }

    return (
      <Box className={AssignRoleStyles.Roles}>
        {
          roles.map(item => (
            <Box className={AssignRoleStyles.RolesItem} key={item.id}>
              <Typography>Description: {item.description}</Typography>
              <Typography>Code: {item.code}</Typography>
              <Button onClick={handleDelete(item.id)} style={{ marginTop: '-8px' }}><DeleteIcon /></Button>
            </Box>
          ))
        }
      </Box>
    )
  }
  
  return (
    <div className={AssignRoleStyles.AssignRoleWrapper}>
      <Card>
        <CardHeader 
          title="User roles"
          subheader="Add or Delete user role"
          action={
            <Button aria-label="settings" onClick={handleBack}>
              <Tooltip title='Return to home page'>
                <RestoreIcon />
              </Tooltip>
            </Button>
          }
        />
        <CardContent>
          { renderRoles() }
          <Divider style={{ width: '100%' }} />
          <Box>
            <form onSubmit={handleSubmit(onSubmit)} className={AssignRoleStyles.AssignRoleForm}>
              <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="Code"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="number"
                    sx={{ mb: 2 }}
                  />
                )}
                rules={{ required: 'Code required' }}
              />
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ mb: 2, ml: 1, mr: 1 }}
                  />
                )}
                rules={{ required: 'Description required' }}
              />
              <div>
                <Button type="submit" variant="contained" color="primary" className={AssignRoleStyles.Button}>
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </CardContent>
    </Card>
  </div>
  )
}

export default AssignRoleComponent