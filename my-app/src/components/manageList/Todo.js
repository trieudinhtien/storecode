import './todo.css'
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router';

class todo extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token");

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state= {
            dataInput: '', //nhan du lieu vao
            list: [], //mang de luu task
            listId : [],
            isLoaded: false,
            levelInput: '',
            statusInput: '',
            loggedIn
        }
    }

    componentDidMount(){
        fetch("http://localhost:3000/tasks").then(r => r.json())
        .then(data => this.setState({isLoaded:true, list:data}))

        
    }
    AddTask = (e) => {
        e.preventDefault();
        console.log(this.state);
        fetch('http://localhost:3000/tasks' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title: this.state.dataInput })
        }).then(r => this.componentDidMount())

        
    }

    handlerChange = (e) => {
        console.log(e.target.value);
        this.setState({[e.target.name] : e.target.value});
    }
    changeStatusInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.statusInput);
    }
    changeLevelInput =(e) =>{
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.levelInput);
    }

    removeTask = (id) => {   //XOA TASK
        fetch(`http://localhost:3000/tasks/${id}`,  {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((data)=> {
            data.json().then(this.componentDidMount())
            
        })
    }
    //logout
    logout = () => {
        localStorage.removeItem("token");
    }

    ClearTask = () => {
        console.log(this.state.list);
    }
    render() {

        const {dataInput, list , isLoaded, levelInput,statusInput } = this.state;
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
        }
        if(!isLoaded) //nếu không lấy được dữ liệu
        {
            return(
                "start database... "
            )
        }
        return (
            <div>
                <Container>
                    {/* HEADER */}
                    <div className="header">
                        <Row>
                            <Col xs='10'><p>Task Manager !!</p></Col>
                            <Col xs='2' className="cot-2">
                                <div className='logout'>
                                    <span>Hi, Tien</span>
                                    <div className='logout-btn' onClick={this.logout}><a href='/'>Logout</a></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <h3 style={{margin:"10px 0 5px 50px"}}>My Task</h3>
                    {/* NAVBAR */}
                    <div className="optionFilter">
                        <label className='sort'>Sort by:&nbsp; </label>
                        <select style={{margin:"0 5px"}}>
                        <option value="status-complete">Complete</option>
                        <option value="status-fail">Fail</option>
                        <option value="status-processing">processing</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;

                        <label for="">Direct on: </label>
                        <select style={{margin:"0 5px"}}>
                        <option value="DESC">DESC</option>
                        <option value="ASC">ASC</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;

                        <label className='filter'>Filter: </label>
                        <input style={{margin:"0 5px"}} type="checkbox"></input>
                        &nbsp;&nbsp;&nbsp;
                        <label>From:</label>
                        <input style={{margin:"0 5px"}} type="date" name="from"></input>
                        <label>To:</label>
                        <input style={{margin:"0 5px"}} type="date" name="to"></input>
                        &nbsp;&nbsp;&nbsp;
                        <button className='btn btn-primary'>Apply</button>
                    


                    </div>
                    <div className="body">
                        <Row>
                            <Col style={{borderRight:"1px solid black"}} xs='8'>
                                <ul className="list-task">
                                {
                                list.map(data => (
                                    <div>
                                        
                                            <li className="level-high">{data.id+ "."+ data.title} <button className="btn btn-primary" onClick={() => this.removeTask(data.id)}>Delete</button></li>
                                            <br></br>
                                            
                                        
                                    </div>
                                ))}
                                   
                                </ul>
                            </Col>
                            <Col xs='4'>
                                <div className="form-add-new">
                                    <label style={{width:"50px"}}>Task:&nbsp;</label>
                                    <input style={{width:"228px", marginBottom:"10px"}} type='text' name='dataInput' value={dataInput} onChange={this.handlerChange} placeholder='enter your task here'></input>
                                    <br></br>
                                    <label>Status:&nbsp;</label>
                                    <select name="statusInput" value={statusInput} onChange={this.changeStatusInput}>
                                    <option value="Complete">Complete</option>
                                    <option value="Fail">Fail</option>
                                    <option value="processing">processing</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <label>Priority:&nbsp;</label>
                                    <select name="levelInput" value={levelInput} onChange={this.changeLevelInput} >
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                    </select>
                                    <p style={{marginTop:"10px"}}>Created: wed,17/10/1998     By      Tien</p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <button style={{margin:" 0 10px 0 124px"}} className='btn btn-primary' onClick={this.ClearTask}>Clear</button>
                                    <button className='btn btn-primary' onClick={this.AddTask}>Addnew</button>


                                </div>

                            </Col>
                        </Row>
                    </div>


                </Container>
              
            </div>
          
        );
    }
}

export default todo;