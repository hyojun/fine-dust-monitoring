type AppProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    selected: boolean
    image?: string
    text?: string
};

const Nav = ({ className, selected, image, text, onClick }: AppProps): JSX.Element => {
    return <button className={className} onClick={onClick}>
        <div className={`flex flex-col items-center justify-center h-full gap-y-2 ${!selected && "bg-slate-300 hover:bg-slate-200"} ${selected && "bg-white"}`}>
            <img src={image}/>
            <span>{text}</span>
        </div>
    </button>
};

export { Nav }
