import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { toPng } from 'html-to-image';

import { 
  Accordion, AccordionDetails, AccordionSummary, Avatar, 
  Box, Button, 
  FormControl, FormControlLabel, FormLabel, 
  Radio, RadioGroup, 
  Stack, Switch,
  TextField, Typography 
} from '@mui/material';

import StoryContent from '@/components/storyContent';
import CloseFriend from '@/components/closeFriend';
import Icon from '@mui/material/Icon';
import React, { useCallback, useEffect, useRef } from 'react';

export default function Home() {

  const [username, setUsername] = React.useState("example");
  const [storyImg, setStoryImg] = React.useState("https://images.unsplash.com/photo-1626288215937-747af7be5b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fDklM0ExNnxlbnwwfHwwfHw%3D&w=1000&q=80");
  const [profilePicture, setProfilePicture] = React.useState("public/profilepicture.jpeg");
  const [time, setTime] = React.useState(5);
  const [timestamp, setTimestamp] = React.useState("");
  const [timeUnit, setTimeUnit] = React.useState("h");
  const [isCloseFriend, setIsCloseFriend] = React.useState(false);

  const imgRef = useRef(null)

  const handleDownload = () => {
    const curr = imgRef.current

    if (curr === null) {
      console.log("imgRef null")
      return
    }
    toPng(curr).then(function (dataUrl) {
      download(dataUrl, 'my-node.png');
  })
}
  // const handleDownload = useCallback(() => {
  //   if (imgRef.current === null) {
  //     console.log("imgRef null")
  //     return
  //   }

  //   toPng(imgRef.current, { cacheBust: true, })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       link.download = 'my-image-name.png'
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [imgRef])

  useEffect (() => {
    generateTimestamp();
    console.log("update index")
    console.log("ref", imgRef.current)
  })

  const handleProfilePicture = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      console.log(e.target.result)
      setProfilePicture(e.target.result)
    }
  }

  const handleStoryImage = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      console.log(e.target.result)
      setStoryImg(e.target.result)
    }
  }

  const handleTime = (e) => {
    setTime(e.target.value);
    generateTimestamp();
  }

  const handleTimeUnit = (e) => {
    setTimeUnit(e.target.value);
    generateTimestamp();
  }

  const generateTimestamp = () => {
    const timestamp = time + timeUnit
    setTimestamp(timestamp);
  }

  return (
    <>
      <Head>
        <title>Fake Instagram Screenshot Generator</title>
        <meta name="description" content="Fake Instagram Screenshot Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography gutterBottom variant="h4" component="h1">
          Fake Instagram Screenshot Generator
        </Typography>
        <div className={styles.form}>
          <TextField 
            required 
            label="Username" 
            size="large" 
            variant="outlined"
            onMouseOut={e => setUsername(e.target.value)}
          />
          <Stack spacing={0.5}>
            <Typography color="rgba(0, 0, 0, 0.6)" variant="body1">
              Story Image *
            </Typography>
            <Box
              border={1}
              borderColor={"silver"}
              borderRadius={2}
              padding={1}
            >
              <input required accept="image/*" type="file" onChange={handleStoryImage}/>
            </Box>
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="rgba(0, 0, 0, 0.6)" variant="body1">
              Profile Picture *
            </Typography>
            <Box
              border={1}
              borderColor={"silver"}
              borderRadius={2}
              padding={1}
            >
              <input required accept="image/*" type="file" onChange={handleProfilePicture} />
            </Box>
          </Stack>
          <Accordion>
            <AccordionSummary
              expandIcon={<Icon>expand_more_icon</Icon>}
              id="additional-config"
            >
              <Typography variant='h5' component='h2'>Additional Config</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="rgba(0, 0, 0, 0.6)" variant="body1">
                Timestamp
              </Typography>
              <Stack 
                alignItems="center"
                direction="row" 
                spacing={2}
              >            
              <TextField 
                  required
                  defaultValue={time} 
                  label="Number" 
                  type="number" 
                  variant="outlined" 
                  onMouseOut={handleTime}
                />
                <FormControl required>
                  <FormLabel id="time-unit">Time Unit</FormLabel>
                  <RadioGroup
                    row
                    defaultValue={timeUnit}
                    name="time-unit"
                    onClick={handleTimeUnit}
                  >
                    <FormControlLabel value="h" control={<Radio />} label="Hour (h)" />
                    <FormControlLabel value="s" control={<Radio />} label="Seconds (s)" />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <FormControl required>
                <FormLabel id="story-type">Story Type</FormLabel>
                <FormControlLabel control={<Switch onClick={e => setIsCloseFriend(!isCloseFriend)}/>} label="Close Friend" />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Button size="large" variant="contained" onClick={handleDownload}>Generate</Button>
        </div>
        <div>
        <Typography gutterBottom variant="h4" component="h1">
          Result
        </Typography>
        <div id={styles.screenshotResult} ref={imgRef}>
          <div id={styles.statusBar}>
            Ini status bar
          </div>
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
                <Icon fontSize='small'>more_horiz</Icon>
                <Icon fontSize='large'>close</Icon>
              </div>
            </div>
          </div>  

          {/* <StoryContent
            isCloseFriend={isCloseFriend}
            storyImg={storyImg}
            username="username"
            timestamp={timestamp}
            profilePicture={profilePicture}
          /> */}
          <div id={styles.footer}>
            <div id={styles.chatbox}>
              <Typography color="white">Send Message</Typography>
            </div>
            <Icon id={styles.likeButton} sx={{ color: 'white', fontSize: 40 }}>favorite_border</Icon>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>
      // <Head>
      //   <title>Create Next App</title>
      //   <meta name="description" content="Generated by create next app" />
      //   <meta name="viewport" content="width=device-width, initial-scale=1" />
      //   <link rel="icon" href="/favicon.ico" />
      // </Head>
      // <main className={styles.main}>
//         <div className={styles.description}>
//           <p>
//             Get started by editing&nbsp;
//             <code className={styles.code}>pages/index.js</code>
//           </p>
//           <div>
//             <a
//               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               By{' '}
//               <Image
//                 src="/vercel.svg"
//                 alt="Vercel Logo"
//                 className={styles.vercelLogo}
//                 width={100}
//                 height={24}
//                 priority
//               />
//             </a>
//           </div>
//         </div>

//         <div className={styles.center}>
//           <Image
//             className={styles.logo}
//             src="/next.svg"
//             alt="Next.js Logo"
//             width={180}
//             height={37}
//             priority
//           />
//           <div className={styles.thirteen}>
//             <Image
//               src="/thirteen.svg"
//               alt="13"
//               width={40}
//               height={31}
//               priority
//             />
//           </div>
//         </div>

//         <div className={styles.grid}>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Docs <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Find in-depth information about Next.js features and&nbsp;API.
//             </p>
//           </a>

//           <a
//             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Learn <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Learn about Next.js in an interactive course with&nbsp;quizzes!
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Templates <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Discover and deploy boilerplate example Next.js&nbsp;projects.
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Deploy <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Instantly deploy your Next.js site to a shareable URL
//               with&nbsp;Vercel.
//             </p>
//           </a>
//         </div>
//       </main>
//     </>
//   )
// }
