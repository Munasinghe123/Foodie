import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../store/userSlice";

export default function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/me", { withCredentials: true })
      .then((res) => {
        dispatch(loginSuccess({ user: res.data.user }));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, []);

  return null; 
}
