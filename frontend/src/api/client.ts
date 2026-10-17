import { API_URL } from "../constants/config"

type RequestSettings = {
    method : string;
    headers : {"Content-Type": string};
    body: string | null
}

export const request = async<T>(path: string, method: string, body: unknown): Promise<T> => {
    const url = API_URL + path;
    const settings: RequestSettings = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: null,
    };
    if (body !== null){
        settings.body = JSON.stringify(body);
    }
    const response: Response = await fetch(url, settings);
    if (response.ok === false){
        throw new Error("Requuest failed with status " + response.status);
    }
    const data = (await response.json()) as T;
    return data
}