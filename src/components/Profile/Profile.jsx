import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import useStyles from "./styles.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavBar2 from "../NavBar2/NavBar2";
import MyPosts2 from "../MyPosts2/MyPosts2";
import LikedPosts from "../LikedPosts/LikedPosts";
import SavedPosts from "../SavedPosts/SavedPosts";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";

const Profile = ({ match }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState("posts");
  console.log("Profile comp =>", currentUserDoc);
  console.log(match.params.username);
  let profileBelongsTo = allUserDocs.find(
    (doc) => doc.username === match.params.username
  );
  console.log("profileBelongsTo =>", profileBelongsTo);
  console.log(currentUserDoc);

  const handleCurrentTabChange = (value) => {
    setCurrentTab(value);
  };

  const addToFollowingArrayInFireStore = async () => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      following: arrayUnion(profileBelongsTo.email),
    });
  };

  const AddToFollowingArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      if (currentUserDocCopy.following.indexOf(profileBelongsTo.email) === -1) {
        addToFollowingArrayInFireStore();
        currentUserDocCopy.following.push(profileBelongsTo.email);
      }
      return { ...currentUserDocCopy };
    });
  };

  const addToFollowersArrayInFireStore = async () => {
    const profileBelongsToDocRef = doc(db, "users", profileBelongsTo.email);

    await updateDoc(profileBelongsToDocRef, {
      followers: arrayUnion(currentUserDoc.email),
    });
  };

  const AddToFollowersArrayInProfileBelongsTo = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const profileOwnerReference = allUserDocsCopy?.find(
        (doc) => doc?.email === profileBelongsTo?.email
      );
      // console.log("profileOwnerReference =>", profileOwnerReference);
      if (
        profileOwnerReference?.followers?.indexOf(currentUserDoc.email) === -1
      ) {
        addToFollowersArrayInFireStore();
        profileOwnerReference?.followers?.push(currentUserDoc.email);
      }
      return [...allUserDocsCopy];
    });
  };

  const handleFollow = () => {
    AddToFollowingArrayInCurrentUserDoc();
    AddToFollowersArrayInProfileBelongsTo();
  };

  const removeFromFollowingArrayInFirestore = async () =>{
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      following: arrayRemove(profileBelongsTo.email),
    });
  }

  const removeFromFollowersArrayInFirestore = async () =>{
    const profileBelongsToDocRef = doc(db, "users", profileBelongsTo.email);

    await updateDoc(profileBelongsToDocRef, {
      followers: arrayRemove(currentUserDoc.email),
    });
  }



  const RemoveFromFollowingArrayInCurrentUserDoc = () => {
      

      setCurrentUserDoc(prevState => {
        const currentUserDocCopy = {...prevState};
        let index = currentUserDocCopy.following.indexOf(profileBelongsTo.email);
        if (index > -1) {
          currentUserDocCopy?.following?.splice(index, 1);
        }
        removeFromFollowingArrayInFirestore();
        return {...currentUserDocCopy}
      })
  };
  const RemoveFromFollowersArrayInProfileBelongsTo = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const profileOwnerReference = allUserDocsCopy?.find(
        (doc) => doc?.email === profileBelongsTo?.email
      );
      let index = profileOwnerReference?.followers?.indexOf(currentUserDoc.email);
        if (index > -1) {
          profileOwnerReference?.followers?.splice(index, 1);
        }
        removeFromFollowersArrayInFirestore();
      return [...allUserDocsCopy];
    });
  };

  const handleUnfollow = () => {
    RemoveFromFollowingArrayInCurrentUserDoc();
    RemoveFromFollowersArrayInProfileBelongsTo();
  };

  const checkIfUserIsFollowed = () => {
    if (currentUserDoc?.following?.includes(profileBelongsTo?.email)) {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.editProfileButton}
          onClick={handleUnfollow}
        >
          Following
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.editProfileButton}
          onClick={handleFollow}
        >
          Follow
        </Button>
      );
    }
  };

  return (
    <>
      <h3>curretnUserdocFollowing</h3>
      {currentUserDoc?.following?.map((item) => (
        <h6>{item}</h6>
      ))}
      <h3>profile belogns to followres</h3>
      {currentUserDoc?.followers?.map((item) => (
        <h6>{item}</h6>
      ))}

      <NavBar2 />
      <Box className={classes.veryOuterBox}>
        <Box className={classes.profileHeaderContainer}>
          <Box className={classes.avatar}>
            {profileBelongsTo?.avatarUrl ? (
              <Avatar
                alt={profileBelongsTo?.username}
                src={profileBelongsTo?.avatarUrl}
                className={classes.avatarSize}
              />
            ) : (
              <AccountCircle className={classes?.avatarSize} />
            )}
          </Box>
          <Box className={classes.profileDetails}>
            <Box className={classes.usernameAndEditProfileButtonContainer}>
              <Typography variant="h4" className={classes.username}>
                {profileBelongsTo?.username}
              </Typography>
              {profileBelongsTo?.username === currentUserDoc.username ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.editProfileButton}
                >
                  Edit Profile
                </Button>
              ) : (
                // <Button
                //   variant="contained"
                //   color="primary"
                //   size="small"
                //   className={classes.editProfileButton}
                // >
                //   Follow
                // </Button>
                checkIfUserIsFollowed()
              )}
            </Box>
            <Box className={classes.followerCountBox}>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>
                  {profileBelongsTo?.posts?.length}
                </span>{" "}
                posts
              </Typography>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>704</span>{" "}
                followers
              </Typography>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>678</span>{" "}
                following
              </Typography>
            </Box>
            <Typography variant="body1" className={classes.bio}>
              {profileBelongsTo?.bio}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.followerCountBoxForSmallDevices}>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              {profileBelongsTo?.posts?.length}
            </Typography>
            <Typography variant="body2">posts</Typography>
          </Box>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              704
            </Typography>
            <Typography variant="body2">followers</Typography>
          </Box>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              678
            </Typography>
            <Typography variant="body2">following</Typography>
          </Box>
        </Box>

        <Box className={classes.buttonGroup}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="contained primary button group"
            fullWidth={true}
          >
            <Button
              className={classes.eachButtonInButtonGroup}
              onClick={() => handleCurrentTabChange("posts")}
            >
              posts
            </Button>
            <Button
              className={classes.eachButtonInButtonGroup}
              onClick={() => handleCurrentTabChange("saved")}
            >
              saved
            </Button>
            <Button
              className={classes.eachButtonInButtonGroup}
              onClick={() => handleCurrentTabChange("liked")}
            >
              liked
            </Button>
          </ButtonGroup>
        </Box>

        <Box>
          {currentTab === "posts" && (
            <MyPosts2 profileBelongsTo={profileBelongsTo} />
          )}
          {currentTab === "liked" && (
            <LikedPosts profileBelongsTo={profileBelongsTo} />
          )}
          {currentTab === "saved" && (
            <SavedPosts profileBelongsTo={profileBelongsTo} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
