import './login.css'
import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            username: '',
            password: '',
            loggedIn
        }
    }
    onusername = (e) => {
        this.setState({ username : e.target.value});
        console.log(this.state.username);
    }
    onpassword = (e) => {
        console.log(this.state.password)
        this.setState({ password : e.target.value});
    }
    onHandlerSubmit = (e) =>{
        e.preventDefault();
        //logic
        const {username, password} = this.state;
        if( username === "trieutien" && password === "123456"){
            localStorage.setItem("token", "tokendangnhap");
            this.setState({ loggedIn: true })
        }
        console.log("username:" +this.state.username+ " Password:"+this.state.password);
        

    }
    render() {
        const { username, password, loggedIn } = this.state;

        if(loggedIn){
            return <Redirect to="/todo/" />
        }
        return (
            <div>
                    <Container className="wrapper">
                        <div className="childWrap">
                            <Row className="row">
                                <Col className="col-1" xs="6"><h1>TASK<br></br>MANAGE</h1></Col>
                                <Col className="col-2" xs="6">
                                    <Form onSubmit={this.onHandlerSubmit} className="formLogin">
                                        <FormGroup>                                      
                                            <Input type="text" name="username" id="username" value={username} onChange={this.onusername}  placeholder="user name" required/>
                                            <Input type="password" name="password" id="password" onChange={this.onpassword} value={password} placeholder="password" required/>
                                        </FormGroup>
                                        <Button type='submit' className="btn-submit btn btn-primary">LOGIN</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                
            </div>
        );
    }
}

export default Login;