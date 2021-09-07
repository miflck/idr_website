import styles from './forschungsfeldelement.module.scss'

export default function ForschungsfeldElement (props) {
    // console.log("props ForschungsfeldElement", props)

    let Forschungsfelder;
    
    if(props.type) {
        var types = props.type.split('_').join(' ');
        if (types != null) {
            if(props.filter) {
                let hover_class = { color: 'var(--maincolor)' };
                let btn_class;
                if(props.filter.includes(props.type)) {
                    btn_class = styles.forschungsfeldaktiv
                    hover_class = {
                        color:'var(--secondcolor)'
                    }
                    if(props.showHoverGradient){
                        hover_class = {
                            color: 'var(--maincolor)',
                            border: '1px solid var(--secondcolor)',
                            background: 'var(--secondcolor)'
                        }
                    }
                }
                else {
                    btn_class = styles.forschungsfeld
                    if(props.showHoverGradient){
                        hover_class = {
                            color: 'var(--secondcolor)',
                            border: '1px solid var(--secondcolor)'
                        }
                    }
                }
                Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                        <div className={btn_class} >
                                            <a style={hover_class} onClick={() => props.addMoreItem(props.type)}> 
                                                {types} 
                                            </a>
                                        </div>
                                    </div>
            }
        }

    } else {
        let colors=[];
            props.forschungsfeld.map((forschungsfeld) => {
                colors.push(forschungsfeld.colour.hex)
            })

            let background_style={
                background: `linear-gradient(to right,"white"})`,
                animation:`${styles.fadeOut} 0.5s ease`
            };

            let background_style_small={
                background: `linear-gradient(to right,"white"})`,
                animation:`${styles.fadeOut} 0.5s ease`,
            };

            

    if (props.forschungsfeld != null) {
        Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                    {props.forschungsfeld.map((forschungsfeld) => {
                                        let hover_class = { color: 'var(--maincolor)' };
                                        let btn_class;
                                        if(props.filter.includes(forschungsfeld.titel)) {
                                            btn_class = styles.forschungsfeldaktiv
                                            hover_class = {
                                                color:'var(--secondcolor)'
                                            }
                                            if(props.showHoverGradient){
                                                hover_class = {
                                                    color: 'var(--maincolor)',
                                                    border: '1px solid var(--secondcolor)',
                                                    background: 'var(--secondcolor)'
                                                }
                                            }
                                        }
                                        else {
                                            btn_class = styles.forschungsfeld
                                            if(props.showHoverGradient){
                                                hover_class = {
                                                    color: 'var(--secondcolor)',
                                                    border: '1px solid var(--secondcolor)'
                                                }
                                            }
                                        }
                                        return (
                                             <div className={btn_class}>
                                                <a 
                                                onClick={() => props.addMoreItem(forschungsfeld.titel)}
                                                key={forschungsfeld.titel} style={hover_class}
                                                > 
                                                {forschungsfeld.titel}
                                            </a>
                                            </div>
                                        )
                                    })}
                                </div>
    }
    
    else {
        Forschungsfelder = <></>
    }
}
    return (
        <div>
            {Forschungsfelder}
        </div>
    )
    
  }
