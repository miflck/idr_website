import styles from './list.module.scss'
// import Link from 'next/link'
import { StructuredText } from "react-datocms";



const ListItem =({
    titel,
    forschungsfeld,
    zeitraum
  })=>{
      if(language ==null){
          language="en"
        }
    



let teaserImageElement;
if(teaserImage !=null && teaserImage.url != null){
    teaserImageElement= <img className={styles.teaserImage} src={teaserImage.url} alt={teaserImage.alt} />

}else{
    teaserImageElement= <img className={styles.teaserImage} src='/noImage.png' alt="no image" />
}

let href="/[language]/[category]"
let url=`/${language}/${category}`



if(slug!=null){
    href="/[language]/[category]/[slug]"
    url=`/${language}/${category}/${slug}`
}

    return(

<>
 


        <Link as={url} href={href}  shallow={true} >
            <div className={styles.listItemWrapper}>
                <div className={styles.listItemInner}>
                    {isSelected &&
                        <div className={styles.text_wrapper}>
                            <div className={styles.title}>
                                <h2>{title}</h2>
                            </div>
                            <div className={styles.lead}>
                            {teaser != null &&  <StructuredText data={teaser.value} />}
                            </div>
                        </div>
                    }
                        {teaserImageElement}
                    <div 
                        className={styles.idColor} 
                        style={{
                        backgroundColor:idColor,
                        opacity:opacity
                        }}            
                        >
                    </div>
                </div>
            </div>
        </Link>
    </>)
}

 export default ListItem;