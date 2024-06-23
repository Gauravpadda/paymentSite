import { Appbar } from "../components/appbar";
import { UserComponent } from "../components/user";

export function Dashboard(){
    return <div>
        <Appbar/>
        
        <UserComponent />
    </div>
}