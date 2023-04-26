import styles from "./RealtimeFacecam.module.css"
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Modal from 'react-modal';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function OpenModalButton({ onClick }) {
    return (
        <button onClick={onClick} className={styles.modal_button}>
            상세설정
        </button>
    );
}

function ModalContent({isOpen, onRequestClose, handleMute, handleShow}){
    const [cam_checked, cam_setChecked] = useState(false);
    const [audio_checked, audio_setChecked] = useState(false);
    const [sleep_checked, sleep_setChecked] = useState(false);
    const [pose_checked, pose_setChecked] = useState(false);

    const cam_toggleSwitch = () => {
        cam_setChecked(!cam_checked);
        handleShow();
        console.log("cam_checked", !cam_checked);
    };
    const audio_toggleSwitch = () => {
        audio_setChecked(!audio_checked);
        handleMute();
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
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal_popup}>
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
                            <input type="checkbox" checked={pose_checked} onChange={pose_toggleSwitch} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <button className={styles.modalCloseButton} onClick={onRequestClose}>닫기</button>
            </div>
        </Modal>
    );
}
function RealtimeFacecamPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    // 실시간 화상 회의 ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    const sockJS = new SockJS("http://localhost:8080/webSocket");
    const stompClient = Stomp.over(sockJS);
    stompClient.debug = () => { };
    //////////////////////////////////////////////////////////////
    const [mute, setMute] = useState(true);
    const [show, setShow] = useState(true);

    const [streams, setStreams] = useState([]);

    const room = 1;
    const { userId } = useParams();
    const userName = userId;

    const [myStream, setMyStream] = useState();
    let myPeerConnections;

    useEffect(() => {
        let _myStream;
        myPeerConnections = new Map();

        const getMedia = async () => {
            _myStream = await navigator.mediaDevices.getUserMedia(
                {
                    audio: true,
                    video: true,
                }
            );

            setMyStream(_myStream);

            return _myStream
        }

        const init = async () => {
            await getMedia().then(res=>{
                makeConnection(userName,res);
            })
            await stompClient.send(`/welcome/${room.roomName}`, {}, JSON.stringify({ "id": userName[0] }));
        }

        init();

        // RTC Code
        function makeConnection(_user, _myStream) {
            let _myPeerConnections = new RTCPeerConnection();
            _myPeerConnections.addEventListener("icecandidate", handleIce);
            _myPeerConnections.addEventListener("track", handleAddStream);
            _myPeerConnections.addEventListener("connectionstatechange", handleChange);
            _myStream
                .getTracks()
                .forEach((track) => _myPeerConnections.addTrack(track, _myStream));

            myPeerConnections.set(_user, _myPeerConnections);
        }

        function handleIce(e) {
            //console.log("sent candidate: ", e.candidate);
            stompClient.send(`/ice/${room.roomName}`, {}, JSON.stringify({
                id: userName,
                ice: e.candidate
            }));
        }

        function handleAddStream(data) {
            //console.log("final: ", data.streams[0], _myStream);
            //console.log(data);
            setStreams((prev) => [...prev, data.streams[0]]);
        }

        function handleChange(myPeerConnection) {
            if (myPeerConnection.iceConnectionState === "disconnected") {
                console.log("change_state");
            }
        }

        //stompClient
        stompClient.connect({}, () => {
            stompClient.subscribe(`/topic/welcome/${room.roomName}`, async (data) => {
                //console.log("data: ", JSON.parse(data.body));
                if (JSON.parse(data.body).id === userName) return;
                console.log("send the offer");
                makeConnection(JSON.parse(data.body).id, _myStream);
                const offer = await myPeerConnections.get(JSON.parse(data.body).id).createOffer();
                myPeerConnections.get(JSON.parse(data.body).id).setLocalDescription(offer);
                stompClient.send(`/offer/${room.roomName}`, {}, JSON.stringify({
                    id: userName,
                    callee: userName,
                    offer: offer,
                }));
            });
            stompClient.subscribe(`/topic/offer/${room.roomName}`, async (offer) => {
                //console.log("offer: ", JSON.parse(offer.body));
                if (JSON.parse(offer.body).id === userName) return;
                const callee = JSON.parse(offer.body).callee;
                console.log("received the offer and send the answer");
                if (!myPeerConnections.has(JSON.parse(offer.body).callee)) {
                    makeConnection(JSON.parse(offer.body).callee, _myStream);
                    myPeerConnections.get(JSON.parse(offer.body).callee).setRemoteDescription(JSON.parse(offer.body).offer);
                    const answer = await myPeerConnections.get(JSON.parse(offer.body).callee).createAnswer();
                    myPeerConnections.get(JSON.parse(offer.body).callee).setLocalDescription(answer);
                    stompClient.send(`/answer/${room.roomName}`, {}, JSON.stringify({
                        id: userName,
                        callee: callee,
                        caller: userName,
                        answer: answer,
                    }));
                }
            });
            stompClient.subscribe(`/topic/answer/${room.roomName}`, (answer) => {
                if (JSON.parse(answer.body).id === userName) return;
                console.log("received the answer");
                if (JSON.parse(answer.body).callee === userName) {
                    myPeerConnections.get(JSON.parse(answer.body).caller).setRemoteDescription(JSON.parse(answer.body).answer);
                }
            });
            stompClient.subscribe(`/topic/ice/${room.roomName}`, (ice) => {
                //console.log("ice: ", JSON.parse(ice.body));
                if (JSON.parse(ice.body).id === userName) return;
                console.log("received candidate");
                myPeerConnections.get(JSON.parse(ice.body).id).addIceCandidate(JSON.parse(ice.body).ice);
            });
            stompClient.subscribe(`/topic/exit/${room.roomName}`, (ice) => {
                //console.log("exit: ", JSON.parse(ice.body));

                if (JSON.parse(ice.body).id === userName) {
                    const localStream = myPeerConnections.get(JSON.parse(ice.body).id).getLocalStreams()[0];
                    if (localStream) {
                        localStream.getTracks().forEach((track) => track.stop());
                    }
                }
                else {
                    const remoteStream = myPeerConnections.get(JSON.parse(ice.body).id).getRemoteStreams()[0];
                    if (remoteStream) {
                        remoteStream.getTracks().forEach((track) => track.stop());
                    }
                }
                myPeerConnections.get(JSON.parse(ice.body).id).close();
                setStreams((prev) => prev.filter(stream => stream.active));
            });
        });
    }, []);


    //Mute and Show func
    function handleMute() {
        setMute(cur => !cur);
        myStream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled
        });
        streams.forEach((stream) => {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled
            })
        });
    }

    function handleShow() {
        setShow(cur => !cur);
        myStream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled
        })
        streams.forEach((stream) => {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled
            })
        });
    }

    function handleExit() {
        stompClient.send(`/exit/${room.roomName}`, {}, JSON.stringify({
            id: userName,
        }));
        setStreams([]);
    }
    //////////////////////////////////////////////////////////////

    return <>
        <div className={styles.container}>
            <div className={styles.container_title}>
                화상학습
            </div>
            <div className={styles.wrapper}>
                {/* <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div>
                <div className={styles.item_camera}></div> */}
                <VideoPlayer stream={myStream} />
                {[...new Set(streams)].map((stream, index) => <>
                    <VideoPlayer
                        key={stream.id}
                        stream={stream} />
                </>
                )}
            </div>
            <div className={styles.bottom_layer}>
                <button className={styles.finish_button} onClick={handleExit}>
                    <Link to={`${process.env.PUBLIC_URL}/mystudy`}>종료</Link>
                </button>
                <div className={styles.setting_button}>
                    <OpenModalButton onClick={openModal} />
                    <ModalContent 
                        handleMute={handleMute}
                        handleShow={handleShow}
                        isOpen={modalIsOpen} onRequestClose={closeModal} />
                </div>
            </div>

        </div>
    </>;
}

function VideoPlayer({ stream }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className={styles.item_camera_wrapper}>
            <video
                className={styles.item_camera}
                ref={videoRef}
                autoPlay
                playsInline />
        </div>
    );
}

export default RealtimeFacecamPage;