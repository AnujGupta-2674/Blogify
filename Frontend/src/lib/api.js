import { axiosInstance } from "./axios.js";

export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get(`/auth/me`);
        return response.data;
    } catch (error) {
        console.log("Error in getAuthUser:", error.message);
        return null;
    }
}

export const signup = async (signupData) => {
    const response = await axiosInstance.post(`/auth/signup`, signupData);
    return response.data;
}

export const login = async (loginData) => {
    const response = await axiosInstance.post(`/auth/login`, loginData);
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.get(`/auth/logout`);
    return response.data;
}

export const completeOnboarding = async (onboardingData) => {
    const response = await axiosInstance.post("/auth/onboarding", onboardingData);
    return response.data;
}

export const getRecommendedBlogs = async () => {
    const response = await axiosInstance.get("/blogs/recommend-blogs");
    return response.data;
}