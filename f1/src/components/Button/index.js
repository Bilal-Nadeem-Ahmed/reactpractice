import { Button,Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {useState} from 'react'
const Buttons = () => {
    const [size,setSize]=useState('large')

    const handleSizeChange = e => {
        setSize(e.target.value)
      };
    return ( 
        <>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button shape="round" type="dashed">Dashed Button</Button>
           
            <Button  type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
            <br/>
            <br></br>
            <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <Button type="primary" size={size}>
            Primary
            </Button>
            <Button size={size}>Default</Button>
            <Button type="dashed" size={size}>
            Dashed
            </Button>
            <br />
            <Button type="link" size={size}>
            Link
            </Button>
            <br />
            <Button type="primary" ghost icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
            <Button type="primary" shape="round" danger icon={<DownloadOutlined />} size={size}>
            Download
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
            </Button>
            <br/>
        </>
     )
}
 
export default Buttons;