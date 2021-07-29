import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './simpatia_docentes.css';
import logo from './Logotipo.svg';

import url_server from '../../VariablesGlobales.js';

export default class Simpatia_Docentes extends React.Component{

    constructor(props){
        super(props);
        this.state={
          datos_docentes:{
            'Cargando':'Cargando'
          },
          docente_seleccionado:'Cargando',
          completados:'cargando',
          incompletos:'cargando'
        }
        this.docentes_adignados=this.docentes_adignados.bind(this)
        this.actualizar_estadisticas=this.actualizar_estadisticas.bind(this)
    }

    componentDidMount(){
      this.docentes_adignados()
      this.actualizar_estadisticas()
    }

    docentes_adignados(){

      //Obtener el username
      let nombre=localStorage.getItem('nombre')
      let datos = new FormData()

      datos.append('nombre',nombre)
      fetch(url_server+'listado_docentes_asignados',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          datos_docentes:resp_json,
          docente_seleccionado:'No posee docentes Asignados'
        })
      })


    }

    registrar_simpatia(e){
      //Prevenir comportamiento natural
      e.preventDefault()

      //Form Data
      var datos=new FormData(e.target)

      //Enviar Datos
      fetch(url_server+'registrar_simpatia',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        if(resp_json['value']=='ok'){
          alert('Se registró Simpatía correctamente')
        }
      })
    }

    actualizar_estadisticas(){
      //Datos
      let nombre_coordinador=localStorage.getItem('nombre')

      //Form Data
      let datos = new FormData()
      datos.append('coordinador',nombre_coordinador)

      fetch(url_server+'estadisticas_coordinador',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          completados:resp_json['completados'],
          incompletos:resp_json['pendientes'],
        })
      })


    }

    render(){
      return(
        <div className="simpatia_container">
          <br/>
          <div className="simpatia_contenedor_logo">
            <img src={logo}/>
          </div>
          <br/>
          <br/>

          <div className="simpatia_titulo">
            <p className="simpatia_titulo_1">INTELIGENCIA</p>
            <p className="simpatia_titulo_2">ELECTORAL</p>
          </div>
          <br/>
          <div className="simpatia_contenedor_estadisticas">
            <div>
              <span style={{fontWeight:'bold'}}>Pendientes</span>
              <br/>
              {this.state.incompletos}
            </div>
            <div>
            <span style={{fontWeight:'bold'}}>Completados</span>
              <br/>
              {this.state.completados}
            </div>
          </div>
          <br/>
          <form onSubmit={(e)=>{
            this.registrar_simpatia(e)
          }}>
            <div className="simpatia_contenedor_field">
              <span>Seleccionar Docente</span>
              <br/>
              <select required name="cod_docente" onChange={(e)=>{
                this.setState({
                  docente_seleccionado:e.target.value
                })
              }}>
                {
                  Object.keys(this.state.datos_docentes).map((value,index,array)=>{
                    return(<option>{value}</option>)
                  })
                  
                }
                <option selected hidden>Seleccionar Docente</option>
                
              </select>
              <br/>
              <span>{this.state.datos_docentes[this.state.docente_seleccionado]}</span>
            </div>

            <div className="simpatia_contenedor_field">
              <span>Registrar Simpatía</span>
              <br/>
              <select required name="simpatia">
                <option>Editrudis Beltrán</option>
                <option>Jorge Asjana</option>
                <option>Indeciso</option>
                <option selected hidden>Seleccionar Candidato...</option>
              </select>
            </div>
            <button className="simpatia_registrar_btn">
              Registrar Simpatía
            </button>
          </form>

        </div>
      )
    }
}