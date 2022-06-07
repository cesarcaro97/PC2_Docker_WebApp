import logo from './logo.svg';
import {Form, Button,Col, Row, Table} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';



// onsubmit() {
//   console.log();
// }

function App() {

  const [userId, setUserId] = useState();
  const [hash, setHash] = useState();
  const [result, setResult] = useState();

  //lists
  const [listData, setListData] = useState({ s: [], a: [] });

  useEffect(() => {
    const fetchData = async () => {
      const s = await fetch(
        `${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/s`
      ).then(response => response.json());
      const a = await fetch(
        `${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/a`
      ).then(response => response.json());

      setListData({ s, a });
    };

    fetchData();
  }, []);

  const onUserIdInput = (e) => {
    const {value} = e.target;
    console.log(value);
    setResult(null);
    setUserId(value);
  };

  const onHashInput = (e) => {
    const {value} = e.target;
    console.log(value);
    setResult(null);
    setHash(value);
  };

  const onSubmit = (e, type) => {
    e.preventDefault();
    console.log(userId);
    console.log(hash);

    if (type === 'generation') {
        const validate = (userId && !hash);

        if (validate) {

          get().then((result) => {
            if (result.type === 'error') toast.error(result.data);
            if (result.type === 'success') {
              toast.success(result.data);
              setList(true, false);
            }
            setResult(result.data);
          }).catch(e => toast.error(e));
          
        }
        else {
            toast.warning('Please fill in missing field(s).');
        }
    }
    else {
        
      const validate = (userId && hash);

      if (validate) {

        get().then((result) => {
          if (result.type === 'error') toast.error(result.data);
          if (result.type === 'success') {
            toast.success(result.data);
            setList(false, true);
          };
          setResult(result.data);
        }).catch(e => toast.error(e));
        
      }
      else {
          toast.warning('Please fill in missing field(s).');
      }
    }

    
  }

  const onDelete = async (e, type) => {

    e.preventDefault();

    const requestOptions = {
      method: 'DELETE',
  };

    if(type === 's') {

      let response;
      response = await fetch(`${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/s`,requestOptions).then(response => response.json());  
      
      if (response.response) {
        toast.success('deleted!');
        await setList(true, false);
        await setList(false, true);
      }
      if (response.error) {
        toast.error(response.error);
        await setList(true, false);
        await setList(false, true);
      }

    }
    else {
      let response;
      response = await fetch(`${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/a`,requestOptions).then(response => response.json());  
      
      if (response.response) {
        toast.success('deleted!');
        setList(true, false);
        setList(false, true);
      }
      if (response.error) {
        toast.error(response.error);
        setList(true, false);
        setList(false, true);
      }
    }

  }

  const setList = async (listS, listA) => {

    if(listA) {
      const a = await fetch(
        `${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/a`
      ).then(response => response.json());
      setListData({ ...listData, a });
    }
    else {
      const s = await fetch(
        `${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/s`
      ).then(response => response.json());
      setListData({ ...listData, s });
    }

  }

  const get = async () => {

    let response, result;
    response = userId && !hash ? await fetch(`${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/user/${userId}`).then(response => response.json()) :
    await fetch(`${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/user/${userId}/${hash}`).then(response => response.json());

    console.log(response);

   result = {
     data: response.response ? response.response : response.error,
     type: response.response ? 'success': 'error'
   }

    return result;
  }

  return (
    <div className="App">
      <Row>
        <Col lg={3}>
          <h2>Hash generation</h2>
          <Form id={'hash-generation-form'}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Send User ID:</Form.Label>
              <Form.Control type="text" placeholder="Enter user id" onInput={(e) => onUserIdInput(e)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={(e) => onSubmit(e, 'generation') }>
              Go
            </Button>
          </Form>
        </Col>
        <Col lg={3}>
          <h2>Hash validation</h2>
          <Form id={'hash-validation-form'}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Send User ID:</Form.Label>
              <Form.Control type="text" placeholder="Enter user id" onInput={(e) => onUserIdInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Send Hash:</Form.Label>
              <Form.Control type="text" placeholder="Enter hash" onInput={(e) => onHashInput(e)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={(e) => onSubmit(e,'validation') }>
              Validate
            </Button>
          </Form>
          
        </Col>
        <Col lg={4}>
        {result && (
            <React.Fragment>
              <h3  className="m-t-xl">Result:</h3>
              <h5>{result}</h5>
            </React.Fragment>
          )}
        </Col>
      </Row>
      <hr></hr>
      <h2>Lists</h2>
      <Row>
        <Col lg={6}>
        <h2>S List</h2>
        <Button variant="danger"
                className='m-b' 
                type="button" onClick={(e) => onDelete(e,'s') }>
              Delete All
        </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Timestamp</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {
                listData && 
                listData.s &&
                listData.s.response &&
                listData.s.response.map((element)=>
                 <tr>
                   <td>{element.id}</td>
                   <td>{element.user_id}</td>
                   <td>{element.timestamp}</td>
                   <td>{element.hash}</td>
                 </tr>
                )
              }
            </tbody>
          </Table>
        </Col>
        <Col lg={6}>
          <h2>A List</h2>
          <Button variant="danger" 
                  className='m-b'
                  type="button" onClick={(e) => onDelete(e,'a') }>
              Delete All
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Hash Sent</th>
                <th>Timestamp</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
            {
                listData && 
                listData.a &&
                listData.a.response &&
                listData.a.response.map((element)=>
                 <tr>
                   <td>{element.id}</td>
                   <td>{element.user_id}</td>
                   <td>{element.hash_sent}</td>
                   <td>{element.timestamp}</td>
                   <td>{element.response}</td>
                 </tr>
                )
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default App;
