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
    const [cam_checked, cam_setChecked] = useState(false);
    const [audio_checked, audio_setChecked] = useState(false);
    const [sleep_checked, sleep_setChecked] = useState(false);
    const [pose_checked, pose_setChecked] = useState(false);

    const cam_toggleSwitch = () => {
        cam_setChecked(!cam_checked);
        console.log("cam_checked", !cam_checked);
    };
    const audio_toggleSwitch = () => {
        audio_setChecked(!audio_checked);
        console.log("audio_checked", !audio_checked);
    };
    const sleep_toggleSwitch = () => {
        sleep_setChecked(!sleep_checked);
        console.log("sleep_checked", !sleep_checked);
    };
    const pose_toggleSwitch = () => {
        pose_setChecked(!pose_checked);
        console.log("pose_checked", !pose_checked);
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}  className={styles.modal_popup}>
            <div className={styles.modal_body}>
                <div className={styles.modal_title}>설정</div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>화면설정</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={cam_checked} onChange={cam_toggleSwitch}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>음소거</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={audio_checked} onChange={audio_toggleSwitch}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>졸음알림</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={sleep_checked} onChange={sleep_toggleSwitch}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>자세교정 알림</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={pose_checked} onChange={pose_toggleSwitch}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
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