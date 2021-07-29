import React from 'react';
import './crear_campana.css';
import logo from './Logotipo.svg';

import url_server from '../../VariablesGlobales.js';

export default class Campana_Directa extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
        this.enviar_camapan_directa=this.enviar_camapan_directa.bind(this)
    }

    enviar_camapan_directa(e){
      //Deshabilitar comportamiento default del form
      e.preventDefault()

      //Datos del formulario
      var datos = new FormData(e.target)

      //Enviar Datos
      fetch(url_server+'campana_directa',{
        method:'POST',
        body:datos
      }).then((resp)=>{
        return resp.json()
      }).then((json)=>{
        if(json['estatus']=='ok'){
          alert('Enviado exitosamente')
          window.location.reload()
        }else{
          alert('Error al enviar el msg. Favor intentar nuevamente')
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
                <span>Campañas de Marketing Directas</span>
                <br/>
                <br/>
                <form onSubmit={(e)=>{
                  this.enviar_camapan_directa(e)
                }}>
                  <select required name="tipo_campana">
                    <option>SMS</option>
                    <option>Whatssap</option>
                    <option hidden selected>Seleccionar tipo mensaje...</option>
                  </select>
                  <br/>
                  <br/>
                  <span>Digitar Numero Telefónico</span>
                  <br/>
                  <input name="numero_telefonico" type="number" />
                  <br/>
                  <br/>
                  <span>Redactar Mensaje</span>
                  <br/>
                  <textarea required name="msg_text">

                  </textarea>
                  <br/>
                  <button>
                    Enviar Mensaje
                  </button>
                </form>
                <br/>
              </div>
            </center>
          </div>
       )
      
    }
}