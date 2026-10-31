import { API_URL } from "../constants/config"

export const request = async<T>(path: string, method: string, body: unknown): Promise<T> => {
    const url = API_URL + path;
    const settings: RequestInit = {
        method: method,
        headers: { "Content-Type": "application/json" },
    };
    if (body !== null){
        settings.body = JSON.stringify(body);
    }
    const response: Response = await fetch(url, settings);
    if (response.ok === false){
        throw new Error("Request failed with status " + response.status);
    }
    const data = (await response.json()) as T;
    return data
}