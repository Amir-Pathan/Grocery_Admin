import CreateAccount from "./createAccount";
import Login from "./login";
import Categories from "./categories";

const routes=[
    {
        path:'/createAccount',
        componet:<CreateAccount/>
    },
    {
        path:'/login',
        componet:<Login/>
    },
    {
        path:'/categories',
        componet:<Categories/>
    }
]


export default routes