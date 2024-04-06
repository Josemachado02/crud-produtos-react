import "./index.css";
import { Link, useLocation } from "react-router-dom";
import usuarioService from "../../services/usuario-service";
import imgPerfil from "../../img/perfil.png";

export default function Menu(){
    const logout = () => {
        usuarioService.sairDoSistema();
    };

    if(useLocation().pathname !== "/login"){
        return(
            <ul className="menu">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li id="li-sair"><Link onClick={logout}>Sair</Link></li>
                <li><Link to='/perfil'><img src={imgPerfil}/></Link></li>
            </ul>
        )
    }else{
        return null; 
    }

}