import React from 'react';
import './crear_usuarios.css';
import logo from './Logotipo.svg';
import url_server from '../../VariablesGlobales.js';

export default class Crear_Usuarios extends React.Component{

    constructor(props){
        super(props);
        this.state={
          docentes:{
            'Cargando':'Cargando'
          }
        }
        this.lista_docentes=this.lista_docentes.bind(this)
        this.crear_usuario=this.crear_usuario.bind(this)
    }
    
    // Lifecycle
    componentDidMount(){
      this.lista_docentes()
    }


    lista_docentes(){
      fetch(url_server+'listado_docentes_crear_usuario',{method:'POST'}).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          docentes:resp_json
        })
      })
    }

    crear_usuario(e){
      //Prevenir comportamiento natural
      e.preventDefault()

      //Form Data
      var datos=new FormData(e.target)

      //Enviar Datos
      fetch(url_server+'agregar_coordinador',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        if(resp_json['value']=='ok'){
          alert('Usuario Creado Correctamente')
        }
      })

      e.target.reset()

    }

    render(){
      return(
        <div className="crear_usuarios_container">
          <br/>
          <div className="crear_usuarios_logo">
            <img src={logo}/>
          </div>
          <br/>
          <br/>
          <div className="crear_usuarios_titulo">
            <p className="crear_usuarios_titulo_1">INTELIGENCIA</p>
            <p className="crear_usuarios_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <form className="crear_usuarios_formulario" onSubmit={(e)=>{
            this.crear_usuario(e)
          }}>
            <span style={{fontWeight:'bold'}}>Seleccionar Codigo Docente</span>
            <br/>
            <select required name="cod_docente" onChange={(e)=>{
              this.setState({
                codigo_seleccionado:e.target.value
              })
            }}>
              {
                Object.keys(this.state.docentes).map((value,index,array)=>{
                  return (<option>{value}</option>)
                })
              }
            </select>
            <br/>
            <br/>
            <span style={{fontWeight:'bold'}}>Seleccionar Perfil del usuario</span>
            <br/>
            <select required name="perfil">
              <option>Admin</option>
              <option>Coordinador</option>
              <option selected hidden>Seleccionar perfil...</option>
            </select>
            <br/>
            <br/>
            <span style={{fontWeight:'bold'}}>Nombre del Docente</span>
            <div>
              {this.state.docentes[this.state.codigo_seleccionado]}
            </div>
            <br/>
            <br/>
            <button className="crear_usuario_btn_enviardatos">
                Crear Usuario
            </button>
          </form>

        </div>
      )
    }
}