export default function Button({children, onClick, outlined, className}: {
    children: any,
    onClick?: any,
    outlined?: boolean,
    className?: string
}) {
    const theme = outlined ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-500 text-white'
    return <button onClick={onClick}
                   className={`${theme} rounded mt-2 px-4 py-2 ${className}`}>
        {children}
    </button>
}