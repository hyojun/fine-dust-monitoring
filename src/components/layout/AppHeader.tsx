import { useAppSelector, useAppDispatch } from '../../app/hooks'
import AppRoute from '../../route/AppRoute';
import { update } from './appHeaderSlice';

type AppProps = {
    className?: string
};

const AppHeader = ({ className }: AppProps): JSX.Element => {
    const dispatch = useAppDispatch();
    
    const { cardModels, loading } = useAppSelector(state => state.cardContainerReducer);
    const headerSelectionModel = useAppSelector(state => state.appHeaderReducer.headerSelectionModel);
    const { route } = useAppSelector(state => state.appFooterReducer.footerSelectionModel);

    const updateLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(update({'station': '전체', 'location': event?.target?.value}))
    };

    const updateStation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(update({'station': event?.target?.value, 'location': headerSelectionModel.location}))
    };

    const locations = ['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종']
    const stations = ['전체', ...cardModels.map((it) => it.station)];

    const showLocationSelect = route == AppRoute.MY || route == AppRoute.ALL;
    const showStationSelect = route == AppRoute.MY;

    return showLocationSelect && <div className={className}>
         <div className='flex items-center justify-center gap-x-20 h-full'>
            <select className='w-24' onChange={updateLocation} value={headerSelectionModel.location}>
                {locations.map(location => <option key={location}>{location}</option>)}
            </select>
            {showStationSelect && <select disabled={loading} className='w-24' onChange={updateStation} value={headerSelectionModel.station}>
                {stations.map(station => <option key={station}>{station}</option>)}
            </select>}
        </div>
    </div> || <></>;
};

export { AppHeader }
