import styles from "./RealtimeFacecam.module.css"
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import {useState} from "react";

function Modal(props){

}
function RealtimeFacecamPage(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
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
            <div className={styles.finish_button}>
                <Link to={`${process.env.PUBLIC_URL}/mystudy`}>종료</Link>
            </div>
            <div className={styles.setting_button}>
                <button onClick={()=>setModalIsOpen(true)}>상세설정</button>
                <Modal isOpen={true}>
                    <div>화면송출</div>
                    <div>음소거</div>
                    <div>졸음알림</div>
                    <div>자세교정 알림</div>
                    <button onClick={()=> setModalIsOpen(false)}>X</button>
                </Modal>
            </div>
        </div>
    </>;
}
export default RealtimeFacecamPage;