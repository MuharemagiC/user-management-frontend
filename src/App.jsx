import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import _ from 'lodash'

import './App.css'
import NavBar from './components/NavBar'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'
import AssignRoleComponent from './components/AssignRoleComponent'

function App() {
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(0)
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElFilt, setAnchorElFilt] = useState(null)
  const [email, setEmail] = useState('')
  const open = Boolean(anchorEl)
  const openFilter = Boolean(anchorElFilt)

  const handleSubmitFilter = () => {
    if (!_.isEmpty(email)) forceUpdate()
    setAnchorElFilt(null)
  }

  const clearFilter = () => {
    setEmail('')
    forceUpdate()
    handleSubmitFilter()
  }

  const handleFilterClick = (e) => setAnchorElFilt(e.currentTarget)
  
  const handleChangeEmail = (e) => setEmail(e.target.value)

  const handleSortClick = (event) => setAnchorEl(event.currentTarget)

  const handleCloseSort = (e) => {
    setSort(e.target.id)
    if (e.target.id) forceUpdate()
    setAnchorEl(null)
  }

  useEffect(() => {
    fetchUsers()
  }, [update])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/user/list?page=${page}&orderBy=${sort}&filterEmail=${email}`)
      if (response.status === 200) {
        setUsers(response.data.results)
        setCount(Math.ceil(response.data.count / 10))
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const forceUpdate = () => setUpdate(prevState => prevState + 1)

  const handleChange = (e, value) => {
    setPage(value)
    forceUpdate()
  }

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className='loader'><CircularProgress /></div>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <UserList
            users={users}
            forceUpdate={forceUpdate}
            count={count}
            onPaginationChange={handleChange}
            page={page}
            open={open}
            handleClick={handleSortClick}
            handleClose={handleCloseSort}
            anchorEl={anchorEl}
            handleChangeEmail={handleChangeEmail}
            email={email}
            handleSubmitFilter={handleSubmitFilter}
            handleFilterClick={handleFilterClick}
            anchorElFilt={anchorElFilt}
            openFilter={openFilter}
            clearFilter={clearFilter}
          />
        }/>
        <Route path="/create" element={<UserCreate forceUpdate={forceUpdate}/>} />
        <Route path="/edit/:id" element={<UserCreate isEdit forceUpdate={forceUpdate}/>} />
        <Route path="/assign/:id" element={<AssignRoleComponent />} />
      </Routes>
    </div>
  )
}
 
export default App
