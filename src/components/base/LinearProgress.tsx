export default function LinearProgress({progress, className}: { progress: number, className?: string }) {
    return (
        <div className={"w-full h-1 bg-blue-100 " + className}>
            <div className="h-full bg-blue-500 transition-all" style={{width: progress + '%'}}/>
        </div>
    )
}