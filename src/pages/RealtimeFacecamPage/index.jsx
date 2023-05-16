import React, { useEffect, useState, useRef, Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styles from "./RealtimeFacecam.module.css"
import Modal from 'react-modal';

function OpenModalButton({ onClick }) {
    return (
        <button onClick={onClick} className={styles.modal_button}>
            상세설정
        </button>
    );
}

function ModalContent({ isOpen, onRequestClose, handleMute, handleShow }) {
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
                            <input type="checkbox" checked={cam_checked} onChange={cam_toggleSwitch} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>음소거</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={audio_checked} onChange={audio_toggleSwitch} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                <div className={styles.modal_opt}>
                    <div className={styles.modal_opt_title}>졸음알림</div>
                    <div className={styles.modal_opt_switch}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={sleep_checked} onChange={sleep_toggleSwitch} />
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
    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
    //const APPLICATION_SERVER_URL = 'http://localhost:5000/';
    let OV;
    const { roomId } = useParams();
    const [mySessionId, setMySessionId] = useState("Room" + roomId);
    const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [session, setSession] = useState();
    const [publisher, setPublisher] = useState();
    const [subscribers, setSubscribers] = useState([]);
    const [mute, setMute] = useState(true);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('beforeunload', onbeforeunload);
        window.removeEventListener('beforeunload', onbeforeunload);
        joinSession();
    }, []);

    function onbeforeunload(e) {
        leaveSession();
    }

    function handleChangeSessionId(e) {
        setMySessionId(e.target.value);
    }

    function handleChangeUserName(e) {
        setMyUserName(e.target.value);
    }

    function deleteSubscriber(streamManager) {
        if (subscribers.length > 0) {
            let subs = subscribers;
            subs = subs.filter(sub => sub.stream.connection.connectionId !== streamManager.stream.connection.connectionId);
            setSubscribers(subs);
        }
    }

    function joinSession(mute, show) {
        // --- 1) Get an OpenVidu object ---
        OV = new OpenVidu();

        // --- 2) Init a session ---

        let mySession = OV.initSession();
        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            let subscriber = mySession.subscribe(event.stream, undefined);
            let subs = subscribers;
            subs.push(subscriber);
            setSubscribers(subs);
            console.log(subscribers);
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        getToken().then((token) => {
            // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
            // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
            mySession.connect(token, { clientData: myUserName })
                .then(async () => {

                    // --- 5) Get your own camera stream ---

                    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                    // element: we will manage it on our own) and with the desired properties
                    let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: mute, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: show, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: false, // Whether to mirror your local video or not
                    });

                    // --- 6) Publish your stream ---

                    mySession.publish(publisher);

                    // Obtain the current video device in use
                    let devices = await OV.getDevices();
                    let videoDevices = devices.filter(device => device.kind === 'videoinput');
                    let currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                    let currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                    // Set the main video in the page to display our webcam and store our Publisher
                    //currentVideoDevice: currentVideoDevice,
                    setPublisher(publisher);
                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error.code, error.message);
                });
        });

        setSession(mySession);
    }

    function leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        OV = null;
        setSession();
        setSubscribers([]);
        setMySessionId();
        setPublisher();
    }


    async function switchCamera() {
        try {
            const devices = await OV.getDevices()
            let videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                let newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    let newPublisher = OV.initPublisher(undefined, {
                        publishAudio: mute,
                        publishVideo: show,
                        mirror: true
                    });

                    await session.publish(newPublisher)
                    //currentVideoDevice: newVideoDevice[0],
                    setPublisher(newPublisher);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function getToken() {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    }

    async function createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { "customSessionId": sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    async function createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }

    const handleExit = () => {
        leaveSession();
        //navigate(-1);
        navigate(`${process.env.PUBLIC_URL}/mystudy`);
    }

    const handleMute = async () => {
        leaveSession();
        joinSession(!mute, show);
        setMute((cur) => !cur);
    }

    const handleShow = async () => {
        leaveSession();
        joinSession(mute, !show);
        setShow((cur) => !cur);
    }

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
                {publisher && (
                    <UserVideoComponent
                        streamManager={publisher} />
                )}
                {subscribers.filter(subscriber => subscriber.stream.connection.disposed !== true).map((sub, i) => (
                    <UserVideoComponent 
                        key={sub.stream.streamId}
                        streamManager={sub} />
                ))}
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

class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <div className={styles.item_camera_wrapper}>
                <video
                    className={styles.item_camera}
                    autoPlay={true} ref={this.videoRef} />
            </div>
        );
    }

}

class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default RealtimeFacecamPage;
