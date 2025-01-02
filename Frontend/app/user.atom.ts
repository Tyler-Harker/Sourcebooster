import { atom } from "recoil";
import IUser from "../../Models/user";



export const userAtom = atom<IUser | undefined>({
    key: 'user',
    default: undefined
})