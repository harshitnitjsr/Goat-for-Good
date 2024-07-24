import React, {useState} from 'react';
import { Container, Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { Google  } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { currentUser, login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        setError(null)
        try {
        await login(email, password);
        // Redirect to dashboard or another page
        
        navigate('/');
        } catch (err) {
        setError(err.message);
        }
    };
    
return (
    <Container maxWidth="sm">
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={4}
                boxShadow={3}
                borderRadius={2}
                width="100%"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Log In
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Welcome back! Please enter your details
                </Typography>
                <TextField label="Email" variant="outlined" margin="normal" value={email} onChange={(e)=>{setEmail(e.target.value)}} fullWidth />
                <TextField label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e)=>{setPassword(e.target.value)}} fullWidth />
                <Link href="#" variant="body2" align="right" sx={{ width: '100%' }}>
                    Forgot password ?
                </Link>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                    Log in
                </Button>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Or Continue With
                </Typography>
                <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Button variant="outlined" startIcon={<Google />} fullWidth sx={{ mr: 1, ml: 1 }}>
                        Google
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don’t have an account? <Link href="/signup">Sign up</Link>
                </Typography>
            </Box>
        </Box>
    </Container>
);
};

export default Login;
