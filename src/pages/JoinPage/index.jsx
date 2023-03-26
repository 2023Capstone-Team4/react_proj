import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./JoinPage.module.css";

function JoinPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const onValid = (data) => {
        if (data.password !== data.password_check) {
            setError(
                "password_check", //에러 이름. 기존에 있는 것과 겹칠시 그쪽으로 에러 들어감
                { message: "비밀번호가 일치하지 않습니다." }, //errors에 넣을 에러 메시지
                { shouldFocus: true } //에러 발생시 해당 구간에 포커스하게 하는 설정
            );
        }  else {
            console.log(data);
            console.log(errors);

            fetch('http://localhost:8080/members/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id":1,
                    "memberId":"newUser",
                    "password":"a1234",
                    "name":"userkim",
                    "age":20,
                    "sex": 1,
                    "birth":new Date(),
                    "interst": "LIFE",
                    "email":"meo@naver.com",
                }),
            }).then(res => res.json());
        }
    }
    const navigate = useNavigate();
    const onCancel = () => {
        navigate(`${process.env.PUBLIC_URL}/login`);
    }

    return(
        <div className={styles.container}>
        <div className={styles.join__wrapper}>
            <h1 className={styles.join__title}>회원가입</h1>
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
                <label className={styles.input__title}>
                    비밀번호 확인
                </label>
                <input
                    {...register("password_check", { required: "비밀번호 확인 입력은 필수입니다." })}
                    className={styles.input} type="password" />
                <div className={styles.error_message}>
                    {errors?.password_check?.message}
                </div>
                <button className={styles.button__submit} type="submit">
                    <div className={styles.button__back}></div>
                    회원가입
                </button>
                <button className={styles.button__cancel} onClick={onCancel}>
                    <div className={styles.button__back}></div>
                    취소
                </button>
            </form>
        </div>
    </div>
    );
}

export default JoinPage;
