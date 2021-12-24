import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts } from '../actions/productActions'
import { adDeleProduct, adCreProduct } from '../actions/adminActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { ADMIN_CRE_PRODUCT_RESET } from '../constants/adminConstants'

const AdProductListScreen = ({ history, match }) => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const adminDeleProduct = useSelector((state) => state.adminDeleProduct)
  const { loading: deleLoading, error: deleError, success: deleSuccess } = adminDeleProduct

  const adminCreProduct = useSelector((state) => state.adminCreProduct)
  const { loading: creLoading, error: creError, success: creSuccess, product: createdProduct } = adminCreProduct

  useEffect(() => {
    dispatch({ type: ADMIN_CRE_PRODUCT_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (creSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, deleSuccess, creSuccess, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm(`You are Deleting product ${id}`)) {
      dispatch(adDeleProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(adCreProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='button-29' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleLoading && <Loader />}
      {deleError && <Message variant='danger'>delete error</Message>}
      {creLoading && <Loader />}
      {creError && <Message variant='danger'>create error</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default AdProductListScreen
