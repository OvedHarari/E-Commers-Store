import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";


interface UsersHomeProps { }

const UsersHome: FunctionComponent<UsersHomeProps> = () => {
    let theme = useContext(SiteTheme);

    return (<div className={`container mt-3 ${theme}`}>
        <h1 className='mt-5'>After Login <br /> Basic Template!!</h1>
    </div>);
}


export default UsersHome;