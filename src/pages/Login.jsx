
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreur, setErreur] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErreur("");
        
        if (!email || !password) {
            setErreur("Veuiller remplir tous les champs");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post(
                `/users/login`, 
                {
                    email: email,
                    mot_de_passe: password
                }
            );
            //stocker le JWT
            localStorage.setItem("token", response.data.token);
            console.log("token:", response.data.token);
            //Stocker les information de l'utilisateur
            localStorage.setItem("utilisateur", JSON.stringify(response.data.utilisateur));
            console.log("utilisateur:", response.data.utilisateur);

            navigate("/dashoard");
        } catch (error) {
            console.error("erreur de connexion", error);
            setErreur(
                error.response?.data.message || "Erreur lors de la connexion"
            );
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit} >
                    <center>
                        <div className="form_header">
                            <h1>Login</h1>
                        </div>
                    </center>
                    <div className="form_container">
                        <div className="form_group">
                            
                            <label htmlFor="">Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Mot de passe</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        <br />
                        <div>
                            <center>
                                {erreur && (
                                    <p className="message-erreur">{erreur}</p>
                                )}
                                <button className="action" type="submit">
                                    {loading? "Connection en cours..." : "Se connecter"}</button>
                                <p>Vous n'avez pas encore de compte?  
                                    <button className="bouton_connexion" onClick={() => navigate("/creation")}>Creer un compte</button> 
                                </p>
                            </center>
                                
                        </div>
                    
                    </div>
                    
                </form>
            </div>
           
            
        </div>
    );
}
export default Login;