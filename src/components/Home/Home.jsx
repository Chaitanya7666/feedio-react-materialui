import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Wassup from "../Wassup/Wassup";
import NavBar from "../NavBar/NavBar";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Box } from "@material-ui/core";

const Home = ({handleReloadAfterWassupUpload}) => {
  const { currentUser } = useAuth();
  const [currentUserDoc, setcurrentUserDoc] = useState({});

  useEffect(async () => {
    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setcurrentUserDoc(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);
  

  return (
    <div>
      <NavBar currentUsername={currentUserDoc.username} handleReloadAfterWassupUpload={handleReloadAfterWassupUpload}/>
      <Wassup currentUser={currentUser} handleReloadAfterWassupUpload={handleReloadAfterWassupUpload}/>
    </div>
  );
};

export default Home;
