import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import PostModalForm from '../Modals/PostModal'

class PostTable extends Component {

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

        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                        <div style={{width:"110px"}}>
                            <PostModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
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
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </Table>
        )
    }
}

export default PostTable