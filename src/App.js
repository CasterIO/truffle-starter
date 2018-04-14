import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/pure-min.css'
import './css/grids-responsive-min.css'
import './App.css'

import rentals from './data/rentals.json'

class RentalItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        this.props.handleRentMe(id)
    }

    render() {
        return (
            <div key={this.props.id} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <h3>{this.props.model}</h3>
                <h4>{this.props.year} {this.props.make}</h4>
                <img src={require(this.props.image)} alt="Car props.rental" width="100" />
                <button 
                    onClick={() => this.handleClick(this.props.id)} 
                    className="pure-button pure-button-primary"
                    disabled={this.props.disabled}>
                    Rent Me for Ξ{this.props.price}
                </button>
            </div>
        )
    }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      rentalStatus: null,
      renters: []
    }
    this.handleRentMe = this.handleRentMe.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    // add your code to handle initial page load here
    console.log('instantiateContract fired')
  }

  handleRentMe(id) {
      // add code to rent vehicle here
      console.log('handleRentMe fired')
  }

  handleGetRentals() {
      // add code to get all rentals here
      console.log('handleGetRentals fired')
  }

  handleGetRentalById(id) {
      // add code to get a single rental here
      console.log('handleGetRentalById fired')
  }

  isRented(id, available) {
      if (available === true && this.state.renters[id] === '0x0000000000000000000000000000000000000000') {
          return false
      } else {
          return true
      }
  }

  getContractBalance() {
      // add code to get Ether value of contract here
      console.log('getContractBalance fired')
  }

  render() {
    console.log('Rendering')
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">>
            <img className="pure-menu-heading" src={require('./images/caster_logo.png')} alt="Caster.io" width="32" />
            <a href="#" className="pure-menu-heading pure-menu-link">Caster.io Blockchain Track</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-lg-1-2"><h1>Rentals</h1></div>
            <div className="pure-u-1 pure-u-lg-1-2"><p>View all rentals here. If available, you may rent a car by selecting the "Rent Now" button.</p></div>
            {rentals.map( (rental) => {
                return (
                    <RentalItem 
                        key={rental.id}
                        id={rental.id}
                        make={rental.make}
                        model={rental.model}
                        year={rental.year}
                        image={rental.image}
                        price={rental.price}
                        disabled={this.isRented(rental.id, rental.available)}
                        handleRentMe={this.handleRentMe}/>
                    )
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App
