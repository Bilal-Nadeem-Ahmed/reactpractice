import { Button } from 'antd';
const Buttons = () => {
    return ( 
        <>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button shape="round" type="dashed">Dashed Button</Button>
           
            <Button  type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
        </>
     )
}
 
export default Buttons;