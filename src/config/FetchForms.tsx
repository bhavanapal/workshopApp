import { database } from "./Firebase"
import {ref, get,} from 'firebase/database';


const FetchForms = async() => {
 
 const formsRef = ref(database, 'workshops/');
 try{
    const snapshot = await get(formsRef);
    if(snapshot.exists()){
        return snapshot.val(); //this returns a object of all forms
    } else{
        return null;
    }
 } catch (error) {
    console.error("Error fetching forms:" , error);
 }
}

export default FetchForms