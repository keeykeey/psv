import React, { useState, useEffect, ChangeEvent } from 'react';
import { getLeadingCommentRanges } from 'typescript';

interface Props{
    damage               : (number | undefined),
    damage_min           : (number | undefined),
    damage_max           : (number | undefined),
    is_fixed_or_randomed : (string | undefined),
    number_to_beat       : (number | undefined),
}

function Result(props:Props){
    return(
        <div>   
            結果<br/>
            ダメージ {props.damage_min} ~ {props.damage_max}<br/>
            {/*確定 {props.number_to_beat}発 <br/>*/}
            {/*乱数 {props.number_to_beat}発 <br/>*/}
        </div>
    )
}

export default Result;