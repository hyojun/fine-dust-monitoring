import { Nav } from '../nav/Nav';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import nav1 from '../../assets/nav1.svg'
import nav2 from '../../assets/nav2.svg'
import nav3 from '../../assets/nav3.svg'
import { update as updateFooterSelectionModel } from '../layout/appFooterSlice';
import { update as updateHeaderSelectionModel, headerSelectionSlice } from '../layout/appHeaderSlice';
import AppRoute from '../../route/AppRoute';
import { useMemo } from 'react';
import FooterSelectionModel from '../../model/FooterSelectionModel';
import HeaderSelectionModel from '../../model/HeaderSelectionModel';

type AppProps = {
    className?: string
};

const AppFooter = ({ className }: AppProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const { route } = useAppSelector(state => state.appFooterReducer.footerSelectionModel);
    const { loading } = useAppSelector(state => state.cardContainerReducer);
    
    const goMy = () => {
        dispatch(updateHeaderSelectionModel({...headerSelectionSlice.getInitialState().headerSelectionModel}));
        dispatch(updateFooterSelectionModel({...new FooterSelectionModel(AppRoute.MY)}));
    };
    const goAll = () => {
        dispatch(updateHeaderSelectionModel({...new HeaderSelectionModel('전국', '전체')}));
        dispatch(updateFooterSelectionModel({...new FooterSelectionModel(AppRoute.ALL)}))
    };
    const goFavorite = () => {
        dispatch(updateHeaderSelectionModel({...new HeaderSelectionModel('전국', '전체')}));
        dispatch(updateFooterSelectionModel({...new FooterSelectionModel(AppRoute.FAVORITE)}))
    };

    return useMemo(() => <div className={className}>
        <div className='flex flex-row items-end h-full'>
            <Nav className='mx-auto h-full w-full' selected={route === AppRoute.MY} image={nav1} text='내 지역보기' onClick={goMy}/>
            <Nav className='mx-auto h-full w-full' selected={route === AppRoute.ALL} image={nav2} text='전체 시도보기' onClick={goAll}/>
            <Nav className='mx-auto h-full w-full' selected={route === AppRoute.FAVORITE} image={nav3} text='즐겨찾기' onClick={goFavorite}/>
        </div>
    </div>, 
    [route, loading])
};

export { AppFooter }
