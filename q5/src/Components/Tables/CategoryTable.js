import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import CategoryModalForm from '../Modals/CategoryModal'

class CategoryTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if(confirmDelete){
            /*fetch('http://localhost:3000/crud', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.json())
                .then(item => {
                    this.props.deleteItemFromState(id)
                })
                .catch(err => console.log(err))*/
            this.props.deleteItemFromState(id)
        }

    }

    render() {

        const categories = this.props.categories.map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>
                        <div style={{width:"110px"}}>
                            <CategoryModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories}
                </tbody>
            </Table>
        )
    }
}

export default CategoryTable