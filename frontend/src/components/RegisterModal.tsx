import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register";
import { SiteTheme } from "../App";

interface RegisterModalProps {
    show: boolean; onHide: Function; setUserInfo: Function; passwordShown: boolean; togglePassword: Function; setOpenLoginModal: Function;
}

const RegisterModal: FunctionComponent<RegisterModalProps> = ({ show, onHide, setUserInfo, passwordShown, togglePassword, setOpenLoginModal }) => {
    let theme = useContext(SiteTheme);
    let [editForm, setEditForm] = useState<boolean>(true);

    return (<div
        className="modal show"
        style={{ display: "block", position: "initial" }}
    >
        <Modal
            className={`${theme} set-modal`}
            show={show}
            onHide={() => { onHide(); setEditForm(true) }}
            keyboard={false}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered  >
            <Modal.Header closeButton>
                <div className="row w-100">
                    <div className="col-12 text-center">
                        <Modal.Title className="display-3">
                            Register To Shop</Modal.Title>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Register onHide={onHide}
                    setUserInfo={setUserInfo}
                    passwordShown={passwordShown}
                    togglePassword={togglePassword}
                    setOpenLoginModal={setOpenLoginModal}
                />
            </Modal.Body>
        </Modal>
    </div>);
}

export default RegisterModal;