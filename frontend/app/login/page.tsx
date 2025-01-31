'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormDataProp {
    
    email: string;
    password: string;
}

const BASE_URL = "http://localhost:4000/api/v1/user";

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormDataProp>({
       
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const sendSignupRequest = async () => {
            if (!isSubmitting) return;
            console.log(formData);

            try {
                setIsLoading(true);
                const response = await axios.post(
                    `${BASE_URL}/signin`,
                    formData
                );
                if(response.status === 200) {
                    const data = response.data as { token: string };
                    localStorage.setItem("token", data.token);
                  }
                console.log(response.data);
              
                setIsSubmitting(false);
            } catch (error) {
                console.error(error);
                setIsSubmitting(false);
            } finally {
                setIsLoading(false);
                router.push("/dashboard")
            }
        };

        sendSignupRequest();
    }, [isSubmitting, formData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
    };

    return (
        <div className="flex items-center justify-center h-screen bg-PrimaryBackground">
            <div className="bg-white max-w-sm shadow-lg rounded-lg px-8 py-6 w-full ">
               
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-center">Sign In</h1>
                        <p className="text-xs text-gray-500 text-center">
                            Login to your account to access all features of BeyondChats.
                        </p>

                        <Input
                            title="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            title="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`py-2 rounded-lg text-white font-semibold transition ${
                                isLoading
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isLoading ? "loggin in..." : "Login"}
                        </button>

                        <div className="flex items-center justify-center text-gray-500 text-sm">
                            Dont have an account please ?
                            <Link href="/signup" className="text-blue-500 ml-1">
                               Sign Up
                            </Link>
                        </div>
                    </form>
                
            </div>
        </div>
    );
};

export default Login;
