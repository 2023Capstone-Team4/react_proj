import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./JoinPage.module.css";

function JoinPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            year: 1974,
            month: 1,
            date: 1,
            sex: "남성",
            category: "개발/프로그래밍"
        }   
    });
    const onValid = (data) => {
        if (data.password !== data.password_check) {
            setError(
                "password_check", //에러 이름. 기존에 있는 것과 겹칠시 그쪽으로 에러 들어감
                { message: "비밀번호가 일치하지 않습니다." }, //errors에 넣을 에러 메시지
                { shouldFocus: true } //에러 발생시 해당 구간에 포커스하게 하는 설정
            );
        } else {
            console.log(data);
            console.log(errors);

            fetch('http://localhost:8080/members/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "memberId": data.memberId,
                    "password": data.password,
                    "name": data.name,
                    "age": data.age,
                    "sex": data.sex === "남성" ? 0 : 1,
                    "birth": new Date(data.year,data.month,data.date),
                    "interst": data.category === "개발/프로그래밍" ? "IT_PROGRAMMING" : 
                    data.category === "IT" ? "IT" :
                    data.category === "게임 개발" ? "GAME_DEV" : 
                    data.category === "크리에이티브" ? "CREATIVE" :
                    data.category === "학문/외국어" ? "ACADEMICS" :
                    data.category === "커리어" ? "CAREER" :
                    "LIFE",
                    "email": data.email,
                }),
            }).then(res => {
                console.log(res);
                if(res.ok){
                    alert("회원가입이 완료되었습니다.");
                    navigate(`${process.env.PUBLIC_URL}/login`);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    const onCancel = () => {
        navigate(`${process.env.PUBLIC_URL}/login`);
    }

    return (
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
                    {/* 추가 - 2023.03.26 백엔드 회의 내역 반영*/}
                    <label className={styles.input__title}>
                        이름
                    </label>
                    <input
                        {...register("name", { required: "이름 입력은 필수입니다." })}
                        className={styles.input} type="text" />
                    <div className={styles.error_message}>
                        {errors?.name?.message}
                    </div>
                    <label className={styles.input__title}>
                        나이
                    </label>
                    <input
                        {...register("age", { required: "나이 입력은 필수입니다." })}
                        className={styles.input} type="number" />
                    <div className={styles.error_message}>
                        {errors?.age?.message}
                    </div>
                    <label className={styles.input__title}>
                        성별
                    </label>
                    <select
                        {...register("sex", { required: "성별 입력은 필수입니다." })}
                        className={styles.input__select}>
                        <option>남성</option>
                        <option>여성</option>
                    </select>
                    <div className={styles.error_message}>
                        {errors?.sex?.message}
                    </div>
                    <label className={styles.input__title}>
                        생년월일
                    </label>
                    <div className="input__birth__wrapper">
                        <select
                            {...register("year", { required: true })}
                            className={styles.input__birth}>
                            {[...Array(50).keys()].map((index)=>
                                <option key={index}>{index+1974}</option>
                            )}
                        </select>
                        <span className={styles.input__birth__text}>년</span>
                        <select
                            {...register("month", { required: true })}
                            className={styles.input__birth}>
                            {[...Array(12).keys()].map((index)=>
                                <option key={index}>{index+1}</option>
                            )}
                        </select>
                        <span className={styles.input__birth__text}>월</span>
                        <select
                            {...register("date", { required: true })}
                            className={styles.input__birth}>
                            {[...Array(31).keys()].map((index)=>
                                <option key={index}>{index+1}</option>
                            )}
                        </select>
                        <span className={styles.input__birth__text}>일</span>
                    </div>
                    <div className={styles.error_message}>
                        {errors?.year || errors?.month || errors?.date && "생년월일 입력은 필수입니다."}
                    </div>
                    <label className={styles.input__title}>
                        관심 카테고리
                    </label>
                    <select
                        {...register("category", { required: "카테고리 입력은 필수입니다." })}
                        className={styles.input__select}>
                        <option>개발/프로그래밍</option>
                        <option>IT</option>
                        <option>게임 개발</option>
                        <option>크리에이티브</option>
                        <option>학문/외국어</option>
                        <option>커리어</option>
                        <option>자기계발</option>
                    </select>
                    <div className={styles.error_message}>
                        {errors?.category?.message}
                    </div>
                    <label className={styles.input__title}>
                        이메일
                    </label>
                    <input
                        {...register("email", { required: "이메일 입력은 필수입니다." })}
                        className={styles.input} type="email" />
                    <div className={styles.error_message}>
                        {errors?.email?.message}
                    </div>
                    {/* 추가 종료*/}
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
