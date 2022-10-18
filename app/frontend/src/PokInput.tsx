import React, { useState, useEffect, ChangeEvent } from 'react';

const NUM31 = 20  // 個体値が31の時はa,b,c,d,e,の実数値がプラス20されるため

type input_handler_t     = { (e:ChangeEvent<HTMLInputElement>)  : void };
type select_handler_t    = { (e:ChangeEvent<HTMLSelectElement>) : void };
type check_box_handler_t = { (e:ChangeEvent<HTMLOptionElement>) : void };

interface Props{
    /* attacker */ 
    ac                   : number,
    getAc                : input_handler_t,
    ac_rank              : number,
    getAcRank            : select_handler_t,
    is_burned            : number,
    getIsBurned          : select_handler_t,
    tech_pow             : number,
    getTechPow           : select_handler_t,  
    is_tech_type_matched : string,
    getIsTechTypeMatched : select_handler_t, 

    /* attacker and defender */
    personality          : number,
    getPersonality       : select_handler_t,
    item                 : number,
    getItem              : select_handler_t,
    feature              : string,
    getFeature           : select_handler_t,

    /* defender */
    hp                   : number,
    getHp                : input_handler_t,
    bd                   : number,
    getBd                : input_handler_t,
    bd_rank              : number,
    getBdRank            : select_handler_t,
    
    /* flag to deside whether it's attacker or defencer */
    odflag : 'attack' | 'defence' | null,
}

function PokInput(props:Props){
    switch (props.odflag){
        case "attack":
            return(
                <div>
                    攻撃側<br/>
                    攻撃・特攻（努力値込み）
                    <input onChange={props.getAc} /><br/>
                    性格補正 
                    <select onChange={props.getPersonality}>
                        <option value='1.1'>{'上方補正（1.1倍）'}</option> 
                        <option value='1' selected>{'補正なし（１倍）'}</option> 
                        <option value='0.9'>{'下方補正（0.9倍）'}</option> 
                    </select><br/>
                    攻撃・特攻ランク
                    <select onChange={props.getAcRank}>
                        <option value = '6'>{'+6'}</option>
                        <option value = '5'>{'+5'}</option>
                        <option value = '4'>{'+4'}</option>
                        <option value = '3'>{'+3'}</option>
                        <option value = '2'>{'+2'}</option>
                        <option value = '1'>{'+1'}</option>
                        <option value = '0' selected>{'+0'}</option>
                        <option value = '-1'>{'-1'}</option>
                        <option value = '-2'>{'-2'}</option>
                        <option value = '-3'>{'-3'}</option>
                        <option value = '-4'>{'-4'}</option>
                        <option value = '-5'>{'-5'}</option>
                        <option value = '-6'>{'-6'}</option>
                    </select><br/>
                    アイテム
                    <select onChange={props.getItem}>
                        <option value = '1.5'>{'こだわり系  ×1.5倍'}</option>
                        <option value = '1.3'>{'命の珠 ×1.3倍'}</option>
                        <option value = '1.1'>{'ジェル系 ×1.3倍'}</option>
                        <option value = '1.2'>{'タイプ強化系 ×1.2倍'}</option>
                        <option value = '1.2'>{'達人の帯 ×1.2倍'}</option>
                        <option value = '1.1'>{'ちからのハチマキ、ものしりメガネ  ×1.1倍'}</option>
                        <option value = '1' selected>{'なし'}</option>
                    </select><br/>
                    特性
                    <select onChange={props.getFeature}>
                        <option value='2'>{'2'}</option>
                        <option value='1.5'>{'1.5'}</option>
                        <option value='1.3'>{'1.3'}</option>
                        <option value='1.25'>{'1.25'}</option>
                        <option value='1.2'>{'1.2'}</option>
                        <option value='1.1'>{'1.1'}</option>
                        <option value='1' selected>{'指定しな'}</option>
                        <option value='0.9'>{'0.9'}</option>
                        <option value='0.8'>{'0.8'}</option>
                        <option value='0.75'>{'0.75'}</option>
                        <option value='0.7'>{'0.7'}</option>
                        <option value='0.5'>{'0.5'}</option>
                        <option value='+1'>{'かたやぶり'}</option>
                    </select><br/>
                    技の威力
                    <select onChange={props.getTechPow}>
                        <option value='25'>{'25'}</option>
                        <option value='30'>{'30'}</option>
                        <option value='35'>{'35'}</option>
                        <option value='40'>{'40'}</option>
                        <option value='45'>{'45'}</option>
                        <option value='50'>{'50'}</option>
                        <option value='55'>{'55'}</option>
                        <option value='60'>{'60'}</option>
                        <option value='65'>{'65'}</option>
                        <option value='70'>{'70'}</option>
                        <option value='75'>{'75'}</option>
                        <option value='80' selected>{'80'}</option>
                        <option value='85'>{'85'}</option>
                        <option value='90'>{'90'}</option>
                        <option value='95'>{'95'}</option>
                        <option value='100'>{'100'}</option>
                        <option value='105'>{'105'}</option>
                        <option value='110'>{'110'}</option>
                        <option value='115'>{'115'}</option>
                        <option value='120'>{'120'}</option>
                        <option value='125'>{'125'}</option>
                        <option value='130'>{'130'}</option>
                        <option value='135'>{'135'}</option>
                        <option value='140'>{'140'}</option>
                        <option value='145'>{'145'}</option>
                        <option value='150'>{'150'}</option>
                        <option value='155'>{'155'}</option>
                        <option value='160'>{'160'}</option>
                    </select><br/>
                    タイプ一致
                    <select onChange={props.getIsTechTypeMatched}>
                        <option value='1.5'>{'一致'}</option>
                        <option value='1' selected>{'不一致'}</option>
                    </select>
                </div>
            );break;
        case "defence":
            return(
                <div>
                    防御側<br/>
                    HP
                    <input onChange={props.getHp}></input><br/>
                    防御・特防（努力値込み）
                    <input onChange={props.getBd}></input><br/>
                    性格補正
                    <select onChange={props.getPersonality}>
                        <option value='1.1'>{'上方補正（1.1倍）'}</option> 
                        <option value='1' selected>{'補正なし（１倍）'}</option> 
                        <option value='0.9'>{'下方補正（0.9倍）'}</option> 
                    </select><br/>
                    防御・特防ランク
                    <select onChange={props.getBdRank}>
                        <option value = '6'>{'+6'}</option>
                        <option value = '5'>{'+5'}</option>
                        <option value = '4'>{'+4'}</option>
                        <option value = '3'>{'+3'}</option>
                        <option value = '2'>{'+2'}</option>
                        <option value = '1'>{'+1'}</option>
                        <option value = '0' selected>{'+0'}</option>
                        <option value = '-1'>{'-1'}</option>
                        <option value = '-2'>{'-2'}</option>
                        <option value = '-3'>{'-3'}</option>
                        <option value = '-4'>{'-4'}</option>
                        <option value = '-5'>{'-5'}</option>
                        <option value = '-6'>{'-6'}</option>
                    </select><br/>
                    アイテム
                    <select onChange={props.getItem}>
                        <option value = '1.5'>{'とつげきチョッキ  ×1.5倍'}</option>
                        <option value = '1' selected>{'なし'}</option>
                        <option value = '0.5'>{'半減木の実 ×0.5倍'}</option>
                        <option value = '0'>風船</option>       {/* フィールド補正が無効になる */}
                    </select><br/>
                    特性
                    <select onChange={props.getFeature}>
                        <option value='2'>{'2倍'}</option>
                        <option value='1.5'>{'1.5倍'}</option>
                        <option value='1.3'>{'1.3倍'}</option>
                        <option value='1.25'>{'1.25倍'}</option>
                        <option value='1.2'>{'1.2倍'}</option>
                        <option value='1.1'>{'1.1倍'}</option>
                        <option value='1' selected>{'指定しない'}</option>
                        <option value='0.9'>{'0.9倍'}</option>
                        <option value='0.8'>{'0.8倍'}</option>
                        <option value='0.75'>{'0.75倍'}</option>
                        <option value='0.7'>{'0.7倍'}</option>
                        <option value='0.5'>{'0.5倍'}</option>
                        <option value='0'>{'0倍'}</option>
                    </select><br/>
                    <br/>
                </div>

            );break;
        default :
            return null;
    }
}

export default PokInput;