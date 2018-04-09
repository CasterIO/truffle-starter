import React, { Component } from 'react'
import Rental from '../build/contracts/Rental.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/grids-responsive-min.css'
import './App.css'

import rentals from './data/rentals.json'

// function RentalItem(props) {
//     return (
//       <div key={props.rental.id} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
//           <h3>{props.rental.model}</h3>
//           <h4>{props.rental.year} {props.rental.make}</h4>
//           <img src={require(props.rental.image)} alt="Car props.rental" width="100" />
//           <button 
//             onClick={() => this.handleRentMe(props.rental.id)}
//             className="pure-button pure-button-primary">
//             Rent Me
//           </button>
//       </div>
//     )
// }

class RentalItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        // this.setState({
        //     disabled: !this.state.disabled
        // })
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
                    Rent Me
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
    const contract = require('truffle-contract')
    const rental = contract(Rental)
    rental.setProvider(this.state.web3.currentProvider)
    let rentalInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
        rental.deployed().then((instance) => {
            rentalInstance = instance
            return rentalInstance.getRentals.call()
        }).then((result) => {
            console.log('Rental Status on init')
            console.log(result)
            this.setState({
                renters: result
            })
            for (let i = 0; i < result.length; i++) {
                if (result[i] !== '0x0000000000000000000000000000000000000000') {
                    this.markRented(i)
                }
            }
        }).catch((err) => {
            console.log('Error listing rentals')
            console.log(err)
        })
    })
  }

  handleRentMe(id) {
      console.log(`Clicked button ${id}`)
      let rentalInstance
      const contract = require('truffle-contract')
      const rental = contract(Rental)
      rental.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
          rental.deployed().then((instance) => {
              console.log(`accounts: ${accounts[0]}`)
              rentalInstance = instance
              return rentalInstance.rent(id, {from: accounts[0]})
          }).then((result) => {
              console.log('Successfully rented')
              console.log(result)
              this.handleGetRentals()
          }).catch((err) => {
              console.log('Error renting car')
              console.log(err)
          })
      })
  }

  handleGetRentals() {
      console.log('Refreshing rental state from network')
      let rentalInstance
      const contract = require('truffle-contract')
      const rental = contract(Rental)
      rental.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((err, accounts) => {
          rental.deployed().then((instance) => {
              rentalInstance = instance
              return rentalInstance.getRentals.call()
          }).then((result) => {
              console.log(result)
          }).catch((err) => {
              console.log('Error fetching rentals')
              console.log(err)
          })
      })
  }

  handleGetRentalById(id) {
      console.log('Getting this rental')
      let rentalInstance
      const contract = require('truffle-contract')
      const rental = contract(Rental)
      rental.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((err, accounts) => {
          rental.deployed().then((instance) => {
              rentalInstance = instance
              return rentalInstance.rentals(id)
          }).then((result) => {
              console.log(result)
          }).catch((err) => {
              console.log('Error getting rental')
              console.log(err)
          })
      })
  }

  markRented(id) {
      console.log(`Rental ${id} should be marked as rented`)
  }

  isRented(id, available) {
      console.log(id)
      console.log(this.state.renters[id])
      if (available === true && this.state.renters[id] === '0x0000000000000000000000000000000000000000') {
          return false
      } else {
          return true
      }
  }

  render() {
    console.log('Rendering')
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Caster.io Blockchain Track</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-lg-1-2"><h1>Rentals</h1></div>
            <div className="pure-u-1 pure-u-lg-1-2"><p>View all rentals here. If available, you may rent a car by selecting the "Rent Now" button. Your account will be debited 5eth.</p></div>
            {rentals.map( (rental) => {
                return (
                    <RentalItem 
                        key={rental.id}
                        id={rental.id}
                        make={rental.make}
                        model={rental.model}
                        year={rental.year}
                        image={rental.image}
                        disabled={this.isRented(rental.id, rental.available)}
                        handleRentMe={this.handleRentMe}/>
                    )
                // return <RentalItem key={rental.id} rental={rental} onClick={this.handleRentMe} />
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App
