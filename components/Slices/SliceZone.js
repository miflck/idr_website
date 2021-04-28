// import React, { useEffect } from 'react';
import {
    TextSection,
    Einzelbild,
    Galerie
} from './';


const SliceZone = (props) => {

    const {sliceZone} = props

    return(
        <div className="">
            {
            sliceZone.body.map((slice, index) => {
                console.log(slice)
                // console.log(slice.primary.vimeolink)
                switch (slice.type) {
        
                case ('text'):
                    return <TextSection slice={slice} key={`body-${index}`} />;

                case ('einzelbild'):
                    return <Einzelbild slice={slice} key={`body-${index}`} />;
                
                case ('galerie'):
                    return <Galerie slice={slice} key={`body-${index}`}/>;
     
                // case ('video'):
                //     return <Video slice={slice} key={`body-${index}`} handleAudio={handleAudio}/>;
                
                default:
                    return null;
                }
            }
            )
        }
        </div>
    )
}
  

export default SliceZone;