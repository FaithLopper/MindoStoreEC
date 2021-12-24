import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { adUpdateProduct, adNewSize } from '../actions/adminActions'
import { ADMIN_UP_PRODUCT_RESET } from '../constants/adminConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {

  const productId = match.params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [allSize, setAllSize] = useState([])
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const adminUpProduct = useSelector(state => state.adminUpProduct)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, } = adminUpProduct

  const adminNewSize = useSelector(state => state.adminNewSize)
  const { loadingNewSize } = adminNewSize

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UP_PRODUCT_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setAllSize(product.allSize)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  const addNewSize = () => {
    dispatch(adNewSize({ _id: productId }))
  }

  const reloadSize = () => {
    dispatch(listProductDetails(productId))
  }

  const deleSize = (id) => {
    setAllSize(allSize.filter(size => size._id !== id))
  }

  const changeSize = (id, newName) => {
    const index = allSize.findIndex(sizes => sizes._id === id)
    allSize[index].size = Number(newName)
  }

  const changeQty = (id, newQty) => {
    const index = allSize.findIndex(sizes => sizes._id === id)
    allSize[index].qty = Number(newQty)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      adUpdateProduct({ _id: productId, name, price, image, brand, category, description, allSize })
    )
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>update error</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>error</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label><h4>Name</h4></Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label><h4>Price</h4></Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label><h4>Image</h4></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label><h4>Brand</h4></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label><h4>Sizes</h4></Form.Label>
              {allSize.map(sizes => (
                <Row>
                  <Col>
                    <input id={sizes._id} type="number" defaultValue={sizes.size}
                      onChange={e => changeSize(e.target.id, e.target.value)} />
                  </Col>
                  <Col>
                    <input id={sizes._id} type="number" defaultValue={sizes.qty}
                      onChange={e => changeQty(e.target.id, e.target.value)} />
                  </Col>
                  <Col>
                    <Button variant='danger' className='btn-sm'
                      onClick={() => deleSize(sizes._id)}><i className='fas fa-trash'></i></Button>
                  </Col>
                </Row>
              ))}
              <Button onClick={() => addNewSize()} variant='primary'>Add new size</Button>
              <Button onClick={() => reloadSize()} variant='primary'>Reload size</Button>
              {loadingNewSize && <Loader />}
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label><h4>Category</h4></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label><h4>Description</h4></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}

      </FormContainer>
    </>
  )
}

export default ProductEditScreen
