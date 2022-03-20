import axios from 'axios'
import { Button , DialogTitle, Dialog } from '@mui/material'

const DeleteUserModalDialog = ({ open, onClose, forceUpdate, id }) => {

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/user/delete/${id}`)
      if (response.status === 200) {
        forceUpdate()
      }
    } catch (e) {
      console.log(e)
    }
    onClose()
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Are you sure you want to delete the user?</DialogTitle>
      <Button onClick={handleDelete}>Confirm</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Dialog>
  )
}

export default DeleteUserModalDialog
