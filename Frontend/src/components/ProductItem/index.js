import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import './index.css'

const ProductItem=props=>{
    const {productItem}=props 
    const {imageUrl,millName,price,id,productName,brandName,description}=productItem
    return(
        <Link to= {`/products/${id}`} className="link-text">
            <li className='list-items'>
                <img src={imageUrl} alt="item" className='product-image'/>
                <h1 className='product-title'>{millName}</h1>
                <p className='product-price'>{price}/- per Kg</p>
                <p>{productName} by {brandName}</p>
                <p>{description}</p>
                <h6 className='more-details-text'>More Details <FaArrowRight/></h6>
            </li>
        </Link>
    )
}
export default ProductItem