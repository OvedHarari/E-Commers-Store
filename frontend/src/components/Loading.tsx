import { FunctionComponent } from "react";

interface LoadingProps {
}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <>
            <div className="spinner-border loading ms-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </>
    )
}

export default Loading;