import React, { useState, useEffect, ChangeEvent } from 'react';

const NUM31 = 20  // 個体値が31の時はa,b,c,d,e,の実数値がプラス20されるため

type input_handler_t = { (e:ChangeEvent<HTMLInputElement>)  : void };
type btn_handler_t   = { (e:ChangeEvent<HTMLButtonElement>) : void };

interface Props{
    /* attacker */ 
    ac              : number,
    getAc           : input_handler_t,
    ac_rank         : number,
    getAcRank       : btn_handler_t,
    tech_pow        : number,
    getTechPow      : input_handler_t,   

    /* attacker and defender */
    personality     : number,
    getPersonality  : btn_handler_t,
    item            : number,
    getItem         : btn_handler_t,
    feature         : string,
    getFeature      : btn_handler_t,

    /* defender */
    hp              : number,
    getHp           : input_handler_t,
    bd              : number,
    getBd           : input_handler_t,
    bd_rank         : number,
    getBdRank       : btn_handler_t,
    
    /* flag to deside whether it's attacker or defencer */
    odflag : 'attack' | 'defence' | null,
}

function PokInput(props:Props){
    switch (props.odflag){
        case "attack":
            return(
                <div>
                    攻撃側<br/>
                    攻撃（努力値込み）{props.ac}<br/>
                    性格補正 {props.personality}<br/>
                    攻撃ランク{props.ac_rank}<br/>
                    アイテム{props.item}<br/>
                    特性{props.feature}<br/>
                    技の威力{props.tech_pow}<br/>
                </div>
            );break;
        case "defence":
            return(
                <div>
                    防御側<br/>
                    HP{props.hp}<br/>
                    防御（努力値込み）{props.bd}<br/>
                    性格補正{props.personality}<br/>
                    防御ランク{props.bd_rank}<br/>
                    アイテム{props.item}<br/>
                    特性{props.feature}<br/>
                    <br/>
                </div>

            );break;
        default :
            return null;
    }
}

export default PokInput;