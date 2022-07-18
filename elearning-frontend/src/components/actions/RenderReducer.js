import { useState } from "react";
import apiClient from "../../services/api";

export default function RenderReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);
  
    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }
  
    return [state, dispatch];
}
