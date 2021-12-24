import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { adUpdateUser, adGetUserById } from '../actions/adminActions'
import { ADMIN_UPDATE_USER_RESET } from '../constants/adminConstants'

const AdUserEditScreen = ({ match, history }) => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const userId = match.params.id

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = adminUpdateUser

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET })
      history.push('/admin/users')
    }
    else {
      if (!user.name || user._id !== userId) {
        dispatch(adGetUserById(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adUpdateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>update error</Message>}
        {loading
          ? (<Loader />)
          : error ? (<Message variant='danger'>get user profile error</Message>)
            : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
              </Form>
            )}
      </FormContainer>
    </>
  )
}

export default AdUserEditScreen
