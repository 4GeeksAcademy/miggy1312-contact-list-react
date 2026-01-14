import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex text-center">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Mis Contactos</span>
				</Link>
				<div className="ml-auto">
					<Link to="/add-contact">
						<button className="btn btn-primary">Crear nuevo contacto</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};