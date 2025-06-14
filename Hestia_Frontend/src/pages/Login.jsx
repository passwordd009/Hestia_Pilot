import axios from 'axios';
import Box from '@mui/material/Box'
import { useNavigate, Navigate, Link} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import { useState } from "react"
const Login = () => {
const navigate = useNavigate()

const [email, setEmail] =  useState([])
const [password, setPassword] =  useState([])
const [error, setError] = useState([])

const formData = {
    "email" : email,
    "password" : password,
}

const handleLogin = async (formData) => {
    try {
      console.log(formData)
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setEmail("")
      setPassword("")
      setError("")
      navigate('/')
    } catch (err) {
        console.error('Login failed', err);
        setError(err.response?.data?.message || 'Login failed');
    }

  };

const handleRegister = () => {
    navigate("/register")
}

    return(
        <div style={containerStyle1}>
            <div>
                <h1>
                   Log In to Your Account
                </h1>
                <center>
                <h3>
                Enter the Block Party
                </h3>
                </center>
            </div>

            <div style={containerStyle2}>
                <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                <br/>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                 <br/>
                    <Button 
                        variant="contained"
                        onClick={() => handleLogin(formData)}>
                        Submit
                    </Button>

                    <Button 
                        size="small"
                        onClick={() => handleRegister()}>
                        Register
                    </Button>
                  
                    {error && (
                        <p style={{ color: 'red', marginTop: '10px' }}>
                            {error}
                        </p>
                    )}
                </Box>
            </div>
        </div>
    )
   }
   const containerStyle1 = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    gap: '50px',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle2 = {
    position: "relative",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
 
   const box = {
    display: 'flex',
    flexDirection: 'column', 
    gap: '5px',              
    padding: '32px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '300px',
  }
   
   export default Login 