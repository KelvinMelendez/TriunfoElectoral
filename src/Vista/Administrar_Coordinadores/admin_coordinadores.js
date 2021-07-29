import React from 'react';
import './admin_coordinadores.css';
import logo from './Logotipo.svg';

import url_server from '../../VariablesGlobales.js';

export default class Admin_Coordinadores extends React.Component{

    constructor(props){
        super(props);
        this.state={
          lista_coordinadores:['Cargando...'],
          pagina:'1',
          datos:{
            '1':[
              {'cod_docente':'cargando','nombre_docente':'cargando','coordinador':'Sin Definir'}
            ]
          },
          pantalla_maxima:1000,
          escuela:'todos',
          campus:'Cargando Campus..',
          facultad:'Cargando Facultades',
          opciones_filtros:{
            'Cargando Campus..':{
              'Cargando Facultades':['Cargando Escuela']
            }
          },
          coordinador_masivo:'no definido'
        }

        this.lista_coordinadores=this.lista_coordinadores.bind(this)
    }

    // Lifecycle
    componentDidMount(){
      //Reiniciar valores de filtros
      localStorage.setItem('campus','')
      localStorage.setItem('facultad','')
      localStorage.setItem('escuela','')

      //Obtener listado coordinadores
      this.lista_coordinadores()

      //Actualizar docentes
      fetch(url_server+'lista_docentes',{method:'POST'}).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          datos:resp_json['value']
        })
      })

      //Actualizar opciones de los filtros
      fetch(url_server+'listado_opciones_filtro',{method:'POST'}).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        console.log(resp_json)
        this.setState({
          opciones_filtros:resp_json,
          campus:'Seleccionar Campus..',
          facultad:'Seleccionar Facultad'
        })
      })

    }

    lista_coordinadores(){
      fetch(url_server+'lista_coordinadores',{method:'POST'}).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          lista_coordinadores:resp_json['lista_nombres']
        })
      })
    }

    async filtros(){
      //Crear datos form
      var datos=new FormData()
      datos.append('facultad',this.state.facultad)
      datos.append('escuela',this.state.escuela)
      datos.append('campus',this.state.campus)

      fetch(url_server+'lista_docentes_filtro',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        let keys=Object.keys(resp_json['value'])
        if(keys.length>0){
          this.setState({
            datos:resp_json['value'],
            pantalla_maxima:resp_json['pantalla_maxima'],
          })
        }else{
          this.setState({
            datos:{
              '1':[
                {'cod_docente':'No data','nombre_docente':'No data','coordinador':'No data'}
              ]
            },
            pantalla_maxima:'1',
          })
        }

      })

    }

    async actualizar_coordinador(e){
      //Valores
      var cod_docente=e.target.getAttribute('codigo_docente')
      var coordinador=e.target.value

      //Form Data
      let datos=new FormData()
      datos.append('cod_docente',cod_docente)
      datos.append('coordinador',coordinador)

      //Enviar Datos
      fetch(url_server+'actualizar_coordinador',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        if(resp_json['value']=='ok'){
          alert('Coordinador actualizado')
        }else{
          alert('Error al actualizar coordinador')
        }
      })
    }

    async asignar_coordinador_masivo(e){
      //Obtener valores
      var coordinador=this.state.coordinador_masivo

      if(this.state.coordinador_masivo=='no definido'){
        alert('Favor seleccionar coordinador...')
        return null
      }

      if(this.state.campus=='Cargando Campus..' || this.state.campus=='Seleccionar Campus..'){
        alert('Favor aplica filtros para asignar coordinador...')
        return null
      }

      //Form Data
      var datos = new FormData()
      datos.append('coordinador_masivo',coordinador)
      datos.append('campus',localStorage.getItem('campus'))
      datos.append('facultad',localStorage.getItem('facultad'))
      datos.append('escuela',this.state.escuela)

      //Enviar Datos
      fetch(url_server+'actualizar_coordinador_masivos',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        if(json['value']=='ok'){
          alert('Coordinador Actualizado')
        }
      })

    }

    render(){
        return(
          <div className="admin_coordinadores_container">
            <br/>
            <br/>
            <center>
              <div className="admin_coordinadores_filtros_container">
              <div className="admin_coordinadores_filtro">
                  <span>Seleccionar Campus</span>
                  <br/>
                  <select onChange={(e)=>{
                    let campus=e.target.value
                    let facultad=Object.keys(this.state.opciones_filtros[e.target.value])[0]
                    let escuela=this.state.opciones_filtros[campus][facultad][0]
                    this.setState({
                      campus:campus,
                      facultad:facultad,
                      escuela:escuela
                    })
                  }}>
                    {
                      Object.keys(this.state.opciones_filtros).map((value,index,array)=>{
                        return (
                          <option key={index}>{value}</option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="admin_coordinadores_filtro">
                  <span>Seleccionar Facultad</span>
                  <br/>
                  <select onChange={(e)=>{
                    let facultad=e.target.value
                    let escuela=this.state.opciones_filtros[this.state.campus][facultad][0]

                    this.setState({
                      facultad:facultad,
                      escuela:escuela
                    })
                  }}>
                    {
                      Object.keys(this.state.opciones_filtros[this.state.campus]).map((value,index,array)=>{
                        return (
                          <option key={index}>{value}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="admin_coordinadores_filtro">
                  <span>Seleccionar Escuela</span>
                  <br/>
                  <select onChange={(e)=>{
                    this.setState({
                      escuela:e.target.value
                    })
                  }}>
                    {
                      this.state.opciones_filtros[this.state.campus][this.state.facultad].map((value,index,array)=>{
                        return (
                          <option key={index}>{value}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <br/>
                <br/>
                <center>
                  <div className="admin_btn_filtro" onClick={(e)=>{
                    localStorage.setItem('campus',this.state.campus)
                    localStorage.setItem('facultad',this.state.facultad)
                    localStorage.setItem('escuela',this.state.escuela)
                    this.filtros()
                  }}>
                    Filtrar
                  </div>
                </center>
                <br/>
              </div>
              <br/>
              <span style={{fontWeight:'bold'}}>Filtros Vigentes</span>
              <br/>
              <span>{localStorage.getItem("campus")} - {localStorage.getItem("facultad")} - {localStorage.getItem("escuela")}</span>
              <br/>
              <br/>
              <div className="admin_coordinadores_contenedor_btn">
                  <div onClick={(e)=>{
                    let valor_actual=this.state.pagina
                    valor_actual=parseInt(valor_actual)
                    valor_actual=valor_actual-1

                    console.log(valor_actual)

                    if(valor_actual<1){
                      this.setState({
                        pagina:'1'
                      })
                    }else{
                      this.setState({
                        pagina:valor_actual.toString()
                      })
                    }
                  }}>
                    Atras
                  </div>
                  <div onClick={(e)=>{
                    let valor_actual=this.state.pagina
                    valor_actual=parseInt(valor_actual)
                    
                    if(valor_actual>=this.state.pantalla_maxima){
                      valor_actual=valor_actual
                      this.setState({
                        pagina:valor_actual.toString()
                      })
                    }else{
                      valor_actual=valor_actual+1
                      this.setState({
                        pagina:valor_actual.toString()
                      })
                    }

                  }}>
                    Siguiente
                  </div>
              </div>
              <div className="admin_contenedor_tabla">
  
                <table className="admin_docentes">
                  <tr>
                    <th>Asignar Coordinador</th>
                    <th>Coordinador Actual</th>
                    <th>Código del Docente</th>
                    <th>Nombre del Docente</th>
                  </tr>
                  {
                        this.state.datos[this.state.pagina].map((value,index,array)=>{
                          var cod_docente=value['cod_docente']
                          var nombre_docente=value['nombre_docente']
                          var coordinador=value['coordinador']
                          return (
                            <tr>
                              <td>
                                <select codigo_docente={cod_docente} onChange={(e)=>{
                                  this.actualizar_coordinador(e)
                                }}>
                                  {
                                    this.state.lista_coordinadores.map((value,index,array)=>{
                                      return (
                                        <option>{value}</option>
                                      )
                                    })
                                  }
                                  <option hidden selected>Seleccionar...</option>
                                </select>
                              </td>
                              <td>{coordinador}</td>
                              <td>{cod_docente}</td>
                              <td>{nombre_docente}</td>
                            </tr>
                          )
                        })
                  }
                </table>
                <br/>
                <br/>

                <span>Asignacion Masiva</span>
                <br/>
                {
                  <select onChange={(e)=>{
                    this.setState({
                      coordinador_masivo:e.target.value
                    })
                  }}>
                    {
                      this.state.lista_coordinadores.map((value,index,array)=>{
                        return (
                          <option>{value}</option>
                        )
                      })
                    }
                    <option hidden selected>Seleccionar...</option>
                  </select>
                  }
                  <br/>
                  <button onClick={(e)=>{
                    this.asignar_coordinador_masivo(e)
                  }}>
                    Asignar Coordinador Masivo
                  </button>
              </div>
            </center>
          </div>
        )
      
    }
}