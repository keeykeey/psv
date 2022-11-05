import React, { useState, useEffect, ChangeEvent } from 'react';

interface Props{
    damage               : (number | undefined),
    damage_min           : (number | undefined),
    damage_max           : (number | undefined),
    is_fixed_or_randomed : (string | undefined),
    number_to_beat       : (number | undefined),

    /* CSS variants*/
    comp_h               : number,
    comp_w               : number,
    comp_margin          : number,
}

function Result(props:Props){
    const PADDING = 20;
    const all_css   : React.CSSProperties = {
        height           : String(props.comp_h) + 'px',
        width            : String(props.comp_w-props.comp_margin*2)+ 'px',
        margin           : String(props.comp_margin) + 'px',

        backgroundColor  : '#FFFaF0',
        color            : '#000000',

        fontSize         : '16px',

    }
    const title_css : React.CSSProperties = {
        height           : '22px',
        width            : String(props.comp_w) + 'px',

        fontSize         : '18px',
        font             : 'bold',
    }
    const body_css : React.CSSProperties = {
        height           : '60px',
        width            : String(props.comp_w - PADDING) + 'px',
        paddingLeft      : String(PADDING) + 'px',

    }

    return(
        <div style={all_css}>   
            <div style={title_css}>結果</div><hr/>
            <div style={body_css}>ダメージ  :  {props.damage_min} ~ {props.damage_max} </div>
            {/*確定 {props.number_to_beat}発 <br/>*/}
            {/*乱数 {props.number_to_beat}発 <br/>*/}
        </div>
    )
}

export default Result;