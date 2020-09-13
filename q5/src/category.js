import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CategoryModalForm from './Components/Modals/CategoryModal'
import CategoryTable from './Components/Tables/CategoryTable'
import PostModalForm from './Components/Modals/PostModal'
const common = require('./common');


class Category extends Component {
    state = {
        categories: []
    }
    constructor(props) {
        super(props)
        this.postModalProps=''
        this.postForm=''

    }
    getItems(){
        if(Object.keys(common.savedCategory).length) {
            for (const i in common.savedCategory) {
                if(typeof common.savedCategory[i].item !=='undefined') {
                    this.addItemToState(common.savedCategory[i].item, false
                    )
                }
            }
        }
    }
    addItemToState = (item, add=true) => {
        if(add) common.savedCategory.push({item});
        this.setState(prevState => ({
            categories: [...prevState.categories, item]
        }))
        if(this.getPostForm()){
            this.getPostForm().setNewCategory(item.title)
            this.getPostForm().generateCategories(this.getPostForm().props.item)
            this.getPostForm().reloadPrevious()
        }
        console.log('logged in cat');
    }

    renderPostModal(){
        return <PostModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
    }

    updateState = (item) => {
        if(Object.keys(common.savedCategory).length) {
            for (const i in common.savedCategory) {
                if(common.savedCategory.hasOwnProperty(i)) {
                    if (Number(item.id) === Number(common.savedCategory[i].item.id)) {
                        common.savedCategory[i].item = item
                    }
                }
            }
        }
        const itemIndex = this.state.categories.findIndex(data => data.id === item.id)
        const newArray = [
            // destructure all categories from beginning to the indexed item
            ...this.state.categories.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the categories to the array from the index after the replaced item
            ...this.state.categories.slice(itemIndex + 1)
        ]
        this.setState({ categories: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.categories.filter(item => item.id !== id)
        this.setState({ categories: updatedItems })
        if(Object.keys(common.savedCategory).length) {
            for (const i in common.savedCategory) {
                if(common.savedCategory.hasOwnProperty(i)) {
                    if (Number(id) === Number(common.savedCategory[i].item.id)) {
                        common.savedCategory.pop(id)
                    }
                }
            }
        }
    }

    componentDidMount(){
        this.getItems()
    }

    getPostForm(){
        return this.postForm;
    }
    setPostModal(form){
        this.postForm = form
    }
    render() {
        return (
            <Container className="Category">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>Category CRUD (Memory)</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CategoryTable categories={this.state.categories} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CategoryModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Category