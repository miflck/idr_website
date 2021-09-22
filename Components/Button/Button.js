
import styles from './Button.module.scss';

const Button = props => {
  let {style,title,id,handleHover,handleClick}=props;
  return (

    <button className = {` ${styles.root} `}
        onMouseEnter={ ()=>handleHover(true,id)} 
        onMouseLeave={ ()=>handleHover(false,id)}
        onTouchStart={ ()=>handleHover(true,id)}  
        onTouchEnd={ ()=>handleHover(false,id)}
        onTouchCancel={ ()=>handleHover(false,id)}
        onClick={() => handleClick(id)}
        key={id} 
        style={style}
      >

        {title}
    </button>
  );
};

Button.defaultProps = {

};

export default Button;