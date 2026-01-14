import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();


    const [idToDelete, setIdToDelete] = useState(null);

    const createAgenda = () => {
        fetch("https://playground.4geeks.com/contact/agendas/miggy1312", {
            method: "POST",
        })
            .then(response => {
                if (response.ok) {
                    console.log("¡Agenda creada con éxito!");
                }
            })
    }


    const deleteContact = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/miggy1312/contacts/${idToDelete}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    console.log("¡Contacto borrado con éxito!");
                    getContacts();
                    setIdToDelete(null);
                }
            })
    }

    const getContacts = () => {
        fetch("https://playground.4geeks.com/contact/agendas/miggy1312/contacts")
            .then(response => {
                if (!response.ok) {
                    console.log("La agenda no existe, creándola...");
                    createAgenda();
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    dispatch({
                        type: "load_contacts",
                        payload: data.contacts
                    });
                }
            })
    }

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="container mt-5">


            <div className="list-group">
                {store.contacts?.map((item) => (
                    <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <div className="d-flex align-items-center">

                            <img
                                src="https://picsum.photos/200"
                                alt="avatar"
                                className="rounded-circle me-4"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />


                            <div className="d-flex flex-column text-start">
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="mb-1 text-muted">
                                    <i className="fa-solid fa-location-dot me-2"></i>{item.address}
                                </p>
                                <p className="mb-1 text-muted">
                                    <i className="fa-solid fa-phone me-2"></i>{item.phone}
                                </p>
                                <p className="mb-0 text-muted">
                                    <i className="fa-solid fa-envelope me-2"></i>{item.email}
                                </p>
                            </div>
                        </div>


                        <div>
                            <Link to={`/edit/${item.id}`} className="btn btn-outline-secondary me-3">
                                <i className="fa-solid fa-pencil"></i>
                            </Link>


                            <button
                                className="btn btn-outline-danger"
                                onClick={() => setIdToDelete(item.id)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {idToDelete && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">¿Estás seguro?</h5>
                                <button type="button" className="btn-close" onClick={() => setIdToDelete(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Si borras este contacto, no podrás recuperarlo. ¿Quieres continuar?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIdToDelete(null)}>
                                    Oh no, cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={deleteContact}>
                                    Sí, borrarlo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}