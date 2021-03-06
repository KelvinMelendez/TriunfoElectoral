import React from 'react';
import './menu_min_screen_1000.css';
import './menu_min_screen_1500.css'
import logo from './Logotipo.svg';
import logo_movil from './Logotipo.png';
import url_server from '../../VariablesGlobales.js';

var bool_width=window.innerWidth>=300 && window.innerWidth<=600

export default class Menu extends React.Component{

    constructor(props){
        super(props);
        this.verificar_sesion=this.verificar_sesion.bind(this)
    }
    // Lifecycle
    componentDidMount(){
      this.verificar_sesion()
    }

    verificar_sesion(){
      //Obtener Username
      let username=localStorage.getItem('username');
      let perfil=localStorage.getItem('perfil')

      //Datos Form
      let datos=new FormData()
      datos.append('username',username)

      fetch(url_server+'verificar_sesion',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        if(resp_json['value']!='ok'){
          window.location.href='/#/'
        }
      })
    }

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
            window.location.href='https://app.powerbi.com/links/4cqkcglwHw?ctid=ee1d577e-5204-4d8d-8fa2-dca1c4aa8c3e&pbi_source=linkShare'
          }}>
            Dashboard  Electoral
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/admin_coordinadores'
          }}>
            Proyecto Hormiga
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/crear_campanas'
          }}>
            Campa??a Marketing
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/campana_directa'
          }}>
            Campa??a Directas
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            window.location.href='/#/crear_usuarios'
          }}>
            Administrador de Usuarios
          </button>
          <br/>
          <button className="menu_opcion" onClick={(e)=>{
            localStorage.clear()
            window.location.href='/#/Login'
          }}>
            Cerrar Sesi??n
          </button>
        </div>
      )
    }
}