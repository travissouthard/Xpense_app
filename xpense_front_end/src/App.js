import React from 'react';

import BudgetTable from './components/BudgetTable'
import TransactionForm from './components/TransactionForm';



const baseUrl = 'http://localhost:3003';
//TODO setup env file for front end
// let baseUrl;
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = 'http://localhost:3000';
// } else {
//   baseUrl = 'https://peaceful-stream-27012.herokuapp.com';
// }
console.log('current base URL:', baseUrl);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      budget: []
    }
  }


  getBudget = () => {
    fetch(baseUrl + '/').then(res => {
      console.log(baseUrl)
      return res.json();
    }).then(data => {
      this.setState({
        budget: data
      });
    });
  }

  componentDidMount() {
    this.getBudget();
  }

  render() {
    return (
      <div>
        <h1>Xpense App</h1>
        <TransactionForm budget={this.state.budget}/>
        <BudgetTable budget={this.state.budget} />
      </div>
    )
  }
}

export default App;