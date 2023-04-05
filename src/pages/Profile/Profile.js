import React from "react";
import Menu from "../../components/Menu";
import perfil from '../../images/perfil.gif'


export default function Profile() {

    return (
        <div className="conteudoHome">
            <Menu></Menu>
            <div className="apresentacao">
                <div className="containerlanc">
                    <div>
                        <img src={perfil} alt="perfil" className="imgProfile"></img>
                    </div>
                    <div className="divEmailUser">
                        Usuario: emaildousuarioaqui@mail.com<br /><br />
                    </div>
                    <div className="divNewSenha">
                        Nova Senha: <input type="password" className="txtmeses" placeholder="********"></input>
                        Repetir Nova Senha: <input type="password" className="txtmeses" placeholder="********"></input>
                    </div>

                    <br />
                    <button className="btnInsert">Alterar</button>
                </div>
            </div>
        </div>
    )
}