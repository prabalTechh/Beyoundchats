'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormDataProp {
    name: string;
    email: string;
    password: string;
}

const BASE_URL = "https://beyoundchats.onrender.com/api/v1/user";

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormDataProp>({
        name: "",
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [otp, setOTP] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const sendSignupRequest = async () => {
            if (!isSubmitting) return;
            console.log(formData);

            try {
                setIsLoading(true);
                const response = await axios.post(
                    `${BASE_URL}/signup`,
                    formData
                );
                console.log(response.data);
                setShowOTPVerification(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error(error);
                setIsSubmitting(false);
            } finally {
                setIsLoading(false);
            }
        };

        sendSignupRequest();
    }, [isSubmitting, formData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    const handleOTPVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/verify-otp`, {
                email: formData.email,
                otp: otp,
            });
            console.log(response.data);
            router.push("/login");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-PrimaryBackground">
            <div className="bg-white max-w-sm shadow-lg rounded-lg px-8 py-6 w-full ">
                {!showOTPVerification ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                        <p className="text-sm text-gray-500 text-center">
                            Create an account to access all features of BeyondChats.
                        </p>

                        <Input
                            title="Your Name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
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
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </button>

                        <div className="flex items-center justify-center text-gray-500 text-sm">
                            Already have an account?
                            <Link href="/login" className="text-blue-500 ml-1">
                                Log In
                            </Link>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
                        <p className="text-sm text-gray-500 text-center">
                            Enter the OTP sent to {formData.email}
                        </p>

                        <Input
                            title="OTP"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleOTPVerification}
                            className={`py-2 rounded-lg text-white font-semibold transition ${
                                isLoading
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isLoading ? "Verifying OTP..." : "Verify OTP"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
