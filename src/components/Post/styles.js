import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainBackground : {
        // backgroundColor : "rgba(0,0,0,0.8)",
        backgroundColor : "white",
        height : "100vh",
        width : "99vw",
       
    },
    typography : {
        color : "black",
        fontWeight : "700",
    },
    box : {
        display : "flex",
        justifyContent : "center",
        alignItem : "center",
    },
    logo : {
        height : "10vh", 
        width : "auto",
        margin : "0.5rem 0"
    },
    divider : {
        height : "0.1rem", 
        width : "90vw"
    },
    textField : {
       border : "1px solid lawngreen",
       borderRadius : theme.shape.broderRadius,

    },
    input : {
        border : "0.1rem solid lawngreen",
        borderRadius : 5,
        padding : "0.2rem 0.5rem"
    },
    box1 : {
        display : "flex",
        justifyContent : "center",
        alignItem : "center",
        marginTop : "1.5rem"
    },
    button : {
        background : 'lawngreen',
        color : "white",
        border : "none",
        padding : "0 10vw"
    },
    strong : {
        fontWeight : '700'
    },
    termsBox : {
        display : "flex",
        justifyContent : "center",
        alignItem : "center",
    },
    termsText : {
        fontSize : "0.7rem",
        marginTop: "0.5rem",

    },
    termsTextLink : {
        fontSize : "0.7rem",
        color : "lawngreen",

    },
    dummyBox:{
        display : "flex",
        justifyContent : "center",
        alignItem : "center",
        width : "70vw"

    },
    outerBox : {
        display : 'flex',
        flexDirection : "column",
        maxWidth : "60vw",
        marginLeft : "auto",
        marginRight: "auto", 
        border : "0.2rem solid lawngreen",
        // boxshadow : "1rem 1rem 1rem lawngreen",
        borderRadius : "5px",
        padding : "1rem"
    },
    username : {
        fontWeight : "800"
    },
    iconColor:{
        color : "lawnGreen"
    },
    buttonsCover:{
        display : "flex",
        justifyContent : "space-evenly",
        alignItems : "center",
        marginTop : "1rem"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      wassuptextbox:{
          display: "flex",
          justifyContent : "center",
          alignItems : "center",
          margin : "1rem 0"
      },
      deleteModalButtons:{
          display: "flex",
          justifyContent : "space-evenly",
          marginTop: "1rem"
      },

    
    // buttonBox:{
    //     display : "flex",
    //     justifyContent : "center",
    //     alignItems : "center"
    // }


}));

export default useStyles;