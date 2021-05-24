import './todo.css'
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { orderBy } from 'lodash';
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
            loggedIn,
            isComplete: false,
            orderStatus:'',
            orderDir: '',
            isSorted: false,
            dateTime: '',
        }
    }
    componentDidMount(){
        fetch("http://localhost:3000/tasks").then(r => r.json())
        .then(data => this.setState({isLoaded:true, list:data}))
    }

    
    AddTask = (e) => {
        e.preventDefault();
        let time = new Date();
        this.setState({ dateTime: time.toString() });
        console.log(this.state);
        fetch('http://localhost:3000/tasks' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ 
                title: this.state.dataInput,
                status: this.state.statusInput,
                level: this.state.levelInput
            })
        }).then(r => this.componentDidMount())

        
    }

    handlerChange = (e) => {
        console.log(e.target.value);
        this.setState({[e.target.name] : e.target.value});
    }
    changeStatusInput = (e) => {
        this.setState({[e.target.name]: e.target.value })
        console.log(e.target.value);
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
    //clear tasks
    ClearTask = () => {
        const list = this.state.list;
        list.map((item) => {
            this.removeTask(item.id);
        })
        
    }
    //level- tasks
    setClass = (data) => {
        if(data === 'thigh'){
            return 'level-high';
        }
        if(data === 'low'){
            return 'level-low'
        }
        
    }
    statusComplete = () => {
        this.setState({isComplete: !this.state.isComplete});
        console.log(this.state.isComplete);
    }


    //SORT BY LELVEL
    handlerSort = () => {
        this.setState({ isSorted: !this.state.isSorted })
    }
    getValueStatus = (e) => {
        this.setState({ orderStatus: e.target.value});
        console.log(this.state.orderStatus)
    }
    getValueDir = (e) => {
        this.setState({ orderDir: e.target.value})
        console.log(this.state.orderDir)

    }

    //Render()
    render() {

        let {dataInput, list , isLoaded, levelInput,statusInput ,orderStatus,orderDir,isSorted,dateTime} = this.state;
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
        }
        if(!isLoaded) //nếu không lấy được dữ liệu
        {
            return(
                "start database... "
            )
        }

        let complete = "";
        if(this.state.isComplete){
            complete = " complete"
        }
        //sort
        if(isSorted){
            list = orderBy(list, [orderStatus], [orderDir]);
        }
        const todoItem = list.map((data,key) => {
            return(
                <div style={{height:"45px"}}>
                    <li className={this.setClass(data.level)+complete}>
                        {`${key+1}.  ${data.title} (Priority: ${data.level}, Status: ${data.status})`}
                        <button className="btn btn-primary" onClick={() => this.removeTask(data.id)}>X</button>
                    </li>
                    <br></br>
                </div>
            ) 
        })
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
                    <h3 style={{margin:"10px 0 5px 50px",color:"#7BB3E1",fontWeight:"400"}}>My Task</h3>
                    {/* NAVBAR */}
                    <div className="optionFilter">
                        <label className='sort'>Sort by:&nbsp; </label>
                        <select onChange={this.getValueStatus} style={{margin:"0 5px"}}>
                        <option value="status">Status</option>
                        <option value="level">Priority</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;

                        <label for="">Direct on: </label>
                        <select onChange={this.getValueDir} style={{margin:"0 5px"}}>
                        <option value="desc">DESC</option>
                        <option value="asc">ASC</option>
                        </select>
                        

                        <label style={{marginLeft:"100px"}}>Filter: </label>
                        <input style={{margin:"0 5px"}} type="checkbox"></input>
                        &nbsp;&nbsp;&nbsp;
                        <label>From:</label>
                        <input style={{margin:"0 5px"}} type="date" name="from"></input>
                        <label>To:</label>
                        <input style={{margin:"0 5px"}} type="date" name="to"></input>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={this.handlerSort} style={{marginBottom:"5px"}} className='btn btn-primary'>Apply</button>
                    </div>
                    <div className="body">
                        <Row>
                            <Col style={{borderRight:"1px solid black"}} xs='8'>
                                <ul className="list-task">
                                    {todoItem}
                                </ul>
                            </Col>
                            <Col xs='4'>
                                <div className="form-add-new">
                                    <div className='textInput'>
                                        <label style={{width:"63px"}}>Task:&nbsp;</label>
                                        <input style={{flex:"1"}} type='text' name='dataInput' value={dataInput} onChange={this.handlerChange} placeholder='enter your task here'></input>
                                    </div>
                                 
                                    <div className='levelInput'>
                                        <div>
                                            <label style={{width:"63px"}}>Status:</label>
                                            <select name="statusInput" value={statusInput} onChange={this.changeStatusInput}>
                                            <option value="a-pending">Pending</option>
                                            <option value="c-done">Done</option>
                                            <option value="b-progressing">progressing</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label>Priority:</label>
                                            <select name="levelInput" value={levelInput} onChange={this.changeLevelInput} >
                                            <option value="thigh">High</option>
                                            <option value="low">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p>Created: {dateTime}  By      Tien</p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <div className="btn-add-delete">
                                        <button className='btn btn-primary' onClick={this.ClearTask}>Clear</button>
                                        <button className='btn btn-primary' onClick={this.AddTask}>Addnew</button>
                                        <button className="btn btn-primary" >Delete</button>
                                    </div>


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