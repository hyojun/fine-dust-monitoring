import { useMemo, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { update } from './cardSlice'
import checked_icon from "../../assets/favorite_checked.svg"
import unchecked_icon from "../../assets/favorite_unchecked.svg"
import CardModel from '../../model/CardModel';

type AppProps = {
    cardModel: CardModel
    showFavorite: boolean
};

const Card = ({ cardModel, showFavorite }: AppProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const { key, location, station, grade, metric, datetime } = cardModel;
    const checked = new Map(useAppSelector(state => state.cardReducer.favoriteModels).map((it) => [it.key, it.checked])).get(key)
    
    const getText = useCallback((grade: string | null): string => {
        switch(grade) {
            case '1':
                return `좋음`;
            case '2':
                return `보통`;
            case '3':
                return `한때나쁨`;
            case '4':
                return `나쁨`;
            case '5':
                return `매우나쁨`;
            default:
                return `알수없음`;
        }
    }, [grade]);
    
    const getBgColor = useCallback((grade: string | null): string => {
        switch(grade) {
            case '1':
                return `bg-blue-500`;
            case '2':
                return `bg-green-500`;
            case '3':
                return `bg-yellow-300`;
            case '4':
                return `bg-orange-500`;
            case '5':
                return `bg-red-500`;
            default:
                return `bg-gray-500`;
        }
    }, [grade]);

    const getTextColor = useCallback((grade: string | null): string => {
        switch(grade) {
            case '1':
                return `text-blue-500`;
            case '2':
                return `text-green-500`;
            case '3':
                return `text-yellow-300`;
            case '4':
                return `text-orange-500`;
            case '5':
                return `text-red-500`;
            default:
                return `text-gray-500`;
        }
    }, [grade]);

    const toggle = () => {
        dispatch(update({key, checked: !checked}))
    }

    return useMemo(() => <div className={`w-72 h-40 ${getBgColor(grade)} flex flex-col rounded-lg text-white select-none`}>
        <div className="h-10 flex flex-row pb-2">
            <div className="w-auto pl-2 pt-2">
                <span className="text-lg leading-4">{station}</span>
            </div>
            <div className="flex-1 pt-2">
                <span className="text-xs leading-3 pl-2">{location}</span>
            </div>
            {showFavorite && <div className="w-10 p-2" onClick={toggle}>
                <img src={checked ? checked_icon : unchecked_icon}/>
            </div>}
        </div>
        <div className="h-full flex">
            <div className="bg-white h-full rounded-lg flex items-center m-auto p-2">
                <span className={`m-auto ${getTextColor(grade)} text-5xl`}>{getText(grade)}</span>
            </div>
        </div>
        <div className="h-12 p-2 flex flex-col items-center text-xs">
            <div className="mx-auto">{`미세먼지 수치 : ${metric || '-'}`}</div>
            <div className="mx-auto">{`(${datetime || '-'} 기준)`}</div>
        </div>
    </div>,
    [cardModel, showFavorite, checked])
};

export { Card }
