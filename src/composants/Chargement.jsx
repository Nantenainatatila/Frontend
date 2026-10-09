function Chargement({ texte = "Chargement..." }) {
    return (
        <div className="page-chargement" role="status" aria-live="polite">
            <span className="spinner" />
            <p>{texte}</p>
        </div>
    );
}
export default Chargement;
