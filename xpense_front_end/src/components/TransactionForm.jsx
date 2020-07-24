import React, { Component } from 'react'

export default class TransactionForm extends Component {
    state = {
        date: "",
        payee: "",
        category: "",
        spent: 0,
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    render() {
        return (
            <form>
                <label htmlFor="date">Date: 
                    <input onChange={(event) => this.handleChange(event)} type="date" id="date" name="date" value={this.state.date}/>
                </label>
                <label htmlFor="payee">Payee: 
                    <input onChange={(event) => this.handleChange(event)} type="text" id="payee" name="payee" value={this.state.payee}/>
                </label>
                <label htmlFor="category">Category: 
                    <input onChange={(event) => this.handleChange(event)} type="text" id="category" name="category" value={this.state.category}/>
                </label>
                <label htmlFor="spent">Spent: 
                    <input onChange={(event) => this.handleChange(event)} type="number" id="spent" name="spent" value={this.state.spent}/>
                </label>
                <input type="submit" value="Add Transaction" />
            </form>
        )
    }
}
