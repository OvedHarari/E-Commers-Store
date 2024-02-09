import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register";
import { SiteTheme } from "../App";

interface RegisterModalProps {
    show: boolean;
    onHide: Function;
    // userInfo: any;
    setUserInfo: Function;
    // setUserProfile: Function;
    passwordShown: boolean;
    togglePassword: Function;
    setOpenLoginModal: Function;
    // render: Function;
}

const RegisterModal: FunctionComponent<RegisterModalProps> = ({ show, onHide, setUserInfo, passwordShown, togglePassword, setOpenLoginModal }) => {
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
            size="xl"
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
                            Register To Shop</Modal.Title>
                    </div>
                    {/* <div className="col-3 w-100 text-end ">
                        <Button variant={editForm ? "success" : "secondary"} onClick={() => setEditForm(false)}>
                            Edit Profile <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                    </div> */}
                </div>
            </Modal.Header>

            <Modal.Body>
                <Register onHide={onHide}
                    setUserInfo={setUserInfo}
                    passwordShown={passwordShown}
                    togglePassword={togglePassword}
                    setOpenLoginModal={setOpenLoginModal}
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

export default RegisterModal;