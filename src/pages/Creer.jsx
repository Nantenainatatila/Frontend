import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "./Login.css";

function Creer() {
    const navigate = useNavigate();
    const [name_user, setNameUsers] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [erreur, setErreur] = useState("");
    const [loading, setLoading] = useState(false);
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        setErreur("");

        if (!name_user || !email || !password || !confirm_password || !role) {
            setErreur("Veuiller remplir tous les champs");
            return;
        }
        setLoading(true);
        try {
            const response = await api.get("/users");
            const existe = response.data.some((user) => user.email.trim().toLowerCase() === email.trim().toLowerCase());
            if (existe) {
                alert("Cet email existe déja");
                return;
            }
            if (!name_user || !email || !password || !confirm_password || !role) {
                alert("Tous les champs dont obligatoires");
                return;
            }
            if (confirm_password !== password) {
                alert ("Les deux mot de passe sont differents");
                return;
            }
            
            await api.post(
                `/users`, 
                    {
                        name_user: name_user,
                        email: email,
                        mot_de_passe: password,
                        role: role
                    }
            );
            alert(`L'utilisateur ${name_user} a été creé avec succès`);
            navigate('/login');
        } catch (error) {
            console.error("errer front de creation d'utilisateur", error);
            alert("non enregistre");  
        } finally {
            setLoading(false);
        }
    };
    return(
        <section id="login_creer">
            <div className="container">
                <header>
                    <h5>Creation de compte</h5>
                </header>
                <form >
                    <input 
                        type="text"
                        value={name_user}
                        onChange={(e) => setNameUsers(e.target.value)}
                        placeholder="Nom d'utilisateur"
                    />  
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email utilisateur"
                    />    
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}     
                        placeholder="Mot de passe"       
                    />        
                    <input 
                        type="password"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                    />
                    <select  value={role}  onChange={(e) => setRole(e.target.value)} >
                        <option value="">--Choisir le role d'utilisateur</option>
                        <option value="admin">Administrateur</option>
                        <option value="coordo">Coordonnateur</option>
                        <option value="enseignant">Enseignant(e)</option>
                    </select> 
                </form>
                <footer>
                    {erreur && (
                        <p className="message-erreur">{erreur}</p>
                    )}
                    <button className={"action" + (loading ? " btn-loading" : "")} disabled={loading} type="submit" onClick={handleSubmit}>
                        {loading? "Creation en cours..." : "Creer un compte" }
                    </button>
                    <p>Vous avez deja un compte? </p>
                    <Link to="/login">
                        Se connecter
                    </Link>
                </footer>
                
            </div>
        </section>
    );
}
export default Creer;