import React from 'react';
import './crear_usuarios.css';
import logo from './Logotipo.svg';
import url_server from '../../VariablesGlobales.js';

import Tabla from '../../Componentes/Tablas/Tablas';
import Modal from 'react-bootstrap/Modal';

export default class Crear_Usuarios_2 extends React.Component{

    constructor(props){
        super(props);
        this.state={
          docentes:{
            'Cargando':'Cargando'
          },
          datos_tabla:[{'Username':'Dato 1','Nombre':'Dato 2','Perfil':'Dato 3'}],
          show_modal:null
        }

        this.crear_usuario = this.crear_usuario.bind(this)
    }
    
    // Lifecycle
    componentDidMount(){
      
      //Descargar datos Tabla
      fetch(url_server + 'lista_usuarios',{
        method:'POST'
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        this.setState({
          datos_tabla:json['usuarios']
        })
      })

    }

    crear_usuario(e){

      //Cancelar comportamiento natural
      e.preventDefault()

      //Datos
      var datos = new FormData(e.target)

      //Enviar Datos
      fetch(url_server + 'crear_usuario',{
        method : 'POST',
        body : datos
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        if(json['value'] == 'ok'){
          alert('Usuario Creado Correctamente')
          window.location.reload()
        }else{
          alert('Error al crear usuario')
          window.location.reload()
        }
      })
      
    }


    render(){
      return(
        <div className="crear_usuarios_container_2">
          <br/>
          <form className = "crear_usuario_2_form" id = "form_crear_usuario" onSubmit = {(e)=>{
            this.crear_usuario(e)
          }}>
            <label>Nombre</label>
            <br/>
            <input name = "nombre" type="text"/>
            <br/>
            <label>Username</label>
            <br/>
            <input name = "username" type="text"/>
            <br/>
            <label>Perfil</label>
            <br/>
            <select name = "perfil">
              <option>Admin</option>
              <option>Coordinador</option>
              <option>Marketing</option>
              <option selected hidden>Seleccionar...</option>
            </select>
            <br/>
            <br/>
            <button>
              Crear usuario
            </button>
            <br/>
            <br/>
          </form>
          <br/>
          <div className="crear_usuarios_logo">
            <img src={logo}/>
          </div>
          <br/>
          <br/>
          <br/>
          <div className="crear_usuarios_titulo">
            <p className="crear_usuarios_titulo_1">INTELIGENCIA</p>
            <p className="crear_usuarios_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <br/>
          <div className="btn_agregar_usuario" onClick={(e)=>{
            var elemento = document.getElementById("form_crear_usuario")
            elemento.style.display = "block"
          }}>
            Agregar Usuario +
          </div>
          <br/>
          <Tabla datos={this.state.datos_tabla}/>
          <br/>

        </div>
      )
    }
}