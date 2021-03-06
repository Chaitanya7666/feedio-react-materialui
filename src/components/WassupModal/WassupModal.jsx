import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Wassup from '../Wassup/Wassup';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    // width: "60%",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingLeft : "auto",
    paddingRight : "auto",
    // boxShadow : "-2px -2px 10px 2px rgb(107,187,117)",
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",

  },
  closeButton:{
    color : "white",
    backgroundColor : "rgba(255,0,0,0.6)",
    "&:hover": {
      backgroundColor: "rgba(255,0,0)"
    }

  }
 
}));

export default function SimpleModal({wassupOpen,handleWassupOpen, handleWassupClose }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
 

  const body = (
    <Paper style={modalStyle} className={classes.paper} elevation={5}>
     <Wassup handleWassupClose={handleWassupClose}/>
     <Button variant="contained"  className={classes.closeButton} onClick={handleWassupClose}>Close</Button>
    </Paper>
  );

  return (
    <div>
      
      <Modal
        open={wassupOpen}
        onClose={handleWassupClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
