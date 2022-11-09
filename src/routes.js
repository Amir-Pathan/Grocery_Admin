import CreateAccount from "./createAccount";
import Login from "./login";
import Categories from "./categories";
import Products from "./products";
import AddProduct from "./addProduct";

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
    }
]


export default routes