import React, { useState, ChangeEvent } from 'react';
import './App.css'
import env from './GetEnv'

interface Props{
    /* CSS variants*/
    comp_h               : number;
    comp_w               : number;
    comp_margin          : number;
}

interface Param {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'no-cors' | 'cors' | 'same-origin',
    credentials: 'include' | 'same-origin' | 'omit',
    headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'},
    body: string | null
}

interface PostData {
    Textline : string;
}

function Feedback(props:Props){   
    const MARGIN = 10
    const all_css        : React.CSSProperties = {
        height           : String(props.comp_h) + 'px',
        width            : String(props.comp_w) + 'px',
        margin           : String(props.comp_margin) + 'px',
    }
    const textline_css   : React.CSSProperties = {
        fontSize         : '12px',
        cursor           : 'pointer', 
        backgroundColor  : '#FFFaF0',
        border           : 'none'
    }
    const title_css      : React.CSSProperties = {
        height           : '30px',
        fontSize         : '12px',
        marginBottom     : String(MARGIN) + 'px',
    }
    const modal_css      : React.CSSProperties = {
        height           : String(Math.min(window.innerHeight,400)) + 'px',
        width            : String(Math.min(window.innerWidth,400)) + 'px',
        backgroundColor  : '#FFFFFF'
    }
    const text_area_css  : React.CSSProperties = {
        height           : String(Math.min(window.innerHeight,320)) + 'px',
        width            : String(Math.min(window.innerWidth,360)) + 'px',
        marginLeft       : String(MARGIN) + 'px',
    }
    const btn_css        : React.CSSProperties = {
        width            : String(Math.min(window.innerWidth,365)) + 'px',
        marginLeft       : String(MARGIN) + 'px',
        backgroundColor  : '#FaF0e6',
        borderColor      : '#FaF0e6'
    }
    
    /*
     * MODAL WINDOWS
     */
    const [showModal,setShowModal] = useState<boolean>(false)
    function getShowModal(){
        if(showModal){
          setShowModal(false);
        }else{
          setShowModal(true);
        }
    }

    const [textValue, setTextValue] = useState<string>('')
    function getTextValue(e:ChangeEvent<HTMLTextAreaElement>){
        setTextValue(e.target.value)
    }

    function sendFeedback(){
        /*
         * 環境変数.envのreactでの使用方法については下記を参照した。
         * https://ralacode.com/blog/post/use-env-variables-in-react/
         */
        //const endpoint = process.env.REACT_APP_ENDPOINT_FEEDBACK;
        const post_data:PostData = {
            Textline: textValue,
        }
        const param:Param={
            method:'POST',
            mode:'cors',
            credentials:'omit',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(post_data)
        }

        fetch(String(env.endpoint),param)
        .then(res=>console.log('posting feedback succeeded'))
        .catch(error=>console.log('error occured',error))
    }

    return(
        <div style={all_css}> 
            <button style = {textline_css} onClick={getShowModal}><u>フィードバックを送信</u></button>
            <div>
            {
                showModal ?
                <div id= 'overlay' onClick={getShowModal}>
                    <div onClick={(e)=>e.stopPropagation()}>
                        <div style={modal_css}>
                            <p style={title_css}>フィードバックを送信</p>
                            <textarea 
                                style = {text_area_css} 
                                onChange = {getTextValue}
                                placeholder={'ここにフィードバックを入力してください'}
                            />
                            <button style={btn_css} onClick = {sendFeedback}>
                                送信
                            </button>
                        </div>
                    </div>
                </div> :
                ''
            } 
            </div>
        </div>
    )
}

export default Feedback;