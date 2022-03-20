import _ from 'lodash'
import { Pagination, Stack, Box, Button, Menu, MenuItem, TextField }from '@mui/material'

import UserCard from "../Card"
import UserListStyles from './UserListStyles.module.css'


const UserList = ({
  users,
  forceUpdate,
  count,
  onPaginationChange,
  page,
  open,
  anchorEl,
  handleClick,
  handleClose,
  handleChangeEmail,
  email,
  handleSubmitFilter,
  handleFilterClick,
  anchorElFilt,
  openFilter,
  clearFilter
}) => {

  if (_.isEmpty(users)) {
    return (
      <div className={UserListStyles.UserListEmptyWrapper}>
        Users are not available
        <Button onClick={clearFilter}>
          Clear Filters
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className={UserListStyles.UserListWrapper}>
        {
          users.map(user => (
            <div key={user.id} className={UserListStyles.UserListCardWrapper}>
              <UserCard {...user} forceUpdate={forceUpdate} />
            </div>
          ))
        }
      </div>
      <div className={UserListStyles.Pagination}>
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            ORDER BY
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem id='first_name' onClick={handleClose}>Sort by FIRST_NAME</MenuItem>
            <MenuItem id='last_name' onClick={handleClose}>Sort by LAST_NAME</MenuItem>
          </Menu>
        </Box>
        <Box>
          <Button
            id="basic-button"
            aria-controls={openFilter ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFilter ? 'true' : undefined}
            onClick={handleFilterClick}
          >
            FILTERS
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElFilt}
            open={openFilter}
            onClose={handleSubmitFilter}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem id='first_name'>
              Filter by email: 
              <TextField onChange={handleChangeEmail} value={email}/>
              <Button onClick={handleSubmitFilter}>
                Submit
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Stack spacing={2}>
          <Pagination count={count} color="primary" onChange={onPaginationChange} page={page} />
        </Stack>
        <Button onClick={clearFilter}>
          Clear Filters
        </Button>
      </div>
    </>
  )
}

export default UserList