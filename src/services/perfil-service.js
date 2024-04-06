function CarregarUsuario(){
    return JSON.parse(localStorage.getItem('usuario'));
}

function obterFoto(){
    const usuario = CarregarUsuario();
    return usuario ? usuario.foto : null;
}

function obterNome(){
    const usuario = CarregarUsuario();
    return usuario ? usuario.nome : null;
}

function obterId(){
    const usuario = CarregarUsuario();
    return usuario ? usuario.id : null;
}

function obterData(){
    const usuario = CarregarUsuario();
    return usuario ? usuario.dataCadastro : null;
}

function obterEmail(){
    const usuario = CarregarUsuario();
    return usuario ? usuario.email : null;
}

export default {
    obterFoto,
    obterNome,
    obterId,
    obterData,
    obterEmail
}

export {
    obterNome
}
