import { StructuredText } from "react-datocms"

import styles from './textelement.module.scss'

const TextElement =(props)=>{
    return (
            <div className={styles.textelement}>
                <StructuredText data={props.value}/>
            </div>

    )
}
export default TextElement;