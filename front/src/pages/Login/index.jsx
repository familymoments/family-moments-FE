import Styles from './Login.module.css';
import Loginbutton from '../../components/Loginbutton';
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import {SiNaver} from 'react-icons/si';
import {RiKakaoTalkFill} from 'react-icons/ri';
import axios from 'axios';
import Swal from "sweetalert2";
import { setCookie,  getCookie, decodeCookie, removeCookie } from "./Cookie";
import {header} from "../../atom";
import { useRecoilState } from 'recoil';
function Login(props,{
    onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(data));
    },
}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm();
    
    useEffect(()=>{
        props.changeTitle("Family Moments");
    })
    
    const [headers, setHeaders] = useRecoilState(header);
    const navigate = useNavigate();
    
    const getAuth = (data) => {
        axios
            .post("/users/log-in",data)
            .then(function (response) {
                console.log(response);
                const token = response.data.token;
                //const accessToken = response.headers['authorization'];
                const refreshToken = response.headers['refresh'];
                const { accessToken } = response.data;
               
                // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                
                setCookie("token", response.headers.get("x-auth-token"), {
                    path: "/",
                    sameSite: "strict",
                });
                
                console.log(response.headers.get("x-auth-token"));
                setHeaders(response.headers.get("x-auth-token"));
                localStorage.setItem('token', response.headers.get("x-auth-token"));
                navigate("/landing/newfamily");
                
            })
            .catch(function (error) {
                console.log(error.response.data);
                Swal.fire({
            icon: "error",
            title: "아이디 또는 비밀번호가 틀렸습니다."
           
          });
            });
                console.log(watch("id"));
                console.log(watch("password"));
                
                console.log(headers);
        
    };
    
    return(
    <div>
        <div className={Styles.top}>
            <div className= {Styles.toplogo}>
                <img src={process.env.PUBLIC_URL + '/mainLogo.png'} /> 
            </div>
            <div>
            <h2 className = {Styles.font}>안녕하세요 :-) <p>패밀리 모먼트입니다.</p>
            <p className = {Styles.font2}>가족들과 소중한 순간을 공유해 보세요.</p></h2>
            </div>
        </div>
   
    <form className = {Styles.input} onSubmit={handleSubmit(getAuth)}>
            <div>
              
            
                  
                
                <input id = "id" className={Styles.id} type= "text"  placeholder="ID"   
                aria-invalid={isSubmitted ? (errors.id ? "true" : "false") : undefined} 
                {...register("id", {required: "아이디는 필수 입력입니다.",
                minLength: {
                    value: 6,
                    message: "영문과 숫자만 사용하여, 6~12글자의 아이디를 입력해주세요",
                    },
                maxLength: {
                    value: 12,
                    message: "영문과 숫자만 사용하여, 6~12글자의 아이디를 입력해주세요",
                    },})}/>     
            </div>
            {errors.id && <small className = {Styles.alert} role="alert">{errors.id.message}</small>}
            <div>
                
                <input id ="password" className = {Styles.password}  type='password'  placeholder='Password' 
                        aria-invalid={
                            isSubmitted
                                ? errors.password
                                    ? "true"
                                    : "false"
                                : undefined
                        }
                {...register("password", {
                    required: 
                    "비밀번호는 필수 입력입니다.",
                    minLength: {
                        value: 8,
                        message: "영문과 숫자를 사용하여, 8~12글자의 비밀번호를 입력해주세요.  ",
                },
                maxLength: {
                    value: 12,
                    message: "영문과 숫자를 사용하여, 8~12글자의 비밀번호를 입력해주세요.  ",
                },
                
             })}
                />
                
            </div>
            {errors.password && <small className = {Styles.alert}role="alert">{errors.password.message}</small>}
                <button className={Styles.loginbtn} type = "submit"><Loginbutton  texts ="로그인"></Loginbutton></button>
                
        </form>

        <div className={Styles.accountbutton}>
            <button onClick={()=>{navigate("/landing/findid")}} className={Styles.accountbutton}>아이디 찾기</button>
            <p className={Styles.accountbutton}>|</p>
            <button  onClick={()=>{navigate("/landing/findpwd")}}className={Styles.accountbutton}>비밀번호 찾기</button>
            <p className={Styles.accountbutton}>|</p>
            <button onClick={()=>{navigate("/landing/signup")}} className={Styles.accountbutton}>회원가입</button>
        </div>
            {/* 소셜 로그인 */}
            {/* <div id={Styles.hrsect}>SNS 계정으로 로그인</div>
            
           
            <div className = {Styles.socialloginbox}>
            <button onClick={''} className={Styles.kakao}><RiKakaoTalkFill className={Styles.kakaodetail}/></button>
            <button onClick={''} className={Styles.naver}><SiNaver/></button>
            <button onClick={''} className = {Styles.google}><FcGoogle className={Styles.googledetail}/></button>
            </div>  */}
    </div>
    );
}

export default Login;


 
