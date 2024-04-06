import "./index.css";
import logo from "../../img/logoLogin.png";
import Swal from "sweetalert2";
import { useState } from "react"
import usuarioService from "../../services/usuario-service";

function Login() {

    const [email, setEmail] = useState("admin@admin.com");
    const [senha, setSenha] = useState("123456");

    const autenticar = () => {

        if(!email || !senha){
           Swal.fire({
            icon: 'error',
            text: "Os campos de e-mail e senha são obrigatórios, verifique!"
           });
        }

        
        usuarioService
        .autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            window.location = "/";    
        })
        .catch(erro => {
            console.log(erro);
        });
    };

    return (
        <div>
            <div className="caixa-login">
                <div id="logoLogin">
                    <img src={logo} alt="logo"/>
                </div>

                <div className="mensagem-erro">
                    <label id="erro-login" for="erro-login"></label><br />
                </div>

                <div className="titulo-login">
                    <h1>Login</h1>
                </div>

                <div className="grupo">
                    <label for="email">E-mail:</label><br />
                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Digite seu e-mail"/>
                </div>

                <div className="grupo">
                    <label for="senha">Senha:</label><br />
                    <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" name="senha" placeholder="Digite sua senha"/>
                </div>

                <div className="esqueci-minha-senha">
                    <a href="#">Esqueci minha senha</a>
                </div>

                <button id="btn-entrar"onClick={autenticar}>Entrar</button>
            </div>

            <div id="copyright">
                <label for="copyright"> © 2024 - José Walter</label>
            </div>
        </div>

        
    );
};

export default Login;