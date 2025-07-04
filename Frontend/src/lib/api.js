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
    const response = await axiosInstance.post(`/auth/logout`);
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

export const getUserBlogs = async () => {
    const response = await axiosInstance.get("/blogs");
    return response.data;
}

export const postBlog = async (blogData) => {
    const response = await axiosInstance.post("/blogs/new-blog", blogData);
    return response.data;
}

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get("/users");
    console.log(response.data);
    return response.data;
}

export const getOutgoingFriendReqs = async () => {
    const response = await axiosInstance.get("/users/outgoing-friend-request");
    return response.data;
}

export const sendFriendRequest = async (userId) => {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}

export const getFriendRequests = async () => {
    const response = await axiosInstance.get(`users/friend-requests`);
    return response.data;
}

export const acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
}

export const getUserFriends = async () => {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
}
