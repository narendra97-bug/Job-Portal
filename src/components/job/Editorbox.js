import React,{useState} from 'react'
import { Editor, OriginalTools } from 'react-bootstrap-editor';

function Editorbox(props) {

    const handleChangeBox=(e)=>{
        props.setData({
          ...props.data,
          [props.name]: e,
        });
      }
      return (
        <div className='container border border-5 mt-3 p-3 rounded'>
            <Editor
                // name ={props.name}
                tools={OriginalTools}
                value={props.data.description}
                onChange={handleChangeBox }
            />
        </div>
    ) ; 
}

export default Editorbox




