import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CategoryModalForm from '../Modals/CategoryModal'
import Category from '../../Category'
const common = require('../../common');

export const CheckBox = props => {
    /*console.log(props)*/
    return (
        <li key={props.id}>
            <input key={props.id} name={props.name} id={props.id} onChange={e => props.handleCheckChieldElement(e)} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </li>
    )
}

let catsJsonArr = [];
let catObj = new Category()
let newCategory = [];
let removeCategory = [];

class PostAddEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.generateCategories(this.props.item)
        catObj.setPostModal(this);
        newCategory = [];
        /*console.log('cons called')*/
        /*console.log(this.props.item)*/
        /*this.state = {
            categories:[]
        }*/
    }

    setNewCategory(cat){
        newCategory.push(cat);
    }
    reloadPrevious(){
        this.props.toggle()
    }

    generateCategories(curItem){
        catsJsonArr = [];
        /*console.log(this.state.categories)*/
        /*console.log('this.state.category: '+this.state.category)*/
        let curCat = ''

        console.log(curItem)
        if(typeof curItem !== 'undefined'){
            curCat = curItem.category
        }
        let curCatArr =[]
        if(curCat){
            curCatArr = curCat.split(',');
        }
        if(newCategory.length){
            console.log(newCategory)
            curCatArr = curCatArr.concat(newCategory)
        }
        console.log('removeCategory')
        console.log(removeCategory)
        if(removeCategory.length){
            curCatArr = curCatArr.filter(n => !removeCategory.includes(n))

        }
        /*console.log('cur selected');*/
        /*console.log(curCatArr);*/
        common.savedCategory.forEach(function(v,k){
            /*console.log(v.item)*/
            let isChecked = false;
            for(var i=0; i<curCatArr.length; i++) {
                if(curCatArr[i]=== v.item.title){
                    /*console.log('curCatArr[i]: '+ curCatArr[i] + '  -  v.item.title:'+ v.item.title)*/
                    isChecked = true;
                }
            }
            catsJsonArr.push({id: "cat-"+k, value:v.item.title, isChecked: isChecked})
        })
        /*console.log(catsJsonArr)*/
    }

    handleCheckChieldElement = (event) => {
        /*console.log(catsJsonArr)*/
        catsJsonArr.forEach(v => {
            if (v.value === event.target.value) {
                v.isChecked = event.target.checked
                if(v.isChecked) {
                    newCategory.push(v.value)
                } else{
                    console.log(v.value);
                    removeCategory.push(v.value)
                }
            }
        })
        this.setState({categories:catsJsonArr})
    }

    state = {
        id: 0,
        title: '',
        category: '',
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    getCategoryCsv(){
        if(Object.keys(catsJsonArr).length){
            let selCat = [];
            for(const i in catsJsonArr){
                if(catsJsonArr[i].isChecked){
                    selCat.push(catsJsonArr[i].value)
                }
            }
            return selCat.join()
        }
        /*console.log(Object.keys(catsJsonArr).length);*/
        return '';
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
        /*console.log(this.state)*/
        this.props.addItemToState({
            id: common.postAutoIncrId,
            title: this.state.title,
            category: this.getCategoryCsv(),
        })
        common.postAutoIncrId++
        this.props.toggle()
        newCategory = []
        removeCategory = []
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
                category: this.state.category,
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
            category: this.getCategoryCsv(),
        })
        this.props.toggle()
        newCategory = []
        removeCategory = []
    }

    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
            const { id, title, category } = this.props.item
            this.setState({ id, title, category })
        }
    }


    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title} />
                </FormGroup>
                <FormGroup>
                    <ul>
                        {
                            catsJsonArr.map((fruite) => {
                                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
                            })
                        }
                    </ul>
                </FormGroup>
                    {this.props.item ?
                    <FormGroup>
                    <CategoryModalForm buttonLabel="Add New Category" addItemToState={catObj.addItemToState}/>
                    </FormGroup>
                    :""}
                <Button>Submit</Button>

            </Form>
        );
    }
}

export default PostAddEditForm