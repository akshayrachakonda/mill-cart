import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import './index.css'

const MurmuraItem=props=>{
    const {productItem}=props 
    const {imageUrl,millName,price,id,productName,brandName,description}=productItem
    return(
        <Link to= {`/murmura-products/${id}`} className="link-text">
            <li className='list-items'>
                <img src={imageUrl} alt="item" className='product-image'/>
                <h1 className='product-title'>{millName}</h1>
                <p className='product-price'>{price}/- per Kg</p>
                <p>{productName} by {brandName}</p>
                <p>{description}</p>
                <p className='more-details-text'>More Details <FaArrowRight/></p>
            </li>
        </Link>
    )
}

export default MurmuraItem