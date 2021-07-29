import React from 'react';
import './menu_min_screen_300.css';
import './menu_min_screen_600.css';
import './menu_min_screen_1000.css';
import './menu_min_screen_1500.css'
import logo from './Logotipo.svg';
import logo_movil from './Logotipo.png';
import url_server from '../../VariablesGlobales.js';

var bool_width=window.innerWidth>=300 && window.innerWidth<=600



export default class Menu_Marketing extends React.Component{

    constructor(props){
        super(props);
    }
    // Lifecycle

    render(){
      return(
        <div className="menu_container">
          <br/>
          <div className="menu_logo">
            <img src={bool_width ? logo_movil:logo }/>
          </div>
          <br/>
          <br/>
          <div className="menu_titulo">
            <p className="menu_titulo_1">INTELIGENCIA</p>
            <p className="menu_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/crear_campanas'
          }}>
            Campaña Marketing
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/campana_directa'
          }}>
            Campaña Directas
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href=url_server + 'correos_masivos'
          }}>
            Herramienta Correos Masivos
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            localStorage.clear()
            window.location.href='/#/login'
          }}>
            Cerrar Sesión
          </button>
          <br/>
        </div>
      )
    }
}