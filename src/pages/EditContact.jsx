import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    
    useEffect(() => {
        
        fetch("https://playground.4geeks.com/contact/agendas/miggy1312/contacts")
            .then(response => {
                if (!response.ok) throw new Error("No se pudo cargar la agenda");
                return response.json();
            })
            .then(data => {
                
                const contactToEdit = data.contacts.find(contact => contact.id == id);

                if (contactToEdit) {
                    setName(contactToEdit.name);
                    setEmail(contactToEdit.email);
                    setPhone(contactToEdit.phone);
                    setAddress(contactToEdit.address);
                } else {
                    console.error("Contacto no encontrado en la agenda");
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    
    const validateInputs = () => {
        
        if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
            setErrorMessage("Por favor, rellena todos los campos.");
            setError(true);
            return false;
        }

        
        if (!email.includes("@")) {
            setErrorMessage("El email no es válido (falta el '@').");
            setError(true);
            return false;
        }

        
        if (phone.length < 6) {
            setErrorMessage("El teléfono es muy corto.");
            setError(true);
            return false;
        }

        setError(false);
        return true;
    };

    const saveContact = () => {
        if (!validateInputs()) return;

        fetch(`https://playground.4geeks.com/contact/agendas/miggy1312/contacts/${id}`, {
            method: "PUT",
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
                navigate("/");
            } else {
                alert("Hubo un error al actualizar");
            }
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h1 className="text-center mb-4">Editar contacto</h1>
                    
                    <div className="card shadow-sm p-4">
                        {error && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        )}

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
                            <input type="text" className="form-control" placeholder="Ej: 600 000 000" 
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" placeholder="Ej: Calle Falsa 123" 
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-lg" onClick={saveContact}>
                                Guardar Cambios
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

export default EditContact;