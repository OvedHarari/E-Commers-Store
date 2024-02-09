import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import { SiteTheme } from "../App";

interface LoginModalProps {
    show: boolean;
    onHide: Function;
    // userInfo: any;
    setUserInfo: Function;
    // setUserProfile: Function;
    passwordShown: boolean;
    togglePassword: Function;
    setOpenRegisterModal: Function;
    // render: Function;
}

const LoginModal: FunctionComponent<LoginModalProps> = ({ show, onHide, setUserInfo, passwordShown, togglePassword, setOpenRegisterModal }) => {
    let theme = useContext(SiteTheme);
    let [editForm, setEditForm] = useState<boolean>(true)
    // const defaultProfileImage = () => {
    //     if (userInfo.picture) {
    //         return userInfo.picture
    //     } else
    //         if (userProfile.gender) {
    //             switch (userProfile.gender) {
    //                 case "male":
    //                     return "images/users_img/user_male.webp";
    //                 case "female":
    //                     return "images/users_img/user_female.webp";
    //                 case "other":
    //                     return "images/users_img/user_other.jpg";
    //                 default:
    //                     break;
    //             }
    //         }
    //     return "images/users_img/user_male.webp";
    // };

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
                        {/* <img src={userProfile && userProfile.userImgURL ? (`${userProfile.userImgURL}`) : (defaultProfileImage())}
                            className="rounded-circle profileImg"
                            alt="user profile"
                            style={{ maxWidth: "200px" }} /> */}
                        <Modal.Title className="display-3">
                            Login</Modal.Title>
                    </div>
                    {/* <div className="col-3 w-100 text-end ">
                        <Button variant={editForm ? "success" : "secondary"} onClick={() => setEditForm(false)}>
                            Edit Profile <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                    </div> */}
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