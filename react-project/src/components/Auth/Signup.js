import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import '../../styles/signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

 const handleSignup = async (e) => {
  e.preventDefault();
  setError('');

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, {
      displayName: name
    });

    // Store user information in Firestore
    await addUserToFirestore(user.uid, { email, name });

    // Redirect to dashboard or send verification email
  } catch (error) {
    setError(error.message);
  }
};

const addUserToFirestore = async (userId, userData) => {
  try {
    // Add user document to 'users' collection in Firestore
    await setDoc(doc(db, 'users', userId), userData);
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Signup;
