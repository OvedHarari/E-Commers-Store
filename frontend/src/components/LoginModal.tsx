import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import { SiteTheme } from "../App";

interface LoginModalProps {
    show: boolean;
    onHide: Function;
    setUserInfo: Function;
    passwordShown: boolean;
    togglePassword: Function;
    setOpenRegisterModal: Function;
}

const LoginModal: FunctionComponent<LoginModalProps> = ({ show, onHide, setUserInfo, passwordShown, togglePassword, setOpenRegisterModal }) => {
    let theme = useContext(SiteTheme);
    let [editForm, setEditForm] = useState<boolean>(true)

    return (<div
        className="modal show"
        style={{ display: "block", position: "initial" }}
    >
        <Modal
            className={`${theme} set-modal`}
            show={show}
            onHide={() => { onHide(); setEditForm(true) }}
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered  >
            <Modal.Header closeButton>
                <div className="row w-100">
                    <div className="col-12 text-center">
                        <Modal.Title className="display-3">
                            Login</Modal.Title>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Login
                    onHide={onHide}
                    setUserInfo={setUserInfo}
                    passwordShown={passwordShown}
                    togglePassword={togglePassword}
                    setOpenRegisterModal={setOpenRegisterModal}
                // userProfile={userProfile}
                // setUserProfile={setUserProfile}
                // editForm={editForm}
                // setEditForm={setEditForm}
                // render={render}
                />
            </Modal.Body>
        </Modal>
    </div>);
}

export default LoginModal;