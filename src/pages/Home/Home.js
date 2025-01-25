import React from 'react'
import styles from './Home.module.css'
// import { getAuth } from "firebase/auth";
import logo from '../../images/LogoNovo.png'


function Home() {

  // const auth = getAuth();
  // const user = auth.currentUser;

  return (
    <div className={styles.container_home}>
      <div>
      <img src={logo} alt='WMZR Tecnology'></img> 
      </div>      
    </div>  
  )
}

export default Home