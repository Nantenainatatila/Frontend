
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        <section id="login_creer">
            <div className="container">
                <header>
                    <h5>Login</h5>
                </header>
                <form>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email (par defaut 'devnantenaina@gmail.com')"
                    />
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Mot de passe (par defaut '4515')"
                    />
                </form>
                <footer>
                    {erreur && (
                        <p className="message-erreur">{erreur}</p>
                    )}
                    <button className={"action" + (loading ? " btn-loading" : "")} disabled={loading} type="submit" onClick={handleSubmit}>
                        {loading? "Connection en cours..." : "Se connecter"}
                    </button>
                    <p>Vous n'avez pas encore de compte? </p> 
                    <Link to="/creation">
                        Creer un compte
                    </Link>
                </footer>
            </div>
        </section>
    );
}
export default Login;