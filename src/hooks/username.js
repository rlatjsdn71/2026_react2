import axios from "axios";
import { useState } from "react";

export function useName(){

    let [data,setData] = useState('');
    axios.get('/username.json')
    .then(r=>setData(r.data))
    .catch(()=>setData(''));
    
    return data
}