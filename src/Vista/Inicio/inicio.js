import React from 'react';
import './inicio_min_screen_300.css';
import './inicio_min_screen_600_1000.css';
import './inicio_min_screen_1000_1300.css';
import './inicio_min_screen_1300_1500.css';
import './inicio_min_screen_1500.css';
import logo_movil from './logotipo_movil.png';
import logo from './Logotipo.svg';

import url_server from '../../VariablesGlobales.js';

var bool_width=window.innerWidth>=300 && window.innerWidth<=600

export default class Inicio extends React.Component{

    constructor(props){
        super(props);
    }
    // Lifecycle

    render(){
      console.log(bool_width)
      return(
        <div className="home_container">
          <br/>
          <div className="home_logo">
            <img src={bool_width ? logo_movil:logo }/>
          </div>
          <br/>
          <br/>
          <div className="home_titulo">
            <p className="home_titulo_1">INTELIGENCIA</p>
            <p className="home_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <br/>
          <button className="home_btn_entrar" onClick={(e)=>{
            window.location.href="/#/login"
          }}>
            Entrar
          </button>
        </div>
      )
    }
}