import React from 'react';
import { Link } from 'react-router-dom';
import { signOut, isAuth } from './helpers';

export default function Nav() {

  const handleSignOut = () => {
    signOut(() => {
      console.log('Signing Out!')
      window.location.href = '/signup'
    })
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#0a3556'}}>
      <div className="container-fluid">
      <img src="https://img.icons8.com/cotton/40/000000/basketball--v1.png" alt='Bastketball Logo'/>
        <Link className="navbar-brand" to='/' style={{color: 'white'}}>NBA Chat</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuth() ?
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={''} onClick={handleSignOut} style={{color: 'white'}}>Sign Out</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/'} style={{color: 'white'}}>Rooms</Link>
              </li>
            </ul>
          </div> : <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/signup' style={{color: 'white'}}>Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/signin' style={{color: 'white'}}>Sign In</Link>
              </li>
            </ul>
          </div>}
      </div>
    </nav>
  );
}
