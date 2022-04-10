import React, {
  ReactChildren,
  ReactChild,
  ReactElement,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import { checkRequest } from "./store/report/actions";
import { getLogedInSelector } from "./store/report/selectors";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: React.FC<PropType> = ({ component: Component }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [user] = useLocalStorage();
  const isLoggedIn = useSelector(getLogedInSelector);

  useEffect(() => {
    const token = user.token;
    dispatch(checkRequest({ token: token }));
  }, []);

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
