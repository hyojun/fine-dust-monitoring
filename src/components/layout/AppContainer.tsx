import { CardContainer } from '../container/CardContainer';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { LoadingContainer } from '../container/LoadingContainer';
import { useEffect } from 'react';
import CardModel from '../../model/CardModel';
import { setLoading, updateCardModels } from '../container/cardContainerSlice'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppRoute from '../../route/AppRoute';
import sample from '../../assets/sample.json';

type AppProps = {
    className?: string
};

const serviceKey = ''; // GET YOUR OWN KEY at https://www.data.go.kr/data/15073861/openapi.do

const AppContainer = ({ className }: AppProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.cardContainerReducer);
    const { location } = useAppSelector(state => state.appHeaderReducer.headerSelectionModel);

    const handleResponse = (carModels: Array<CardModel>) => {
        dispatch(updateCardModels(
            carModels.map((it) => {
                return {...it}
            })
        ));
        dispatch(setLoading(false));
    }

    useEffect(() => {
        dispatch(setLoading(true));
        
        var cancel = false;

        if (serviceKey) {
            const getParameters = {
                serviceKey: serviceKey,
                returnType:'json',
                numOfRows:'2000',
                pageNo:'1',
                sidoName: location,
                ver:'1.0',
            }
    
            fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
                .then(response => response.json())
                .then(data => {
                    const cardModels = data.response.body.items
                        .map((it: any) => new CardModel(it.sidoName, it.stationName, it.dataTime, it.pm10Grade, it.pm10Value))
                        
                    if (!cancel) {
                        handleResponse(cardModels);
                    }
                })    
        } else {
            const cardModels = sample.response.body.items
                .map((it: any) => new CardModel(it.sidoName, it.stationName, it.dataTime, it.pm10Grade, it.pm10Value))
                .filter((it) => location === '전국' || it.location === location)
            
            if (!cancel) {
                handleResponse(cardModels);
            }
        }

        return () => {cancel = true};
    }, [location])

    return <div className={className}>
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.ROOT} element={<Navigate to={AppRoute.MY}/>}/>
                <Route path={AppRoute.MY} element={loading? <LoadingContainer/> : <CardContainer/>}/>
                <Route path={AppRoute.ALL} element={loading? <LoadingContainer/> : <CardContainer/>}/>
                <Route path={AppRoute.FAVORITE} element={loading? <LoadingContainer/> : <CardContainer/>}/>
            </Routes>
        </BrowserRouter>
    </div>
};

export { AppContainer }
