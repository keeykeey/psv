import React, { useState, useEffect, ChangeEvent } from 'react';

const NUM31 = 20  // 個体値が31の時はa,b,c,d,e,の実数値がプラス20されるため

type select_handler_t = { (e:ChangeEvent<HTMLSelectElement>) : void };
type input_handler_t = { (e:ChangeEvent<HTMLInputElement>) : void };

interface Props{
    getWeather          : select_handler_t,
    getField            : select_handler_t,
    getTypeAdj          : select_handler_t,
    getIsDefendingWall  : select_handler_t, 
    getIsDoubleDamage   : input_handler_t,

    /* CSS variants */
    comp_h              : number,
    comp_w              : number,
    comp_margin          : number,
}

function Situation(props:Props){
    const PADDING = 20;
    const all_css   : React.CSSProperties = {
        height           : String(props.comp_h) + 'px',
        width            : String(props.comp_w - props.comp_margin*2) + 'px',
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
        <div style = {all_css}>
            <div style = {title_css}>環境・タイプ相性設定</div><hr/>
            <div style = {body_css}>
                天候
                <select onChange = {props.getWeather} >
                    <option value = '1' > {'指定しない'}</option>
                    <option value = '1.5'>{'雨・晴による与ダメージアップ　×1.5倍'}</option>
                    <option value = '0.5'>{'雨・晴による被ダメージダウン　×0.5倍'}</option>
                    <option value = '15'>{'砂嵐・雪による特防・防御アップ　×1.5倍'}</option>
                </select><br/>
                フィールド
                <select onChange = {props.getField} >
                    <option value = '1'>{'指定しない'}</option>
                    <option value = '1.5'>{'威力 ×1.5倍'}</option>
                </select><br/>
                タイプ相性
                <select onChange = {props.getTypeAdj} defaultValue='1'>
                    <option value = '4'>{'×4倍'}</option>
                    <option value = '2'>{'×2倍'}</option>
                    <option value = '1'>{'×等倍'}</option>
                    <option value = '0.5'>{'×1/2減'}</option>
                    <option value = '0.25'>{'×1/4減'}</option>
                </select><br/>
                壁あり
                <select onChange = {props.getIsDefendingWall} defaultValue = '1'>
                    <option value = '1'>{'壁なし'}</option>
                    <option value = '0.5'>{'壁（シングル）'}</option>
                    <option value = '0.6669'>{'壁（ダブル）'}</option>
                </select><br/>
                ダブルダメージ
                <input type='checkbox' onChange={props.getIsDoubleDamage}/>
            </div>
        </div>
    )
}

export default Situation;