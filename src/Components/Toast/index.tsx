import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProps } from "react-toastify/dist/types";
import {
  getErrorSelector,
  getMessageSelector,
} from "../../store/report/selectors";

const Index = () => {
  const error = useSelector(getErrorSelector);
  const message = useSelector(getMessageSelector);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return <ToastContainer />;
};

export default Index;
