import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ContactModal from "../components/ContactModal";
import { useContacts } from "../context/ContactProvider";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";

const ContactList = () => {
    const { contacts } = useContacts();
    const [showContactModal, setShowContactModal] = useState(false);
    const [type, setType] = useState("");
    const [activeContact, setActiveContact] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [msg, setMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const closeContactModal = () => {
        setActiveContact({});
        setShowContactModal(false);
        setType("");
    };

    const closeConfirmModal = () => {
        setActiveContact({});
        setShowConfirmModal(false);
    };

    const handleAdd = () => {
        setType("Add");
        setShowContactModal(true);
    };

    return (
        <div>
            <ToastMessage
                type="Success"
                show={msg ? true : false}
                message={msg}
                handleClose={() => setMsg("")}
            />
            <ToastMessage
                type="Error"
                show={errorMsg ? true : false}
                message={errorMsg}
                handleClose={() => setErrorMsg("")}
            />
            <ContactModal
                show={showContactModal}
                handleClose={closeContactModal}
                type={type}
                contact={activeContact}
            />
            <ConfirmModal
                show={showConfirmModal}
                handleClose={closeConfirmModal}
                id={activeContact.id}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                <h2 className="text-center">Contact List</h2>
                <Button onClick={handleAdd}>Add Contact</Button>
            </div>
            <Table
                striped
                bordered
                responsive
                variant="dark"
            // style={{ maxWidth: "800px", justifyContent: "center" }}
            >
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>S.No</th>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "30%" }}>Phone</th>
                        <th style={{ width: "30%" }}>Address</th>
                        <th style={{ width: "5%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address}</td>
                            <td className="d-flex flex-row justify-content-around">
                                <i
                                    className="bi bi-pencil-square icon"
                                    onClick={() => {
                                        setActiveContact(contact);
                                        setType("Edit");
                                        setShowContactModal(true);
                                    }}></i>
                                <i
                                    className="bi bi-trash3 icon"
                                    onClick={() => {
                                        setActiveContact(contact);
                                        setShowConfirmModal(true);
                                    }}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ContactList;
