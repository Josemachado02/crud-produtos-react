import "./index.css";
import imgHome from "../../img/logHome.png";
import { obterNome } from "../../services/perfil-service";

export default function Home(){
    const nome = obterNome();
    return (
        <div id="Inicial">

            <div className="container"> 
                <h2 id="titulo"> 
                    Olá, {nome}! Seja bem-vindo ao nosso sistema. Estamos aqui para ajudá-lo a gerenciar seus produtos de forma eficiente e simplificada. 
                    Conte conosco para facilitar o seu dia a dia! 
                </h2> 

                <h3 id="txt-informativo"> 
                Aqui no nosso Sistema de Gerenciamento de Produtos, você pode facilmente controlar o estoque, adicionar novos produtos, 
                    gerenciar pedidos e acompanhar o desempenho das vendas. 
                    Simplifique sua gestão de produtos conosco e aumente a eficiência do seu negócio. 
                    Comece agora e descubra como podemos facilitar o seu dia a dia!
                </h3>

                <div id="div-imagem">
                    <img src={imgHome}/>
                </div> 


            </div>
            
            <div id="copyright">
                <label for="copyright"> © 2024 - José Walter</label>
            </div> 
        </div>


    )
}