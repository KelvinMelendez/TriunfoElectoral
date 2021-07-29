import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import url_server  from '../../VariablesGlobales';
import './Tablas.css';

export default class Tabla extends React.Component {

    constructor(props){
        super(props);
		this.state={
		}

		this.verificar_sesion=this.verificar_sesion.bind(this);
    }

    
    verificar_sesion(){
        let usuario=localStorage.getItem("username");

        if((usuario==null) || (usuario=="null")){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="tabla_contenedor_principal">
                <table>
                    <tr>
                        <th>
                            Usuario
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Perfil
                        </th>
                        <th>
                            Eliminar Usuario
                        </th>
                    </tr>
                    {
                        this.props.datos.map((value,index,array)=>{
                            return(
                                <tr>
                                    <td>
                                        {value['Username']}
                                    </td>
                                    <td>
                                        {value['Nombre']}
                                    </td>
                                    <td>
                                        {value['Perfil']}
                                    </td>
                                    <td username = {value['Username']} onClick = {(e)=>{
                                        //Crear Formdata
                                        var datos = new FormData()
                                        datos.append('username',e.target.getAttribute('username'))

                                        //Enviar Solicitud
                                        fetch(url_server + 'eliminar_usuario',{
                                            method:'POST',
                                            body:datos
                                        }).then((resp)=>{
                                            return resp.json()
                                        }).then((json)=>{
                                            if(json['value']='ok'){
                                                alert('Usuario Eliminado Correctamente')
                                                window.location.reload()
                                            }else{
                                                alert('Error al eliminar usuario')
                                                window.location.reload()
                                            }
                                        })
                                        
                                    }}>
                                        Eliminar
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>

            </div>
        );
    }
}