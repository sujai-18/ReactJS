import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email
      }));
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container"> {/* Apply 'login-container' class */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" /> {/* Apply 'login-input' class */}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" /> {/* Apply 'login-input' class */}
        </div>
        <button type="submit" className="login-button">Login</button> {/* Apply 'login-button' class */}
        <Link to="/signup"><button style={{ marginTop: "15px"}}>Signup</button></Link>
      </form>
      {error && <div className="error-message">{error}</div>} {/* Apply 'error-message' class */}
    </div>
  );
}

export default Login;
