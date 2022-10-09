import CreateAccount from "./createAccount";
import Login from "./login";

const routes=[
    {
        path:'/createAccount',
        componet:<CreateAccount/>
    },
    {
        path:'/login',
        componet:<Login/>
    }
]


export default routes