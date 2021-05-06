import { createContext, useContext,useState,useEffect } from 'react';

const initialState = {
    colorHexCode:'#F2F2F2',
    colorHexCodeSecond:'ffffff'
};

const AppContext = createContext(initialState);

export function AppWrapper({ children }) {

    const [colorHexCode, setColorHexCode] = useState('#000000');
    const [colorHexCodeSecond, setColorHexCodeSecond] = useState('#ffffff');

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty('--maincolor', `${colorHexCode}`);
        console.log("use Effect form Context colorHexCode")

    },[colorHexCode])

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty('--secondcolor', `${colorHexCodeSecond}`)
        console.log("use Effect from Context newColorSecond")
    },[colorHexCodeSecond])

  return (
    <AppContext.Provider value={{colorHexCode,setColorHexCode,colorHexCodeSecond,setColorHexCodeSecond}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}