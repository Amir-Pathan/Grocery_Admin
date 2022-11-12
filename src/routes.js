import CreateAccount from "./createAccount";
import Login from "./login";
import Categories from "./categories";
import Products from "./products";
import AddProduct from "./addProduct";
import Orders from "./orders";

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
    },
    {
        path:"/products",
        componet:<Products/>
    },
    {
        path:'/addproduct/:id',
        componet:<AddProduct/>
    },
    {
        path:'/orders',
        componet:<Orders/>
    }
]


export default routes