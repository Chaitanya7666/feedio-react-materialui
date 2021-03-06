import React,{useContext} from 'react'
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import NoPostsCard from '../NoPostsCard/NoPostsCard';
import Post2 from "../Post2/Post2"

const MyPosts2 = ({profileBelongsTo}) => {
    const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);
    let myPosts = profileBelongsTo?.posts?.sort((a,b) => {
        let c,d;
        if(a.date.getMonth){
            c = a.date
        }
        if(b.date.getMonth){
            d = b.date
        }
        if(!a.date.getMonth){
            c=a.date.toDate();
        }
        if(!b.date.getMonth){
            d=b.date.toDate()
        }
        
        return d - c;
      })
    return (
        <div>
                  {(myPosts?.length === 0) && <NoPostsCard text="There are no posts to show!" /> }

            {myPosts?.length !==0 && myPosts?.map(post => 
               <Post2 post={post}/> 
                )}
        </div>
    )
}

export default MyPosts2
