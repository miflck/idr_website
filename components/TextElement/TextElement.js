import React, {useEffect, useContext } from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import { StructuredText } from "react-datocms";

import styles from './textelement.module.scss'
import Link from 'next/link'
import Container from '../Container/container'

const TextElement =(props)=>{
    console.log(props);

    return (
        <Container>
            <StructuredText data={props.block.text.value}></StructuredText>
        </Container>
    )
}

export default TextElement;