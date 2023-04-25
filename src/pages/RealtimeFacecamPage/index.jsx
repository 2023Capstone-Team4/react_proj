import styles from "./RealtimeFacecam.module.css"
function RealtimeFacecamPage(){
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
                종료
            </div>
            <div className={styles.setting_button}>
                상세 설정
            </div>
        </div>
    </>;
}
export default RealtimeFacecamPage;