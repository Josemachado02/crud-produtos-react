import "./index.css";
import perfilService from "../../services/perfil-service";
import { format } from 'date-fns';


export default function Perfil(){
    return (
        <>
            <div id="container-perfil" className="container">
                <div id="img-perfil">
                    <img src={perfilService.obterFoto()} alt="Foto de perfil"/>
                </div>

                <div id="div-superior" className="row col-sm-12"> 
                    <div className="col-sm-3">
                        <label htmlFor="id-usuario" className="form-label">Id:</label>
                        <input id="id-usuario" type="text" disabled className="form-control" 
                        value={perfilService.obterId()}/>
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="nome-usuario" className="form-label">Nome:</label>
                        <input id="nome-usuario" type="text" disabled className="form-control" 
                        value={perfilService.obterNome()}/>
                    </div>                
                </div>

                <div id="div-inferior" className="row col-sm-12">
                    <div className="col-sm-6">
                        <label htmlFor="email-usuario" className="form-label">Email:</label>
                        <input id="email-usuario" type="text" disabled className="form-control" 
                        value={perfilService.obterEmail()}/>
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="data-usuario" className="form-label">Data de Cadastro:</label>
                        <input id="data-usuario" type="text" disabled className="form-control" 
                        value={format(perfilService.obterData(), 'dd/MM/yyyy')}/>
                    </div>
                </div>
            </div>

            <div id="copyright">
                <label htmlFor="copyright"> © 2024 - José Walter</label>
            </div>
        </>
    )
}