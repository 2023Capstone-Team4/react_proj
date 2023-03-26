import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onValid = (data) => {
        console.log(data);
        console.log(errors);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "loginId":data.email,
                "password":data.password
            }),
        }).then(res => res.json());
    }
    return <div className={styles.container}>
        <div className={styles.login__wrapper}>
            <h1 className={styles.login__title}>로그인</h1>
            <form onSubmit={handleSubmit(onValid)}>
                <label className={styles.input__title}>
                    이메일
                </label>
                <input
                    {...register("email", { required: "이메일 입력은 필수입니다." })}
                    className={styles.input} type="email" />
                <div className={styles.error_message}>
                    {errors?.email?.message}
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
