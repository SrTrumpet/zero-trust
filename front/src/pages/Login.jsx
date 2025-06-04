import {useState} from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import "../style/login.css";

const Login = () =>{

    const [form, setForm] = useState({
        email: "",
        pass : "",
    });

    const getFingerprint = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        console.log(result);
        return result.visitorId;
    };

    async function handleClick(event) {
        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }
        const finger = await getFingerprint();
        console.log(finger);
        
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