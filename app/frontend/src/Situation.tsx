import React, { useState, useEffect, ChangeEvent } from 'react';

const NUM31 = 20  // 個体値が31の時はa,b,c,d,e,の実数値がプラス20されるため

type select_handler_t = { (e:ChangeEvent<HTMLSelectElement>) : void };
type input_handler_t = { (e:ChangeEvent<HTMLInputElement>) : void };

interface Props{
    weather             : number,
    getWeather          : select_handler_t,
    field               : number,
    getField            : select_handler_t,
    type_adj            : number,
    getTypeAdj          : select_handler_t,
    is_defending_wall   : number ,
    getIsDefendingWall  : select_handler_t, 
}

function Situation(props:Props){
    return(
        <div>
            天候
            <select onChange = {props.getWeather} >
                <option value = '1' > {'指定しない'}</option>
                <option value = '1.5'>{'雨・晴による与ダメージアップ　×1.5倍'}</option>
                <option value = '0.5'>{'雨・晴による被ダメージダウン　×0.5倍'}</option>
                <option value = '15'>{'砂嵐による特防アップ　×1.5倍'}</option>
            </select>{props.weather}<br/>
            フィールド
            <select onChange = {props.getField} >
                <option value = '1'>{'指定しない'}</option>
                <option value = '1.5'>{'威力 ×1.5倍'}</option>
            </select>{props.field}<br/>
            タイプ相性
            <select onChange = {props.getTypeAdj} defaultValue='1'>
                <option value = '4'>{'×4倍'}</option>
                <option value = '2'>{'×2倍'}</option>
                <option value = '1'>{'×等倍'}</option>
                <option value = '0.5'>{'×1/2減'}</option>
                <option value = '0.25'>{'×1/4減'}</option>
            </select>{props.type_adj}<br/>
            壁あり
            <select onChange = {props.getIsDefendingWall} defaultValue = '1'>
                <option value = '1'>{'壁なし'}</option>
                <option value = '0.5'>{'壁（シングル）'}</option>
                <option value = '0.6669'>{'壁（ダブル）'}</option>
            </select>
        </div>
    )
}

export default Situation;