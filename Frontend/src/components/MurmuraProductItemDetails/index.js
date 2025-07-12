import { Component } from "react";
import { FaShoppingBag,FaRupeeSign,FaStar,FaMinus,FaPlus} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import CartContext from "../../context/CartContext";
// import Header from "../Header";
import './index.css'



class MurmuraProductItemDetails extends Component{
    state={productItemDetails:{},rate:0,count:0,itemsCount:0}

    componentDidMount(){
        this.getProductItemDetails()
    }

    getProductItemDetails=async()=>{
        const {match}=this.props 
        const {params}=match 
        const {id}=params
        const apiUrl=`http://localhost:3000/murmura-products/${id}`
        const options={
            method:'GET'
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
        // console.log(data.image_url)
        const filteredData={
            id:data._id,
            imageUrl:data.image_url,
            millName:data.mill_name,
            productName:data.product_name,
            brandName:data.brand_name,
            price:data.price,
            description:data.description
        }
        this.setState({productItemDetails:filteredData,rate:filteredData.price,count:filteredData.price})
    }

    minusBtn=()=>{
        const {itemsCount}=this.state 
        if (itemsCount>0){
            this.setState(prev=>({itemsCount:prev.itemsCount-1}))
        }
    }

    plusBtn=()=>{
        this.setState(prev=>({itemsCount:prev.itemsCount+1}))
    }

    render(){
        return(
            <CartContext.Consumer>
                {
                    value=>{
                        const {productItemDetails,rate,count,itemsCount}=this.state
                        const {imageUrl,millName,price,productName,brandName,description}=productItemDetails
                        const {addCartItem}=value 
                        const onClickAddtoCart=()=>{
                            addCartItem({...productItemDetails,itemsCount})
                        }
                        return(
                            <div>
                {/* <Header/> */}
                <div className="details-container">
                    <img src={imageUrl} alt="item" className="details-image"/>
                    <div className="details-text-container">
                        <h1 className="details-title">{productName}</h1>
                        <p className="details-des">{description}</p>
                        <p className="para"><FaShoppingBag/> {brandName} by {millName} </p>
                        <p className="para"><FaRupeeSign/> {price}/-</p>
                        {/* <p className="para"><FaStar className="star-icon"/> {rate}</p>
                        <p className="para"><IoPeople /> {count}</p>   */}
                        <div className="items-container">
                             <button type="button" className="minus-plus-btn" onClick={this.minusBtn}>
                                <FaMinus/>
                             </button>
                             <p>{itemsCount}</p>
                             <button type="button" className="minus-plus-btn" onClick={this.plusBtn}>
                                <FaPlus/>
                             </button>
                        </div>
                        <button type="button" className="buttons" onClick={onClickAddtoCart}>Add to Cart</button>
                    </div>
                </div>
                </div>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default MurmuraProductItemDetails