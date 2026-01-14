import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const AddContact = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const saveContact = () => {
        fetch("https://playground.4geeks.com/contact/agendas/miggy1312/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log("¡Contacto creado!");
                    navigate("/");
                    
                }
            })
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h1 className="text-center mb-4">Añadir nuevo contacto</h1>
                    
                    <div className="card shadow-sm p-4">
                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input type="text" className="form-control" placeholder="Ej: Pepe Pérez" 
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Ej: pepe@correo.com" 
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" placeholder="Ej: +34 600 000 000" 
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" placeholder="Ej: Calle Falsa 123" 
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-lg" onClick={saveContact}>
                                Guardar Contacto
                            </button>
                        </div>
                        
                        <div className="mt-3 text-center">
                             <Link to="/">o volver a la lista</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;