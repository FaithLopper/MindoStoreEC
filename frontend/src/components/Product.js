import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card className ='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'></Card.Img>
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`} style={{textDecoration: 'none',fontWeight: 'bold',fontSize:20,height:'5rem',display:'flex'}}>
               <Card.Title as='div'>{product.name}</Card.Title>
            </Link>
            <Card.Text as='div'> 
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
             </Card.Text>
             
             <Card.Text as='h3' style={{marginTop:'15px'}}>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
