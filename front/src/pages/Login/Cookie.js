import { Cookies } from "react-cookie";
import axios from 'axios'; 
import { decodeToken } from "react-jwt";

const cookies = new Cookies();

// content-type : application/json
// {
//   “id” : “yung00”,
//   “password” : “1234”
// } 

// 로그인 시 사용자 정보를 담은 쿠키를 생성한다
export const setCookie = (id, password) => {
  return cookies.set(id, password);
};

// 사용자 인증이 필요한 데이터를 요청할 때 쿠키를 가져온다
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키를 지운다
export const removeCookie = (name) => {
  return cookies.remove(name);
};

export const decodeCookie = (name) => {
  return decodeToken(getCookie(name));
};