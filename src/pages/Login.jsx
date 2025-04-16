import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button, Alert } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined
   })

   const { dispatch } = useContext(AuthContext)
   const navigate = useNavigate()
   const [error, setError] = useState(null)

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });

      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
         });

         const result = await res.json();

         if (!res.ok) {
            dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
            throw new Error(result.message);
         }

         localStorage.setItem('token', result.token);
         localStorage.setItem('userId', result.data._id);
         localStorage.setItem('userEmail', result.data.email);
         localStorage.setItem('username', result.data.username);
         localStorage.setItem('role', result.data.role);

         dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
         
         navigate('/');
      } catch (err) {
         setError(err.message);
         setTimeout(() => setError(null), 3000);
      }
   };

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Login</h2>

                        {error && <Alert color="danger">{error}</Alert>}

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                        </Form>
                        <p>Don't have an account? <Link to='/register'>Create</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Login