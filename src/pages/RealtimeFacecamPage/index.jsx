import styles from "./RealtimeFacecam.module.css"
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import {useState} from "react";

function OpenModalButton({onClick}){
    return (
        <button onClick={onClick} className={styles.modal_button}>
            상세설정
        </button>
    );
}
function ModalContent({isOpen, onRequestClose}){
    const [checked, setChecked] = useState(false);

    const toggleSwitch = () => {
        setChecked(!checked);
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}  className={styles.modal_popup}>
            <div className={styles.modal_body}>
                <div className={styles.modal_title}>설정</div>
                <div className={styles.modal_opt1}>
                    <div className={styles.modal_cam}>화면설정</div>
                    <div className={styles.modal_cam_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={checked} onChange={toggleSwitch}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div>음소거</div>
                <div>졸음알림</div>
                <div>자세교정 알림</div>
                <button className={styles.modalCloseButton} onClick={onRequestClose}>닫기</button>
            </div>
        </Modal>
    );
}
function RealtimeFacecamPage(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    return <>
        <div className={styles.container}>
            <div className={styles.container_title}>
                화상학습
            </div>
            <div className={styles.wrapper}>
                <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div>
            </div>
            <div className={styles.bottom_layer}>
                <button className={styles.finish_button}>
                    <Link to={`${process.env.PUBLIC_URL}/mystudy`}>종료</Link>
                </button>
                <div className={styles.setting_button}>
                    <OpenModalButton onClick={openModal}/>
                    <ModalContent isOpen={modalIsOpen} onRequestClose={closeModal}/>
                </div>
            </div>

        </div>
    </>;
}
export default RealtimeFacecamPage;