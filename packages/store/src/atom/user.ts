import { atom, useRecoilState } from "recoil";


const userState = atom({
    key:"user",
    default:{
        email : "",
        password : "",
        firstName : "",
        lastName : "",
        address : "",
        state : "",
        dateOfBirth: "",
        phoneNumber: "",
    }
})

const [user, setUser] = useRecoilState(userState);
export {user, setUser};
