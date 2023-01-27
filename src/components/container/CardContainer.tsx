import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks'
import CardModel from '../../model/CardModel';
import AppRoute from '../../route/AppRoute';
import { Card } from '../card/Card'

type AppProps = {
};

const CardContainer = ({}: AppProps): JSX.Element => {
    const navigate = useNavigate();
    const cardModels = useAppSelector(state => state.cardContainerReducer.cardModels)
    const { station } = useAppSelector(state => state.appHeaderReducer.headerSelectionModel);
    const { route } = useAppSelector(state => state.appFooterReducer.footerSelectionModel);
    const favoriteModelMap = new Map(useAppSelector(state => state.cardReducer.favoriteModels)
        .map((it) => [it.key, it.checked]))

    const showFavorite = route != AppRoute.MY;

    useEffect(() => {
        navigate(route, {replace: true});
    }, [route])

    const filter = (model: CardModel) => {
        switch (route) {
            case AppRoute.MY: 
                return station === '전체' || model.station === station;
            case AppRoute.ALL:
                return true;
            case AppRoute.FAVORITE: 
                return favoriteModelMap.get(model.key);
        }
    };

    return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center'>
        {cardModels
            .filter(filter)
            .map(cardModel => 
                <Card
                    key={cardModel.key}
                    cardModel={cardModel}
                    showFavorite={showFavorite}/>)}
    </div>
};

export { CardContainer }
