import { Typography } from '@mui/material';
import React from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import warningToast from "../../assets/warningToast.svg";
import successToast from "../../assets/successToast.svg";


function useToast() {
  const Container = (props) => <div>{props.children}</div>;

  const toastfy = ({ type, message }) => {
    {
      type === "error" ? (
        toast.error(
          <Container>
            <Typography variant="body8">{message}</Typography>
          </Container>,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={warningToast} alt="error" />,
            style: {
              background: "#F2D6D0",
              color: "#AE1100",
            }
          }
        )
      )
        :
        (
          toast.success(
            <Container>
              <Typography variant="body8">{message}</Typography>
            </Container>
            , {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={successToast} alt="error" />,
              style: {
                background: "#C3D4FE",
                color: "#243F80",
              }
            }
          )
        )
    }
  }

  return { toastfy }
}

export default useToast;
