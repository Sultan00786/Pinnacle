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

const stepState = atom({
    key:"step",
    default:1
})

const [user, setUser] = useRecoilState(userState);
const [step, setStep] = useRecoilState(stepState);

export {user, step, setUser, setStep};
