import React from 'react';
import './crear_campana.css';
import logo from './Logotipo.svg';

import url_server from '../../VariablesGlobales.js';

export default class Crear_Campana extends React.Component{

    constructor(props){
        super(props);
        this.state={
          lista_campanas:['Cargando...'],
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
          numero_telefonico:'no definido',
          msg_texto:'no definido',
          campana_masiva:null
        }

        this.lista_campanas=this.lista_campanas.bind(this)
    }

    // Lifecycle
    componentDidMount(){
      //Reiniciar valores de filtros
      localStorage.setItem('campus','')
      localStorage.setItem('facultad','')
      localStorage.setItem('escuela','')

      //Obtener listado coordinadores
      this.lista_campanas()

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

    lista_campanas(){
      fetch(url_server+'lista_campanas',{method:'POST'}).then((resp)=>{
        return resp.json()
      }).then((resp_json)=>{
        this.setState({
          lista_campanas:resp_json['lista_campanas']
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

    async asignar_campana(e){
      //Variables
      var campana=e.target.value
      var cod_docente=e.target.getAttribute('codigo_docente')

      //Formdata
      var datos=new FormData()
      datos.append('campana',campana)
      datos.append('cod_docente',cod_docente)

      fetch(url_server+'asignar_campana',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        if(json['estatus']=='ok'){
          console.log('Docente Asignada')
        }
      })
    }

    async ejectar_campana(e){
      alert('Asigna Campana Masiva')
    }

    async crear_campana(e){
      //Prevenir comportamiento natural
      e.preventDefault()

      //Form data
      var datos=new FormData(e.target)

      if(datos.get('tipo_campana')=='Seleccionar...'){
        alert('Favor seleccionar el tipo de campaña')
        return null
      }

      //Enviar Datos
      fetch(url_server+'crear_campana',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        if(json['estatus']=='ok'){
          alert('Campaña Creada')
          window.location.reload()
        }else{
          alert('Error al crear Campaña')
        }
      })
    }
    render(){

        return(
          <div className="admin_coordinadores_container">
            <br/>
            <br/>
            <center>
              <div className="contenedor_campanas_marketing">
                <span>Campañas de Marketing</span>
                <br/>
                <br/>
                <form onSubmit={(e)=>{
                  this.crear_campana(e)
                }}>
                  <input required name="nombre_campana" type="text" placeholder="Nombre de la campaña..." />
                  <br/>
                  <select required name="tipo_campana" onChange = {(e)=>{
                    this.setState({
                      tipo_campana:e.target.value
                    })
                  }}>
                    <option>SMS</option>
                    <option>Whatssap</option>
                    <option>Correos</option>
                    <option>Lista Personalizada SMS</option>
                    <option hidden selected>Seleccionar...</option>
                  </select>
                  <br/>
                  <br/>
                  {
                    
                    (this.state.tipo_campana=="Correos") ? 
                      <div><span>Adjuntar Plantilla</span><br/><input accept = ".xlsx,.msg" required name="archivo" type="file" /></div>
                      : (this.state.tipo_campana=="Lista Personalizada") ? <div><span>Redactar Mensaje</span><br/><textarea required name="msg_text"></textarea><br/><span>Adjuntar Plantilla</span><br/><input accept = ".xlsx,.msg" required name="archivo" type="file" /></div>
                        :<div><span>Redactar Mensaje</span><br/><textarea required name="msg_text"></textarea></div>
                  }
                  <br/>
                  <button>
                    Crear Campaña
                  </button>
                </form>
                <br/>
              </div>
              
              
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
              <span style={{fontWeight:'bold'}}>Filtros Vigentes</span>
              <br/>
              <span>{localStorage.getItem("campus")} - {localStorage.getItem("facultad")} - {localStorage.getItem("escuela")}</span>
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
                    <th>Asignar Campaña</th>
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
                                  this.asignar_campana(e)
                                }}>
                                  {
                                    this.state.lista_campanas.map((value,index,array)=>{
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
              </div>
              

              <select onChange = {(e)=>{
                this.setState({
                  campana_masiva : e.target.value
                })
              }}>
                {
                  this.state.lista_campanas.map((value,index,array)=>{
                    return (
                      <option>{value}</option>
                    )
                  })
                }
                <option hidden selected>Seleccionar...</option>
              </select>
              <br/>
              <button onClick={(e)=>{
                if(this.state.campana_masiva){
                  var value = window.confirm("Esta seguro que desea enviar MSM masivos con los siguientes criterios: " + localStorage.getItem("campus")+'-'+localStorage.getItem("facultad")+'-'+localStorage.getItem("escuela"))
                  if(value){
                    //Datos del formulario
                    var datos_form = new FormData()
                    datos_form.append('nombre_campana',this.state.campana_masiva)
                    datos_form.append('filtro',localStorage.getItem("campus")+'|'+localStorage.getItem("facultad")+'|'+localStorage.getItem("escuela"))

                    fetch(url_server+'api_campana_masiva',{
                      method:'POST',
                      body:datos_form
                    }).then((resp)=>{
                      return resp.json()
                    }).then((json)=>{
                      console.log(json)
                      alert('Asignación masiva completada')
                    }).catch((err)=>{
                      alert("Error en la asignación masiva. Ver consola para más detalles.")
                      console.log(err)
                    })
                  }
                  
                }else{
                  alert("Favor seleccionar el nombre de la campaña")
                }

              }}>
                Asignación Masiva
              </button>

            </center>
          </div>
        )
      
    }
}