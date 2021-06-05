import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
 import axios from 'axios'

function Header() {

  const auth = useSelector(state => state.auth)

  const {user, isLogged} = auth

  const handleLogout = async () => {
    try {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    } catch (err) {
        window.location.href = "/";
    }
}
  
    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar" > 
         <img src={user.avatar} alt=""/> 
      {/* <img src="https://res.cloudinary.com/isitcomlibrary/image/upload/v1619566758/avatar/lveadfdfqob3zmka4jko.png "alt=""/>*/ }  
        {user.name} <i className="fas fa-angle-down"></i> 
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/library">library</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }
    const transForm = {
      transform: isLogged ? "translateY(-5px)" : 0
  }
  return (
    <header>
      <div className="Isitcom__Pfe_library_ box">
        <img src="/images/isitcom.png" alt="Isitcom" className="Groupe_4" width="70" height="50"/>

        <h1>
          <Link to="/">
            <span>Isitcom Pfe library</span>
          </Link>
        </h1>
      </div>
      <ul style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                    
                }
      </ul>
    </header>
  );
}

export default Header