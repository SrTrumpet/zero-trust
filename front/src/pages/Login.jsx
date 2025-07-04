import { useState, useEffect } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import "../style/login.css";
import { LOGIN } from "../graphql/mutation";
import { useMutation, useLazyQuery } from "@apollo/client";
import clientUser from "../graphql/apolloUserClient";
import { PRINTEO } from "../graphql/query";

const Login = () =>{
    const [form, setForm] = useState({
        email: "",
        pass : "",
    });

    const [login,{data, loading, error}] = useMutation(LOGIN,{client:clientUser});
    //const [printeo] = useLazyQuery(PRINTEO, { client: clientUser }); lo use para el proxy nomas
    const [userAgent, setUserAgent] = useState('');
    const time = new Date();

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            setUserAgent(navigator.userAgent);
        }
    }, []);

    async function handleClick(event) {

        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }

        const navegatorData = await getFingerprint();
        //console.log(navegatorData);

        //Tengo que agregar los datos faltantes, como navegador etc, eso esta en register
        if(!(form.email === "" && form.pass === "")){
            try {
                //Peticion del token del usuario
                const navigator = detectarNavegador(userAgent);
                const operatingSystem = getSistemaOperativo(userAgent);
                const timeZone = navegatorData.components.timezone.value;

                const response = await login({
                    variables:{
                        loginInput:{
                            email: form.email,
                            password: form.pass,
                            time: time,
                            navigator: navigator,
                            operatingSystem: operatingSystem,
                            zone: timeZone,
                        }
                    }
                });

                //Guardar el token en localStorage
                localStorage.setItem("userToken", response.data.login.token);

                //Enviar en el header el toke user para usar la peticion loginDevice y se envia la id del dispositivo
                




            } catch (error) {
                alert(error);
                console.log(error);
            }
        };
    };

    //#####################################################################################
    const getFingerprint = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result;
    };

        function getSistemaOperativo(ua) {
        const match = ua.match(/\(([^)]+)\)/);
        if (!match) return 'Desconocido';

        const contenidoEntreParentesis = match[1];
        const partes = contenidoEntreParentesis.split(';');
        return partes[0].trim();
    }

    function detectarNavegador(userAgent) {
        if (userAgent.includes('Edg')) return 'Edge';
        if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'Opera';
        if (userAgent.includes('Brave')) return 'Brave'; 
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        return 'Desconocido';
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



/*
            alert("Token user recibido! :  "+ response.data.login.token);
            localStorage.setItem("authUserToken", response.data.login.token);
            fetch("http://localhost:3003/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authUserToken")}`
                },
                body: JSON.stringify({
                    operationName: "Echo",
                    query: `
                    query Echo {
                        printeo(operation: "query { dummy }", variables: "{ \\"mensaje\\": \\"hola del front\\" }")
                    }
                    `
                })
                });
*/