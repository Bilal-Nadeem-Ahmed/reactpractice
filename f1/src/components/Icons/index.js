import {CopyOutlined, SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
const Icons = () => {
    return ( <div>
        <br></br>
        <h1>This is the icons section</h1>
        <CopyOutlined style={{ margin:'1em',fontSize: '2em' }}/>
        <SmileTwoTone style={{ margin:'1em',fontSize: '2em' }}/>
    <HeartTwoTone style={{ margin:'1em',fontSize: '2em' }}   twoToneColor="#eb2f96" />
    <CheckCircleTwoTone style={{ margin:'1em',fontSize: '2em' }} twoToneColor="#52c41a" />
    </div> );
}
 
export default Icons;