import React from "react";
import axios from "axios"
import './App.css'
import Media from "./component/media";
import { Modal, Button,Form } from "react-bootstrap"

export default class App extends React.Component{
    constructor(){
        super()
        this.state = {
            jumlah_todolist: 0,
            todolist: [],
            id: "",
            activity: "",
            status: "",
            isModalOpen: false,
            action: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleAdd = () => {
        this.setState({
            acivity: "",
            status: "uncompleted",
            action: "insert"
        })
    }
    //mengupdate data 
    handleEdit = (selectedItem) => {   
        // console.log('edit')   
        // console.log(selectedItem)   
        this.setState ({       
            isModalOpen: true,       
            id: selectedItem.id,       
            activity: selectedItem.activity,       
            status: selectedItem.status,       
            action: "update"   
        }) 
    }
    handleEditStatus = (selectedItem) => {
        this.getTodolist()
        let url = "http://localhost:4002/todolist/update"
        if(selectedItem.status === "uncompleted"){
            let data = {
                id: selectedItem.id,
                activity: selectedItem.activity,
                status: "completed"
            }
            axios.post(url, data)
            .then(res => {
                console.log(res.data.message)
                this.getTodolist()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else{
            let data = {
                id: selectedItem.id,
                activity: selectedItem.activity,
                status: "uncompleted"
            }
            axios.post(url, data)
            .then(res => {
                console.log(res.data.message)
                this.getTodolist()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleDelete = (id) => {
        let url = "http://localhost:4002/todolist/" + id

        if(window.confirm("Apakah anda yakin ?")){
            axios.delete(url)
            .then(res => {
                console.log(res.message)
                this.getTodolist()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleSave = (e) => {
        e.preventDefault()
        let data = {
            id: this.state.id,
            activity: this.state.activity,
            status: this.state.status
        }
        let url = ""
        // console.log(data)
        if(this.state.action === "insert"){
            url = "http://localhost:4002/todolist/save"
        }else if(this.state.action === "update"){
            url = "http://localhost:4002/todolist/update"
        }
        // panggil api backend
        axios.post(url, data)
        .then(res => {
            console.log(res.data.message)
            this.getTodolist()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    getTodolist = () => {
        let url = 'http://localhost:4002/todolist'
        axios.get(url)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.count)
            // console.log(res.data.list)
      
            this.setState({
                jumlah_todolist : res.data.todolist,
                todolist : res.data.todolist
            })
        })
    }
    getTodolistCompleted = () => {
        let url = 'http://localhost:4002/todolist/completed'
        axios.get(url)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.count)
            // console.log(res.data.list)
      
            this.setState({
                jumlah_todolist : res.data.todolist,
                todolist : res.data.todolist
            })
        })
    }
    getTodolistUncompleted = () => {
        let url = 'http://localhost:4002/todolist/Uncompleted'
        axios.get(url)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.count)
            // console.log(res.data.list)
      
            this.setState({
                jumlah_todolist : res.data.todolist,
                todolist : res.data.todolist
            })
        })
    }
    componentDidMount = () => {
        this.getTodolist()
        this.getTodolistCompleted()
        this.getTodolistUncompleted()
    }
    render(){
        return(
            <div className="todolist">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className="container-todo">
                                <h1 className="text-center">What's The Plan For Today</h1>
                                <form onSubmit={e => this.handleSave(e)}>
                                    <div className="d-flex form-add">
                                        <input type="text" className="form-control form" name="activity" placeholder="New Task" onChange={this.handleChange}/>
                                        <button type="submit" className="btn" onClick={()=>this.handleAdd()}>Add</button>
                                    </div>
                                </form>
                                <div className="row justify-content-center button-select">
                                    <div className="col-3">
                                        <button className="btn btn-lg button-tampil" onClick={()=>this.getTodolist()}>All</button>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-lg button-tampil" onClick={()=>this.getTodolistCompleted()}>Completed</button>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-lg button-tampil"  onClick={()=>this.getTodolistUncompleted()}>Uncompleted</button>
                                    </div>
                                </div>
                                {this.state.todolist.map((item, index) => {
                                    if(item.status === "completed"){
                                        return(
                                            <div className="list-activity">
                                                <div className="list-activity-completed" key={index}>
                                                    <div className="row align-items-center">
                                                        <div className="col-9">
                                                            <p>{item.activity}</p>
                                                        </div>
                                                        <div className="col-3 d-flex justify-content-end align-items-center">
                                                            <span onClick={()=>this.handleEditStatus(item)}><Media value image="checked-box-icon.svg" width="24px" height="24px"/></span>
                                                            <span onClick={()=>this.handleEdit(item)}><Media value image="edit-icon.svg" width="24px" height="24px"/></span>
                                                            <span onClick={()=>this.handleDelete(item.id)}><Media value image="delete-icon.svg" width="24px" height="24px"/></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }else   {
                                        return(
                                            <div className="list-activity">
                                                <div className="list-activity-uncompleted" key={index}>
                                                    <div className="row align-items-center">
                                                        <div className="col-9">
                                                            <p>{item.activity}</p>
                                                        </div>
                                                        <div className="col-3 d-flex justify-content-end align-items-center">
                                                            <span onClick={()=>this.handleEditStatus(item)}><Media value image="unchecked-box-icon.svg" width="24px" height="24px"/></span>
                                                            <span onClick={()=>this.handleEdit(item)}><Media value image="edit-icon.svg" width="24px" height="24px"/></span>
                                                            <span onClick={()=>this.handleDelete(item.id)}><Media value image="delete-icon.svg" width="24px" height="24px"/></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <Modal show={this.state.isModalOpen} onHide={this.handleClose} >
                                <Modal.Header className="modal-header" closeButton>
                                    <Modal.Title>Edit Activity</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit={e => this.handleSave(e)}>
                                    <Modal.Body className="modal-body">
                                        <Form.Group className="mb-3 form" controlId="activity">
                                            <Form.Label>Activity</Form.Label>
                                            <Form.Control type="text" name="activity" placeholder="Edit Your Activity" value={this.state.activity} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                        <Button type="submit" className="btn-save">Save</Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}