import { useState } from "react";
const Toglable = (props) => {
    const [visable,setVisable]=useState(false)

    const hideWhenVisable = {display:visable? 'none':''}
    const showWhenVisable = {display:visable ? '' : 'none'}

    const toggleVisability = () =>{
            setVisable(!visable)
    }
    return ( 
        <div>
            <div style = {hideWhenVisable}>
                <button onClick={toggleVisability}>{props.buttonLabel}</button>

            </div>
            <div style = {showWhenVisable}>
                {props.children}
                <button onClick={toggleVisability}>Cancel</button>

            </div>
        </div>

     );
}
 
export default Toglable;