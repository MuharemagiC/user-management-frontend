
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography }from '@mui/material'

import DeleteUserModalDialog from '../DeleteUserModalDialog'


export default function UserCard({ first_name, last_name, username, email, status, id, forceUpdate }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const onClose = () => setOpen(false)

  const handleOpen = () => setOpen(true)

  const handleNavigateToEdit = (userId) => () => navigate(`/edit/${userId}`)

  const handleNavigateToAssign = (userId) => () => navigate(`/assign/${userId}`)

  return (
    <Box sx={{ minWidth: 300, mr: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            {first_name} {last_name}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            <b>Username:</b> {username}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            <b>Email:</b> {email}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            <b>Status:</b> {status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleNavigateToEdit(id)}>Edit</Button>
          <Button size="small" onClick={handleOpen}>Delete</Button>
          <Button size="small" onClick={handleNavigateToAssign(id)}>Assign</Button>
        </CardActions>
      </Card>
      <DeleteUserModalDialog open={open} onClose={onClose} setOpen={setOpen} forceUpdate={forceUpdate} id={id}/>
    </Box>
  );
}
