import {BrowserRouter as Router,Switch,Route,HashRouter} from "react-router-dom";
import './App.css';
import Login from './Vista/Login/login';
import Inicio from './Vista/Inicio/inicio';
import Menu from './Vista/Menu_Administrador/menu';
import Menu_Coordinador from './Vista/Menu_Coordinador/menu';
import Admin_Coordinadores from './Vista/Administrar_Coordinadores/admin_coordinadores';
import Simpatia_Docentes from './Vista/Simpatia Docentes/simpatia_docentes';

import Menu_Marketing from './Vista/Menu_Marketing/menu';
import Menu_Super_Admin from './Vista/Menu_Super_User/menu';

import Crear_Campana from './Vista/Crear Campanas/crear_campana';
import Campana_Directa from './Vista/Campanas_Directas/crear_campana';

import Crear_Usuarios_2 from './Vista/Super_User_Administrar_Usuarios/crear_usuarios';
import Crear_Usuarios from './Vista/Crear_Usuarios_2/crear_usuarios';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/menu_administrador" component={Menu} />
        <Route exact path="/menu_coordinador" component={Menu_Coordinador} />
        <Route exact path="/menu_marketing" component={Menu_Marketing} />
        <Route exact path="/menu_super_admin" component={Menu_Super_Admin} />


        <Route exact path="/admin_coordinadores" component={Admin_Coordinadores} />
        <Route exact path="/simpatia_docentes" component={Simpatia_Docentes} />
        <Route exact path="/crear_usuarios" component={Crear_Usuarios} />
        <Route exact path="/crear_usuarios_2" component={Crear_Usuarios_2} />
        
        <Route exact path="/crear_campanas" component={Crear_Campana} />
        <Route exact path="/campana_directa" component={Campana_Directa} />
      </Switch>
    </HashRouter>
  );
}

export default App;
