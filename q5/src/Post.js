import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import PostModalForm from './Components/Modals/PostModal'
import PostTable from './Components/Tables/PostTable'
const common = require('./common');

class Post extends Component {
  state = {
    items: []
  }

  getItems(){
    if(Object.keys(common.savedPost).length) {
      for (const i in common.savedPost) {
        if(typeof common.savedPost[i].item !=='undefined') {
          this.addItemToState(common.savedPost[i].item, false
          )
        }
      }
    }
  }

  addItemToState = (item, add=true) => {
    console.log(item)
    if(add) common.savedPost.push({item});
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    if(Object.keys(common.savedPost).length) {
      for (const i in common.savedPost) {
        if(common.savedPost.hasOwnProperty(i)) {
          if (Number(item.id) === Number(common.savedPost[i].item.id)) {
            common.savedPost[i].item = item
          }
        }
      }
    }
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
    if(Object.keys(common.savedPost).length) {
      for (const i in common.savedPost) {
        if(common.savedPost.hasOwnProperty(i)) {
          if (Number(id) === Number(common.savedPost[i].item.id)) {
            common.savedPost.pop(id)
          }
        }
      }
    }
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
        <Container className="Post">
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Post CRUD (Memory)</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <PostTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <PostModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default Post