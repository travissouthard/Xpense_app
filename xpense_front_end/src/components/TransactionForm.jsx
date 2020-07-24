import React, { Component } from 'react'

export default class TransactionForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor="date">Date: 
                    <input type="date" id="date" name="date"/>
                </label>
                <label htmlFor="payee">Payee: 
                    <input type="text" id="payee" name="payee"/>
                </label>
                <label htmlFor="category">Category: 
                    <input type="text" id="category" name="category"/>
                </label>
                <label htmlFor="spent">Spent: 
                    <input type="number" id="spent" name="spent"/>
                </label>
                <input type="submit" value="Add Transaction" />
            </form>
        )
    }
}
