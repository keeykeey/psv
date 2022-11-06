import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css'
import env from './GetEnv'

interface Props{
    /* CSS variants*/
    window_h             : number;
    window_w             : number;
    comp_h               : number;
    comp_w               : number;

    font_size            : number;
}

interface Param {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'no-cors' | 'cors' | 'same-origin',
    credentials: 'include' | 'same-origin' | 'omit',
    headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'}|{'taskid':string},
    body: string | null
}

function Feedback(/*props:Props*/){
    /*
    const char_count = 10  //フィードバックを送る　は10文字
    const MARGIN = 10
    const all_css        : React.CSSProperties = {
        height           : String(props.comp_h) + 'px',
        width            : String(props.comp_w) + 'px',
    }
    const textline_css   : React.CSSProperties = {
        paddingLeft      : String((props.comp_w - props.font_size * char_count)) + 'px',
        fontSize         : String(props.font_size) + 'px',
        cursor           : 'pointer',   
    }

    const title_css      : React.CSSProperties = {
        height           : '20px',
        fontSize         : String(props.font_size + 4) + 'px',
    }
    const modal_css      : React.CSSProperties = {
        height           : String(Math.min(props.window_h,400)) + 'px',
        width            : String(Math.min(props.window_w,400)) + 'px',
        backgroundColor  : '#FFFFFF'
    }
    const text_area_css  : React.CSSProperties = {
        height           : String(Math.min(props.window_h,320)) + 'px',
        width            : String(Math.min(props.window_w,360)) + 'px',
        marginLeft       : String(MARGIN) + 'px',
    }
    const btn_css        : React.CSSProperties = {
        width            : String(Math.min(props.window_w,365)) + 'px',
        marginLeft       : String(MARGIN) + 'px',
        backgroundColor  : '#FFCC00',
        borderColor      : '#FFCC00'
    }
    */

    const tmp_css : React.CSSProperties = {
        fontSize         : '12px', 
        marginLeft       : '20px',       
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
         * TODO 
         * バックエンド側に、フィードバックを送信する処理を書く。
         */
        ;
    }

    /*
    return(
        <div style={all_css}> 
            <u style = {textline_css} onClick={getShowModal}>フィードバックを送信</u>
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
    */

    return (
        <div style={tmp_css}>
            <a href="https://twitter.com/shin0618ff">フィードバックはこちらへお願いします。</a>
        </div>
    )
}

export default Feedback;