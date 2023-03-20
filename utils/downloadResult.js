import { toPng } from 'html-to-image';


export default function DownloadResult(imgRef) {
    
    imgRef.current = target;

    if (target === null) {
        console.log("ref null")
        return
      }
      
      console.log("ref: ", target)
      toPng(target, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
}