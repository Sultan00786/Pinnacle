import { prisma } from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import {hash, compare} from "bcrypt"

type CredentialType = Record<"email" | "password" | "firstName" | "lastName" | "address" | "state" | "dob", string>

export const authOption = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                },
                firstName: {
                    label: "First Name",
                    type: "text",
                    placeholder: "Enter your first name"
                },
                lastName: {
                    label: "Last Name",
                    type: "text",
                    placeholder: "Enter your last name"
                },
                address: {
                    label: "Address",
                    type: "text",
                    placeholder: "Enter your address"
                },
                state: {
                    label: "State",
                    type: "text",
                    placeholder: "Enter your state"
                },
                dob: {
                    label: "Date of Birth",
                    type: "string",
                    placeholder: "Enter your date of birth"
                }
            },
            async authorize(credentials:CredentialType|undefined) {

                // Sign Up code
                if(credentials?.firstName){
                    try {
                        const {
                            email,
                            password,
                            firstName,
                            lastName,
                            address,
                            dob,
                            state
                        } = credentials
    
                        if(!email || !password || !firstName || !lastName || !address || !dob || !state){
                            throw new Error("All fields are required !!")
                        }

                        const hashPassword = await hash(password, 10)
    
                        const user = await prisma.user.create({
                            data: {
                                email,
                                password: hashPassword,
                                firstName,
                                lastName,
                                address,
                                dateOfBirth: new Date(dob),
                                state
                            }
                        })
    
                        if(!user){
                            throw new Error("Something went wrong !!")
                        }
                        return {
                            id: user.id.toString(),
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                }

                // Login code
                else if(credentials?.email){
                    try {
                        const {email, password } = credentials
                        const user = await prisma.user.findFirst({
                            where: {
                                email: email
                            }
                        })
                        if(!user){
                            throw new Error("User not found !!")
                        }
                        const isPasswordCorrect = await compare(password, user.password)
                        if(!isPasswordCorrect){
                            throw new Error("Password is incorrect !!")
                        }
                        if(isPasswordCorrect)
                            return {
                                id: user.id.toString(),
                            }
                        return null
                    } catch (error) {
                        console.log(error)
                    }
                }

                return null
            },
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_TOKEN,
    callbacks: {
        async session({session, token}:any){
            session.user.id = token.sub
            return session
        }
    }
}