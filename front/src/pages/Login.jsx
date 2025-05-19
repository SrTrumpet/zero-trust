import {useState} from "react";
import "../style/login.css";

const Login = () =>{

    const [form, setForm] = useState({
        email: "",
        pass : "",
    });

    function handleClick(event) {
        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }
        
    }

    return (
        <>
            <title>Login</title>
            <form onSubmit={handleClick}>
                <label htmlFor="email">
                    <div className="title-container">
                        Ingresa tu correo:
                    </div>
                    <input
                        value = {form.email}
                        type="email"
                        onChange = {e => {
                            setForm({
                                ...form,
                                email : e.target.value
                            });
                        }}
                    />
                </label>

                <br/>

                <label>
                    <div className="title-container">
                        Ingresa tu contraseña:
                    </div>
                    <input
                        value = {form.pass}
                        type="password"
                        onChange = {e => {
                            setForm({
                                ...form,
                                pass : e.target.value
                            });
                        }}
                    />
                </label>

                <br/>
                <div className="btn-container">
                    <button
                        type="submit"
                    >Iniciar Sesión</button>
                </div>
                
            </form>
        </>
    )
}

export default Login;