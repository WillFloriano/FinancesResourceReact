import styles from "./Register.module.css"

import {useState, useEffect} from 'react'
import { useAuthentication } from "../../hooks/userAuthentication"


const Register = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPasssword] = useState("")
    const [error, setError] = useState("")
    const {createUser, error: authError, loading} = useAuthentication();
    const [aviso, setAviso] = useState(null)
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        const user = {
            email,
            password
        }

        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createUser(user);                     
    
          setAviso("Cadastrado com sucesso!")
    
          if(!res.error)
          {
            const timer = setTimeout(() =>{
                setAviso("");
                setEmail("");
                setPassword("");
                setConfirmPasssword("");
                
              }, 1000);
        
              return () => clearTimeout(timer);
          }
    };    

    useEffect(() => {
        if(authError) {
          setError(authError)
        }
      }, [authError])

    return (
        <div className={styles.register}>
       <h1>Cadastre-se para começar</h1>
       <p>Crie seu usuário e organize suas finanças</p>
       <form onSubmit={handleSubmit}>       
        <label>
            <span>Email:</span>
            <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            <span>Senha:</span>
            <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
            <span>Confirmação de senha:</span>
            <input type="password" name="confirmPassword" required placeholder='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPasssword(e.target.value)} />
        </label>        
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
        {aviso && <p className="aviso">{aviso}</p>}
       </form>
    </div>
    )
}

export default Register