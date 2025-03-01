import apiClient from "./api-client";

export interface RegistrationResponseData {
    username: string;
    password: string;
    email: string;
    photo: string;
    _id: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    photo: string;
}

const authRegister = (registration: RegisterData) => {
    const controller = new AbortController();
    const request = apiClient.post<RegistrationResponseData>("/users/register", 
        registration, 
        { signal: controller.signal }
    );
    return { request, cancel: () => controller.abort() };
}

const authGoogleLogin = () => {
    window.location.href = "http://localhost:3003/users/google"; // הפניה ישירה לאימות
};

export default { authRegister, authGoogleLogin };
