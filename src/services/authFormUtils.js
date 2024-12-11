import axios from 'axios';


// 이메일 유효성 검사
export const isEmailValid = value => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
}

// 비밀번호 유효성 검사
export const isPasswordValid = value => {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
    return regex.test(value);
}

// 이메일 중복 체크
export const isEmailDuplicate = async value => {
    let errorMessage;

    await axios.get("/api/auth/email/duplicate", {
        params: { email: value }
    }).catch(error => 
        errorMessage = error.response.data
    );

    console.log(errorMessage)

    return errorMessage;
}