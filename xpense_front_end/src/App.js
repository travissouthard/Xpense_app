import React from 'react';

import BudgetTable from './components/BudgetTable'



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
        <BudgetTable budget={this.state.budget} />
      </div>
    )
  }
}

export default App;