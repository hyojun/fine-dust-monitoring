import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { AppContainer } from './AppContainer';

const AppLayout = (): JSX.Element => {
    return <div className={`flex flex-col h-full`}>
        <AppHeader className='h-20'/>
        <AppContainer className='flex-1 overflow-y-scroll p-10'/>
        <AppFooter className='mt-auto h-20'/>
    </div>
};

export { AppLayout }
