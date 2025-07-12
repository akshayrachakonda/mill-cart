import {Component} from 'react'
import ProductItem from '../ProductItem'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './index.css'

const apiStatusConstants={
    initial:'INITIAL',
    inProgress:'IN_PROGRESS',
    success:'SUCCESS'
}

class Products extends Component{
    state={productsList:[],apiStatus:apiStatusConstants.initial}

    componentDidMount(){
        this.getProductItems()
    }

    getProductItems=async()=>{
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const apiUrl='http://localhost:3000/gram-products'
        const options={
            method:'GET'
        }
        const response=await fetch(apiUrl,options);
        const data=await response.json()
        const filteredData=data.map((each)=>({
            id:each._id,
            imageUrl:each.image_url,
            millName:each.mill_name,
            productName:each.product_name,
            brandName:each.brand_name,
            price:each.price,
            description:each.description
        }))
        this.setState({productsList:filteredData,apiStatus:apiStatusConstants.success})
    }

    renderSuccessView=()=>{
        const {productsList}=this.state 
        return(
        <div className='products-container-main'>
                <h1 className='product-head'>Products</h1>
                <ul type="none" className='products-container'>
                    {productsList.map((each)=><ProductItem productItem={each} key={each.id}/>)}
                </ul>
            </div>
    )}

    renderLoaderView=()=>(
        <div className="products-details-loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    render(){
        const {apiStatus}=this.state 
        switch(apiStatus){
            case apiStatusConstants.inProgress:
                return this.renderLoaderView()
            case apiStatusConstants.success:
                return this.renderSuccessView()
            default:
                return null
        }
       
    }
}

export default Products