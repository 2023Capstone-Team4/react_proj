import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onValid = (data) => {
        // console.log(data);
        // console.log(errors);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "loginId": data.memberId,
                "password":data.password,
            }),
        }).then(res => {
            if(res.ok){
                alert("로그인이 완료되었습니다.");
                navigate(`${process.env.PUBLIC_URL}/`);
            }else{
                alert("아이디, 비밀번호가 일치하지 않습니다.");
            }
        })
        .catch(error=>console.log(error));
    }
    return <div className={styles.container}>
        <div className={styles.login__wrapper}>
            <h1 className={styles.login__title}>로그인</h1>
            <form onSubmit={handleSubmit(onValid)}>
                <label className={styles.input__title}>
                아이디
                </label>
                <input
                    {...register("memberId", { required: "아이디 입력은 필수입니다." })}
                    className={styles.input} type="text" />
                <div className={styles.error_message}>
                    {errors?.memberId?.message}
                </div>
                <label className={styles.input__title}>
                    비밀번호
                </label>
                <input
                    {...register("password", { required: "비밀번호 입력은 필수입니다." })}
                    className={styles.input} type="password" />
                <div className={styles.error_message}>
                    {errors?.password?.message}
                </div>
                <button className={styles.button__submit} type="submit">
                    <div className={styles.button__back}></div>
                    로그인
                </button>
                <hr />
                <div className={styles.join__message}>
                    <Link to={`${process.env.PUBLIC_URL}/join`}>
                    아직 가입하지 않으셨나요? 회원가입</Link>
                </div>
            </form>
        </div>
    </div>
}

export default LoginPage;
