import styles from './suchfeldelement.module.scss'
import React, { useState } from 'react'

export default function SuchFeldElement(props) {

  const [open, setSearchbarOpen] = useState(false)
  const handleOnClick = (open) => {
    setSearchbarOpen(open => !open)
    console.log("opnennnn")
  }

  const [aktiv, setSearchbarAktiv] = useState(false)
  const handleOnClickAktiv = (aktiv) => {
    setSearchbarAktiv(aktiv => !aktiv)
    console.log("aktiv")
  }

  return (
    <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')}>
      <div 
          onClick={handleOnClick} 
          className={[styles.suchbutton, (aktiv ? styles.aktiv : [])].join(' ')}
          // onClick={(e) => handleOnClickAktiv(!aktiv)}
        >
        <span className={styles.suchemoji}>
          <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 87.9 86">
            <g>
              <circle cx="31.7" cy="31.7" r="27.9" />
              <line x1="52.3" y1="50.4" x2="85.3" y2="83.3" />
            </g>
          </svg>
        </span>
        Suche
      </div>

      <input
        className={styles.inputfeld}
        type="text"
        placeholder=""
        onChange={(e) => props.setSearch(e.target.value)}
        //wollte, dass der Button Suche schwarz wird, 
        //wenn ein Filter aktiv ist und per Klicken auf Suche der Filter wieder gelöscht und das Tippfeld verschwindet
        onFocus={(e) => handleOnClickAktiv(!aktiv)}
      />
    </div>
  )
}




