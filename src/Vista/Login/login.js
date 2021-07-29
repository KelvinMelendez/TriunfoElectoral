import React from 'react';
import './login_min_screen_300.css';
import './login_min_screen_600_1000.css';
import './login_min_screen_1000_1300.css';
import './login_min_screen_1300_1500.css';
import './login_min_screen_1500.css';
import logo from './Logotipo.svg';
import logo_movil from './logotipo_movil.png';

import url_server from '../../VariablesGlobales.js';

var bool_width=window.innerWidth>=300 && window.innerWidth<=600

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.verificar_sesion=this.verificar_sesion.bind(this)
    }

    componentDidMount(){
      this.verificar_sesion()
    }
    
    login(e){
      //Cancelar comportamiento natural
      e.preventDefault()

      //Form Data
      let datos=new FormData(e.target)

      //Fetch
      fetch(url_server+'login',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((json_data)=>{
        //Login Correcto
        if(json_data['value']=='ok'){
          
          //Guardar variables de Perfil
          localStorage.setItem('username',datos.get('username'))
          localStorage.setItem('perfil',json_data['perfil'])
          localStorage.setItem('nombre',json_data['nombre'])

          //Actualizar pwd
          var pwd = datos.get('password')
          if(pwd == 'provisional'){
            var nueva_pwd = window.prompt("Ingresar nueva contraseña","no ingresado")
            if(nueva_pwd!="no ingresado"){
              //Crear form Data
              var new_pwd_Datos = new FormData()
              new_pwd_Datos.append('username',datos.get('username'))
              new_pwd_Datos.append('new_pass',nueva_pwd)

              //Enviar Solicitud
              fetch(url_server + 'actualiar_pass',{
                method: 'POST',
                body:new_pwd_Datos
              }).then((resp)=>{
                return resp.json()
              }).then((json)=>{
                if(json['value']=='ok'){
                  alert('Actualizada correctamente')
                }else{
                  alert('Error')
                  localStorage.clear()
                  window.location.href='/#'
                }
              })
            }else{
              alert('Debe ingresar una contraseña')
              return null
            }
          }
          
          // Admin
          if(json_data['perfil']=='Admin'){
            window.location.href='/#/menu_administrador'
          }else if(json_data['perfil']=='Marketing'){
            window.location.href='/#/menu_marketing'
          }else if (json_data['perfil']=='SuperAdmin'){
            window.location.href='/#/menu_super_admin'
          }
          else{
            window.location.href='/#/menu_coordinador'
          }
        }else{
          alert('Credenciales Incorrectas')
        }
      })


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
        if(resp_json['value']=='ok'){
          if(perfil=='Admin'){
            window.location.href='/#/menu_administrador'
          }else{
            window.location.href='/#/menu_coordinador'
          }
        }
      })
    }

    render(){
      return(
        <div className="login_container">
          <br/>
          <div className="login_logo">
            <img src={bool_width ? logo_movil:logo }/>
          </div>
          <br/>
          <br/>
          <div className="login_titulo">
            <p className="login_titulo_1">INTELIGENCIA</p>
            <p className="login_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <br/>
          <form className="login_formulario" onSubmit={(e)=>{
            this.login(e)
          }}>
            <div className="login_form_contenedor_input">
              <i className="far fa-user"></i>
              <input type="text" name="username" placeholder="Ingresar Usuario..."/><br/>
            </div>

            <div className="login_form_contenedor_input">
              <i className="fas fa-key"></i>
              <input type="password" name="password" placeholder="Ingresar Contraseña..."/>
            </div>
            <br/>
            <button className="login_btn_iniciar_sesion">
              Iniciar Sesión
            </button>
          </form>
        </div>
      )
    }
}