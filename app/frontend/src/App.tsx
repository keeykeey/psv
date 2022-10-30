import React, { useState, useEffect, ChangeEvent } from 'react';
import internal from 'stream';
import { isConstructorDeclaration } from 'typescript';
import './App.css';
import PokInput from './PokInput'
import Situation from './Situation'
import Result from './Result'
/* TODO
 * import Feedback from './Feedback'
 */

function App() {
    /*
     * ダメージ計算式は、下記を参考に実装した。
     * https://latest.pokewiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F
     */
    
    const LEVEL : number = 50;
    const CONST_VAL : number =  Math.floor(LEVEL * 2 / 5 +2); //22,ダメージ計算の定数
    const RANDOM_MIN = 0.85;
    const RANDOM_MAX = 1;
    const DEFAULT_HP = 155;
    const DEFAULT_ABCD = 100;
    const DEFAULT_DAMAGE_MAX = 46;
    const DEFAULT_DAMAGE_MIN = 39;
    const DEFAULT_TECH_POW = 100;

    /* PokInput attacker */
    const [ac, setAc] = useState<number>(DEFAULT_ABCD);
    function getAc(e:ChangeEvent<HTMLInputElement>) {
        setAc(Number(e.target.value));
        getDamage(Number(e.target.value),ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [ac_rank, setAcRank] = useState<number>(1);
    function getAcRank(e:ChangeEvent<HTMLSelectElement>) {
        var n = Number(e.target.value)
        var rank : number;
        if (Number(n) > 0) {
            setAcRank(n/2);  
            rank = n/2
        }else{
            setAcRank(2/Math.abs(n));
            rank = 2/Math.abs(n);
        }

        getDamage(ac,ac_personality,rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [tech_pow, setTechPow] = useState<number>(DEFAULT_TECH_POW);
    function getTechPow(e:ChangeEvent<HTMLSelectElement>) {
        setTechPow(Number(e.target.value));
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            Number(e.target.value),is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [is_tech_type_matched, setIsTechTypeMathced] = useState<number>(1);
    function getIsTechTypeMatched(e:ChangeEvent<HTMLSelectElement>) {
        setIsTechTypeMathced(Number(e.target.value))
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,Number(e.target.value),is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [is_burned,setIsBurned] = useState<number>(1);
    function getIsBurned() {
        var n : number = 1;
        switch (is_burned){
            case 1  : setIsBurned(0.5); n=0.5;break;
            case 0.5 : setIsBurned(1);break;
            default : setIsBurned(1);break;
        }

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,n,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    /* PokInput attacker and defender */
    const [ac_personality, setAcPersonality] = useState<number>(1);
    function getAcPersonality(e:ChangeEvent<HTMLSelectElement>) {
        setAcPersonality(Number(e.target.value));
        getDamage(ac,Number(e.target.value),ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }
    
    const [bd_personality, setBdPersonality] = useState<number>(1);
    function getBdPersonality(e:ChangeEvent<HTMLSelectElement>) {
        setAcPersonality(Number(e.target.value));
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,Number(e.target.value),bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [ac_item, setAcItem] = useState<number>(1);
    function getAcItem(e:ChangeEvent<HTMLSelectElement>) {
        setAcItem(Number(e.target.value));
        getDamage(ac,ac_personality,ac_rank,
            Number(e.target.value), ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [bd_item, setBdItem] = useState<number>(1);
    function getBdItem(e:ChangeEvent<HTMLSelectElement>) {
        setBdItem(Number(e.target.value));
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            Number(e.target.value), bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [ac_feature, setAcFeature] = useState<number>(1);
    function getAcFeature(e:ChangeEvent<HTMLSelectElement>) {
        setAcFeature(Number(e.target.value))
        getDamage(ac,ac_personality,ac_rank,
            ac_item, Number(e.target.value),
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [bd_feature, setBdFeature] = useState<number>(1);
    function getBdFeature(e:ChangeEvent<HTMLSelectElement>) {
        setBdFeature(Number(e.target.value))
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, Number(e.target.value),
            weather,field,type_adj,is_defending_wall)
    }

    /* PokInput defender */
    const [hp, setHp] = useState<number>(DEFAULT_HP);
    function getHp(e:ChangeEvent<HTMLInputElement>) {
        setHp(Number(e.target.value))
    }

    const [bd, setBd] = useState<number>(DEFAULT_ABCD);
    function getBd(e:ChangeEvent<HTMLInputElement>) {
        setBd(Number(e.target.value))
        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            Number(e.target.value),bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    const [bd_rank, setBdRank] = useState<number>(1);
    function getBdRank(e:ChangeEvent<HTMLSelectElement>) {
        var n = Number(e.target.value)
        var rank : number;
        if (Number(n) > 0) {
            setBdRank(n/2);
            rank = n/2
        }else{
            setBdRank(2/Math.abs(n));
            rank = 2/Math.abs(n);
        }

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,rank,
            bd_item, bd_feature,
            weather,field,type_adj,is_defending_wall)
    }

    /* Situation */
    const [weather, setWeather] = useState<number>(1);
    function getWeather(e:ChangeEvent<HTMLSelectElement>) {
        setWeather(Number(e.target.value))

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            Number(e.target.value),field,type_adj,is_defending_wall)
    }

    const [field, setField] = useState<number>(1);
    function getField(e:ChangeEvent<HTMLSelectElement>) {
        setField(Number(e.target.value))

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,Number(e.target.value),type_adj,is_defending_wall)
    }

    const [type_adj,setTypeAdj] = useState<number>(1);
    function getTypeAdj(e:ChangeEvent<HTMLSelectElement>) {
        setTypeAdj(Number(e.target.value))

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,Number(e.target.value),is_defending_wall)
    }

    const [is_defending_wall, setIsDefendingWall] = useState<number>(1);
    function getIsDefendingWall(e:ChangeEvent<HTMLSelectElement>) {
        setIsDefendingWall(Number(e.target.value))

        getDamage(ac,ac_personality,ac_rank,
            ac_item, ac_feature,
            tech_pow,is_tech_type_matched,is_burned,
            bd,bd_personality,bd_rank,
            bd_item, bd_feature,
            weather,field,type_adj,Number(e.target.value))
    }

    /* 結果 */
    const [damage, setDamage] = useState<number>(DEFAULT_DAMAGE_MAX);
    function getDamage(ac:number, ac_personality:number, ac_rank:number,
        ac_item:number, ac_feature:number,
        tech_pow:number,is_tech_type_matched:number,is_burned:number,
        bd:number,bd_personality:number,bd_rank:number,
        bd_item:number, bd_feature:number,
        weather:number, field:number, type_adj:number,is_defending_wall:number, ) 
    {   
        var d_uprise = 1    
        if (weather < 10){
            ;
        } else {
            switch (weather){
                case 15: {
                    //砂嵐の特防1.5倍
                    d_uprise = 1.5;
                    weather = 1;
                };break;
                default : weather = 1; break;
            }
        }

        var bd_item_dmg_mgni :number = 1;
        if (bd_item < 10){
            ; 
        } else {
            switch (bd_item){
                case 15: {
                    //半減きのみ
                    bd_item_dmg_mgni = 0.5;
                    bd_item = 1;
                }; break;
                default : bd_item_dmg_mgni = 1; break;
            }
        }

        var fin_tech_pow :number, fin_ac:number, fin_bd:number;
        fin_tech_pow = Math.round(tech_pow * ac_item * ac_feature * field);
        fin_ac = Math.round(ac * ac_personality * ac_rank );
        fin_bd = Math.round(Math.max(bd,0.5) * d_uprise * bd_rank * bd_personality * 
                            bd_item * bd_feature); 
        
        var fin_dmg = Math.floor(CONST_VAL * fin_tech_pow * fin_ac / fin_bd)
        fin_dmg = Math.floor(fin_dmg/50 + 2)
        fin_dmg = Math.round(fin_dmg * is_defending_wall)
        fin_dmg = Math.round(fin_dmg * weather)
        fin_dmg = Math.round(fin_dmg * is_tech_type_matched)
        fin_dmg = Math.floor(fin_dmg * type_adj) //タイプ相性
        fin_dmg = Math.round(fin_dmg * is_burned)
        fin_dmg = Math.round(fin_dmg * bd_item_dmg_mgni) //計算の順番や、切り上げ、切り下げが正しいかはわからない。

        setDamage(fin_dmg);
        setDamageMax(fin_dmg * RANDOM_MAX);
        setDamageMin(Math.round(fin_dmg * RANDOM_MIN));
    }
    
    const [damage_min,setDamageMin] = useState<number>(DEFAULT_DAMAGE_MIN);

    const [damage_max,setDamageMax] = useState<number>(DEFAULT_DAMAGE_MAX);

    const [is_fixed_or_randomed, setIsFixedOrRandomed] = useState<string | undefined>();
    function getIsFixedOrRandomed(){
        /* TODO */
        setIsFixedOrRandomed('')
    }

    const [number_to_beat, setNumberToBeat] = useState<number | undefined>();
    function getNumberToBeat() {
        /* TODO */
        ;
    }

    return(
        <div>
            <PokInput 
                ac                   = {ac}
                getAc                = {getAc}
                ac_rank              = {ac_rank}
                getAcRank            = {getAcRank}
                is_burned            = {is_burned}
                getIsBurned          = {getIsBurned}
                tech_pow             = {tech_pow}
                getTechPow           = {getTechPow}
                is_tech_type_matched = {is_tech_type_matched}
                getIsTechTypeMatched = {getIsTechTypeMatched}

                personality          = {ac_personality}
                getPersonality       = {getAcPersonality}
                item                 = {ac_item}
                getItem              = {getAcItem}
                feature              = {ac_feature}
                getFeature           = {getAcFeature}

                hp                   = {hp}      
                getHp                = {getHp}
                bd                   = {bd}
                getBd                = {getBd}
                bd_rank              = {bd_rank}
                getBdRank            = {getBdRank}
                
                odflag               = {"attack"}

                default_hp           = {DEFAULT_HP}
                default_abcd         = {DEFAULT_ABCD}
                default_tech_pow     = {DEFAULT_TECH_POW}

                comp_h               = {290}
                comp_w               = {340}
                window_h             = {window.innerHeight}
                window_w             = {window.innerWidth}      

            /><br/>
            <PokInput 
                ac                   = {ac}
                getAc                = {getAc}
                ac_rank              = {ac_rank}
                getAcRank            = {getAcRank}
                is_burned            = {is_burned}
                getIsBurned          = {getIsBurned}
                tech_pow             = {tech_pow}
                getTechPow           = {getTechPow}
                is_tech_type_matched = {is_tech_type_matched}
                getIsTechTypeMatched = {getIsTechTypeMatched}

                personality          = {bd_personality}
                getPersonality       = {getBdPersonality}
                item                 = {ac_item}
                getItem              = {getBdItem}
                feature              = {bd_feature}
                getFeature           = {getBdFeature}

                hp                   = {hp}      
                getHp                = {getHp}
                bd                   = {bd}
                getBd                = {getBd}
                bd_rank              = {bd_rank}
                getBdRank            = {getBdRank}

                odflag               = {"defence"}

                default_hp           = {DEFAULT_HP}
                default_abcd         = {DEFAULT_ABCD}
                default_tech_pow     = {DEFAULT_TECH_POW}

                comp_h               = {210}
                comp_w               = {340}
                window_h             = {window.innerHeight}
                window_w             = {window.innerWidth}      

            />
            <Situation
                weather              = {weather}
                getWeather           = {getWeather}
                field                = {field}
                getField             = {getField}
                type_adj             = {type_adj}
                getTypeAdj           = {getTypeAdj}
                is_defending_wall    = {is_defending_wall}
                getIsDefendingWall   = {getIsDefendingWall}

                comp_h               = {150}
                comp_w               = {340}
                window_h             = {window.innerHeight}
                window_w             = {window.innerWidth}      
            /><br/>

            <Result                
                damage               = {damage}
                damage_min           = {damage_min}
                damage_max           = {damage_max}
                is_fixed_or_randomed = {is_fixed_or_randomed}
                number_to_beat       = {number_to_beat}

                comp_h               = {88}
                comp_w               = {340}
                window_h             = {window.innerHeight}
                window_w             = {window.innerWidth}      
            />
            
            {/* TODO
            <Feedback 
                comp_h               = {15}
                comp_w               = {340}
                window_h             = {window.innerHeight}
                window_w             = {window.innerWidth}      
                font_size            = {12}
            /> 
            */}    
            
        </div>
    )
}

export default App;
