import React from 'react';
import { StructuredText } from "react-datocms";

// import styles from './slices.module.scss';

// Text section slice component
const TextSection = ({ slice }) => {
    console.log("whatever", slice)
  return (
	<div className={styles.textsection_wrapper}>
	  	{/* <StructuredText render={slice.text} />  */}
	</div>	
  );
};
export default TextSection;
