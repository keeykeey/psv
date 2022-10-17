import React, { useState, useEffect, ChangeEvent } from 'react';

const NUM31 = 20  // 個体値が31の時はa,b,c,d,e,の実数値がプラス20されるため

type select_handler_t = { (e:ChangeEvent<HTMLSelectElement>) : void };

interface Props{
    weather             : string,
    getWeather          : select_handler_t,
    field               : string,
    getField            : select_handler_t,
    type_adj            : number,
    getTypeAdj          : select_handler_t,
    is_defending_wall   : number
    getIsDefendingWall  : select_handler_t, 
}

function Situation(props:Props){
    return(
        <div>
            天候
            <select>
                <option value = 'nothing' > {'指定しない'}</option>
                <option value = 'rainy'>{'雨'}</option>
                <option value = 'shiny'>{'晴れ'}</option>
                <option value = 'hailstorm'>{'あられ'}</option>
                <option value = 'sandstorm'>{'砂嵐'}</option>
            </select><br/>
            フィールド
            <select>
                <option value = 'nothing'>{'指定しない'}</option>
                <option value = 'electric'>{'エレキフィールド'}</option>
                <option value = 'grass'>{'グラスフィールド'}</option>
                <option value = 'mist'>{'ミストフィールド'}</option>
                <option value = 'psycho'>{'サイコフィールド'}</option>
            </select><br/>
            タイプ相性
            <select>
                <option value = '1'>{'等倍'}</option>
                <option value = '2'>{'2倍'}</option>
                <option value = '4'>{'4倍'}</option>
                <option value = '0.5'>{'1/2減'}</option>
                <option value = '0.25'>{'1/4減'}</option>
            </select><br/>
            壁（リフレクター/ひかりのかべ等）
            <select>{props.is_defending_wall}
                <option value = '1'>{'壁あり'}</option>
                <option value = '0.5'>{'壁なし'}</option>
            </select><br/>
        </div>
    )
}

export default Situation;