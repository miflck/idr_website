import styles from './suchfeldelement.module.scss'
import React, { useState } from 'react'

export default function SuchFeldElement (props) {
    // console.log("props suchfeldelement component", props)
    
    // auch hier reinnehmen die neue liste sortieren?
    // const [search, setSearch] = useState('')
    // useEffect(() => {
    // setFilterdList(searchInput(allProjekts,search));
    // },[search])

    const [open,setSearchbarOpen] = useState(false)
    const handleOnClick=(open)=>{
        setSearchbarOpen(open => !open)
    }

    return (
        <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')}>
            <input 
              className={styles.inputfeld}
              type="text" 
              placeholder="Suche" 
              onChange={(e) => props.setSearch(e.target.value)}
            />
            <span className={styles.suchemoji} onClick={handleOnClick}> 
              <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em"  viewBox="0 0 87.9 86">
                <g>
                  <circle cx="31.7" cy="31.7" r="27.9"/>
                  <line x1="52.3" y1="50.4" x2="85.3" y2="83.3"/>
                </g>
              </svg>
            </span>
        </div>
    )
  }




