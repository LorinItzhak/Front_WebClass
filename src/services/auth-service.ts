import apiClient from "./api-client";

export interface RegistrationResponseData {
    email: string;
    photo: string;
    _id: string;
}

export interface RegisterData {
    email: string;
    password: string;
    photo: string;
}

const authRegister = (registration: RegisterData) => {
    const controller = new AbortController();
    const request = apiClient.post<RegistrationResponseData>("/auth/register", 
        registration, 
        { signal: controller.signal }
    );
    return { request, cancel: () => controller.abort() };
}

export default {authRegister};
