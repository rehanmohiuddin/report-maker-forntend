import React, { useEffect, useState } from "react";
import "./index.css";
import HomeContainer from "../Components/HomeContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogedInSelector,
  getPendingSelector,
} from "../store/report/selectors";
import { loginRequest } from "../store/report/actions";
import Loader from "../Loader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(getLogedInSelector);
  const [password, setPassword] = useState<string>("");
  const pending = useSelector(getPendingSelector);

  const handleSubmit = () => dispatch(loginRequest({ password: password }));

  useEffect(() => {
    const { state }: any = location;
    const fromRoute = state?.from.pathname || "/";
    isLoggedIn && navigate(fromRoute, { replace: true });
  }, [isLoggedIn]);

  return (
    <HomeContainer>
      {pending && <Loader message="Loggin In Please Wait..." />}
      <div className="auth-container">
        <div className="auth">
          <h3>Login</h3>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="passcode"
            type={"password"}
            placeholder="Enter Password"
          />
          <button onClick={handleSubmit} className="auth-submit">
            Submit
          </button>
        </div>
      </div>
    </HomeContainer>
  );
}

export default Index;
