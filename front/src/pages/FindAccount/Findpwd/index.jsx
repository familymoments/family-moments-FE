import Styles from "./Findpwd.module.css";
import Loginbutton from "../../../components/Loginbutton";
import { useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { ID } from "../../../atom";
function Findpwd(props){
    useEffect(()=>{
        props.changeTitle("비밀번호 찾기");
    })
    const SERVER = process.env.REACT_APP_SERVER_URL;
     //상태관리
    const [id,setId] = useRecoilState(ID);
    //navigate
    const navigate = useNavigate();
    //react-hook-form 선언
    const {
        register,
        handleSubmit,
        watch,
      } = useForm();
      
    
    const getAuth = (e) => {
        axios
        .post(`${SERVER}/users/auth/check-id`, e)   
        .then( (res)=> {
            if (res.data.code === 200) {
                const userID = watch("userId");
                setId(userID);
                console.log(id);
                navigate("/landing/findpwd2");
            }
            if (res.data.code === 404) {
                Swal.fire("입력하신 아이디와 일치하는 회원 정보가 없습니다.");
            } 
        })
            .catch( (err)=> {
                if (err.data.code === 404) {
                    Swal.fire("입력하신 아이디와 일치하는 회원 정보가 없습니다.");
                } 
            });
              
    }
    return(
        <form onSubmit={handleSubmit(getAuth)}>
                <h1 className={Styles.title}>비밀번호 찾기</h1>
             <div className={Styles.txtlocation}>
                <p className={Styles.texts}>비밀번호를 찾고자하는 아이디를 입력해주세요</p>
            </div>
            <div className={Styles.inputlocation}>
                <input className={Styles.idinput} placeholder = "ID" type="text"
             required {...register("userId")}/>
            </div>
            <div className={Styles.button}>
               <button type = "submit" className={Styles.hiddenbtn}> <Loginbutton texts =" 순간을 가족에게 공유하기"/></button>
            </div>
        </form>
    );
}

export default Findpwd;