import styles from './filterelement.module.scss'

export default function FilterElement (props) {
    console.log("props Filter Element", props)

//nach Forschungsfelder filtern
function filterBy(data, filterterms) {
    return data.filter((obj) => {
      //kann sein: every für && und some für || ? 
      return filterterms.every((term)=>{
        return obj.forschungsfeld.some((feld)=>{
         return feld.titel.toString().includes(term);
        })
      })   
    })
  }

  const [filter, setFilter] = useState([])
  const addMoreItem = (item) => {
  const copyfilter = [...filter]
  var index = copyfilter.indexOf(item);
  if (index !== -1) {
    copyfilter.splice(index, 1);
    setFilter([...copyfilter])
  }
  else{
    setFilter([...filter, item])
  }
  }

  const [filterdList, setFilterdList] = useState([])


  //wieder im index der seite drin?
//   useEffect(() => {
//     setFilterdList(filterBy(allMenschens, filter) )
//   },[filter])


  let FilterElement;
  if(filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > alle Filter deaktivieren </a> </div>
                      <div className={styles.filterauflistung}>
                        {allForschungsfelders.map((forschungsfeld) =>{
                          let btn_class;
                          if(filter.includes(forschungsfeld.titel)) {
                            btn_class = styles.forschungsfeldaktiv
                          }
                          else {
                            btn_class = styles.forschungsfeld
                          }
                          return(
                            <span className={btn_class}>
                              <a 
                              onClick={() => addMoreItem(forschungsfeld.titel)}
                              key={forschungsfeld.titel}
                              > 
                                {forschungsfeld.titel} 
                            </a>
                            </span>
                          )})}
                          
                          {allFunktions.map((funktion) =>{
                              let btn_class;
                              if(filter.includes(funktion.titel)) {
                                btn_class = styles.forschungsfeldaktiv
                              }
                              else {
                                btn_class = styles.forschungsfeld
                              }
                              return(
                                <span className={btn_class}>
                                  <a 
                                  onClick={() => addMoreItem(funktion.titel)}
                                  key={funktion.titel}
                                  > 
                                    {funktion.titel} 
                                </a>
                                </span>
                          )})}
                      </div>
                      </div>
  }

  return
        {FilterElement}
}