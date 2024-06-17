export default function Icon({style: _style, className: _className, filled: _filled, style, onClick, ...rest}: {
    style?: string,
    className?: string,
    filled?: boolean
} & any = {}) {
    const className = _className || ''
    const filled = _filled ? 'filled' : 'outlined'
    const name = Object.keys(rest)[0]
    return <span {...{...rest, [name]: undefined}}
                 className={`material-symbols material-symbols-${filled} ${className} select-none`}
                 style={style} onClick={onClick}>{name}</span>
}