import { SlMenu } from "react-icons/sl";
import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const [user, setUser] = useState("익명");
    const onMobileOpen = () => {
        setMobileOpen(cur => !cur);
    }
    const onAvatarOpen = () => {
        setAvatarOpen(cur => !cur);
    }


    return <div>
        {mobileOpen ? <div className={styles.mobile}>
            <div className={styles.wrapper}>
                <div onClick={onMobileOpen} className={styles.back} />
                <ul className={styles.menubar}>
                    <li><Link to={`${process.env.PUBLIC_URL}/`}>홈</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/mystudy`}>내학습</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/community`}>커뮤니티</Link></li>
                </ul>
            </div>
        </div> : null}
        <div id={styles.web}>
            <div className={styles.wrapper}>
                <span id={styles.icon_logo}><a href="">Logo</a></span>
                <ul className={styles.menubar}>
                    <li><Link to={`${process.env.PUBLIC_URL}/`}>홈</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/mystudy`}>내학습</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/community`}>커뮤니티</Link></li>
                </ul>
            </div>
            <div className={styles.avatarbar}>
                <p className={styles.avatar__name}>{user}님</p>
                <ul>
                    <li className={styles.avatar}>
                        <div className={styles.avatar__icon} onClick={onAvatarOpen}/>
                        {avatarOpen ? <div>                                                 
                            <div className={styles.back} onClick={onAvatarOpen} />
                            <ul className={styles.subbar}>
                                <li><a href="">마이페이지</a></li>
                                <li><a href="">로그아웃</a></li>
                            </ul>
                        </div> : null}
                    </li>
                </ul>
            </div>
        </div>
        <div id={styles.non_web}>
            <span id={styles.icon_menu} onClick={onMobileOpen}>
                <SlMenu />
            </span>
            <span id={styles.icon_logo}><a href="">Logo</a></span>
            <div className={styles.avatarbar}>
                <ul>
                    <li className={styles.avatar}>
                        <div className={styles.avatar__icon} onClick={onAvatarOpen}/>
                        {avatarOpen ? <div>                                                 
                            <div className={styles.back} onClick={onAvatarOpen} />
                            <ul className={styles.subbar}>
                                <li><a href="">마이페이지</a></li>
                                <li><a href="">로그아웃</a></li>
                            </ul>
                        </div> : null}
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Header;
