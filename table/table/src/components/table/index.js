import Rows from "./subcomponents/rows"
import {useState} from 'react'

const Table = () => {
    const newArray=new Array(30)
    newArray.map(value=>value=1)
    const [totals,setTotals]=useState( [])
    console.log(newArray)
    return ( 
    <table>
        <thead>
            <tr>
                <th>one</th>
                <th>two</th>
                <th>three</th>
            </tr>
           
            
            </thead> 
            <tbody>
                <Rows/>
            </tbody>
    </table> );
}
 
export default Table;