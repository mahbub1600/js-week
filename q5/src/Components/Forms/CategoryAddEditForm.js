import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const common = require('../../common');

class CategoryAddEditForm extends React.Component {
    state = {
        id: 0,
        title: '',
        category: '',
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitFormAdd = e => {
        e.preventDefault()
        /*fetch('http://localhost:3000/crud', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.first,
                category: this.state.last,
            })
        })
            .then(response => response.json())
            .then(item => {
                if(Array.isArray(item)) {
                    this.props.addItemToState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))*/

        this.props.addItemToState({
            id: common.categoryAutoIncrId,
            title: this.state.title,
        })
        common.categoryAutoIncrId++
        this.props.toggle()
    }

    submitFormEdit = e => {
        e.preventDefault()
        /*fetch('http://localhost:3000/crud', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
            })
        })
            .then(response => response.json())
            .then(item => {
                if(Array.isArray(item)) {
                    // console.log(item[0])
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))*/
        this.props.updateState({
            id: this.state.id,
            title: this.state.title,
        })
        this.props.toggle()
    }

    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
            const { id, title } = this.props.item
            this.setState({ id, title })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="first">Title</Label>
                    <Input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default CategoryAddEditForm