import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { adListUsers, adDeleUser } from '../actions/adminActions'

const AdUsersListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const adminListAllUsers = useSelector(state => state.adminListAllUsers)
    const { loading, error, usersList } = adminListAllUsers

    const adminDeleUser = useSelector((state) => state.adminDeleUser)
    const { loading: deleLoading, success, error: deleError } = adminDeleUser

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!userInfo.isAdmin) {
                history.push('/')
            }
            else {
                dispatch(adListUsers())
            }
        }
    }, [dispatch, history, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm(`you are deleting user ${id}`)) {
            dispatch(adDeleUser(id))
        }
    }

    return (
        <>
            <h1>All Customers</h1>
            {loading ? (<Loader />)
                : error ? (<Message variant='danger'>Error</Message>)
                    : (
                        <Table responsive striped bordered hover className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>FullName</th>
                                    <th>Email</th>
                                    <th>isAdmin</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.isAdmin
                                                ? (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                                : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(user._id)}><i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    {deleLoading && <Loader />}
                    {deleError && <Message variant='danger'>Error</Message>}
                    {success && <Message variant='success'>delete success</Message>}

        </>
    )
}

export default AdUsersListScreen
