import { createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems:  localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState:  initialState,
    reducers: {

        addToCart: (state, action) => {
            const course = action.payloadconst
            const index = state.cart.findIndex( (item) => item._id === course._id)

            if(index>=0){
                // if index is valid integer means it already exist in cart
                toast.error("Course already in cart")
                return
            }

            // if course is not in cart
            state.cart.push(course);

            // update total items
            state.totalItems++
            state.total +=course.price

            localStorage.setItem( "cart", JSON.stringify(state.cart))
            localStorage.setItem( "total", JSON.stringify(state.total))
            localStorage.setItem( "totalItems", JSON.stringify(state.totalItems))

            toast.success("Course added to cart");
        },

        removeFromCart: (state, action) => {

            const courseId = action.payloadconst
            const index = state.cart.findindex( (item) => item._id === courseId)

            if(index>=0){
                // it exist in cart so we can remove it

                state.totalItems--;
                state.total -= state.cat[index].price

                state.cart.splice(index, 1)                
            }else{
                toast.error("Course not exist in cart")
                return
            }


            localStorage.setItem( "cart", JSON.stringify(state.cart))
            localStorage.setItem( "total", JSON.stringify(state.total))
            localStorage.setItem( "totalItems", JSON.stringify(state.totalItems))

            toast.success("Course removed to cart");
        },

        resetCart: (state, action) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.setItem( "cart", JSON.stringify(state.cart))
            localStorage.setItem( "total", JSON.stringify(state.total))
            localStorage.setItem( "totalItems", JSON.stringify(state.totalItems))

            toast.success("Cart reset successfully");            
        }
    }
});

export const  {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;