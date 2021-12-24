import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])



    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? (<Loader />)
                    : error ? (<Message variant='danger'>{error}</Message>)
                        : (<>
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={4} md={30} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate
                                pages={pages}
                                page={page}
                                keyword={keyword ? keyword : ''} />
                        </>)
            }
        </>
    )
}

export default HomeScreen
