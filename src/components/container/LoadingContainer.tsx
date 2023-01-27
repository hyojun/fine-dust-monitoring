import { useEffect, useState } from 'react';

import spinner from "../../assets/spinner.svg";

type AppProps = {
};

const LoadingContainer = ({}: AppProps): JSX.Element => {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        var count = 0;
        const id = setInterval(() => {
            count = (count + 1) % 12;
            setAngle((30 * count));
        }, 100)
        return () => clearInterval(id);
    }, [])

    return <div className='h-full flex items-center justify-center'>
        <img src={spinner} style={{ transform: `rotate(${angle}deg)`}}/>
    </div>
};

export { LoadingContainer }
