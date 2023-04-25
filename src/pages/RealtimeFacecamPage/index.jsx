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
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}  className={styles.modal_popup}>
            <div className={styles.modal_body}>
                <div>화면송출</div>
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