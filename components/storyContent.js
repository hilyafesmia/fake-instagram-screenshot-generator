import { Avatar, Icon, Typography } from "@mui/material";
import styles from '@/styles/Home.module.css'
import CloseFriend from "./closeFriend";

export default function StoryContent(isCloseFriend, storyImg, username, timestamp, profilePicture) {
    console.log("rendering!!!")
    console.log(username)
    return (
        <div id={styles.storyContent}>
            <img id={styles.storyImg} src={storyImg} width={450} height={800}/>
            <div id={styles.storyHeader}>
              <div className={styles.profileInfo}>  
                <Avatar src={profilePicture} />
                <Typography>{username}</Typography>
                <Typography>{timestamp}</Typography>
              </div>
              <div className={styles.profileInfo}>  
                { isCloseFriend && <CloseFriend/>}
                <Icon>more_horiz</Icon>
                <Icon>close</Icon>
              </div>
            </div>
          </div>  
    )
}