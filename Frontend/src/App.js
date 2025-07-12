import React,{Component} from 'react';
import { Switch,Route } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Home from './components/Home/index.js';
import Contact from './components/Contact/index.js';
import Login from './Login';
import Products from './components/Products/index.js';
import ProductItemDetails from './components/ProductItemDetails/index.js';
import './styles.css';
import RegistrationForm from './RegistrationForm';
import Cart from './components/Cart/index.js';
import CartContext from './context/CartContext.js';
import MurmuraProducts from './components/MurmuraProducts/index.js';
import MurmuraProductItemDetails from './components/MurmuraProductItemDetails/index.js';
import Payment from './components/Payment/index.js';
import ProtectedRoute from './components/ProtectedRoute/index.js';
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.itemsCount + 1
          return {...eachCartItem, itemsCount: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.itemsCount > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.itemsCount - 1
            return {...eachCartItem, itemsCount: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.itemsCount + product.itemsCount

            return {...eachCartItem, itemsCount: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <NavigationBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path='/login' component={Login}/>
          <Route exact path="/products" component={Products}/>
          <Route exact path="/murmura-products" component={MurmuraProducts} />
          <Route exact path="/products/:id" component={ProductItemDetails}/>
          <Route exact path="/murmura-products/:id" component={MurmuraProductItemDetails}/>
          <Route exact path='/RegistrationForm' component={RegistrationForm}/>
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/payments" component={Payment}/>
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App