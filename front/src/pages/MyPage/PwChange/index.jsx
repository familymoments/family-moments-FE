import axios from "axios";
import Button from "../../../components/Button";
import classes from "./PwChange.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { header } from "../../../atom";

const authToken = localStorage.getItem("token");

const headers = {
    "X-AUTH-TOKEN": authToken,
};

const PwChange = () => {
    // 응답코드 바뀐거 확인되면 맞춰서 오류 메세지 띄우기
    const [code, setCode] = useState(200);
    const [message, setMessage] = useState("");
    const [data, setData] = useState({
        password: "",
        newPassword: "",
        newPassword_first: "",
    });

    const SERVER = process.env.REACT_APP_SERVER_URL;
    const [headers, setHeaders] = useRecoilState(header);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const { password, newPassword, newPassword_first } = data;

    const patchPwdReq = {password, newPassword_first, newPassword}

    const sendPW = async () => {
        const response = await axios.patch(`${SERVER}/users/modify-pwd`, patchPwdReq, {
            headers,
        });
        console.log(response.data);
        setCode(response.data.code)
        setMessage(response.data.message)
        // console.log(code,message)
        // return response.data;
    };

    // const testF = () => {
    //     console.log('helle')
    // }

    return (
        <div className={classes.wrapper}>
            <div className={classes.pWrapper}>
                <p className={classes.p}>
                    계정을 보호하기 위해 이 세션을 제외한 모든
                    <br />
                    세션에서 로그아웃됩니다.
                </p>
                <p className={classes.p}>
                    비밀번호는 8글자 이상 12글자 이하여야
                    <br />
                    하고 숫자와 영문의 조합을 포함해야 합니다.
                </p>
            </div>

            <input
                className={classes.input}
                placeholder="현재 비밀번호"
                name="password"
                value={data.password}
                onChange={handleInputChange}
            ></input>
            <input
                className={classes.input}
                placeholder="새 비밀번호"
                name="newPassword_first"
                value={data.newPassword_first}
                onChange={handleInputChange}
            ></input>
            <input
                className={classes.input}
                placeholder="새 비밀번호 확인"
                name="newPassword"
                value={data.newPassword}
                onChange={handleInputChange}
            ></input>
            <Button
                title="비밀번호 변경"
                btn={classes.btn}
                onClick={sendPW}
            ></Button>
        </div>
    );
};

export default PwChange;
