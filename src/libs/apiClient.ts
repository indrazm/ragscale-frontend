import { cookies } from "next/headers";

interface Response<T> {
  message: string;
  error: string;
  data: T | null;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getHeader() {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionId")?.value;
    console.log({ token });

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async get<T>(path: string): Promise<Response<T>> {
    const result = {
      message: "",
      error: "",
      data: null,
    };

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: await this.getHeader(),
      });
      const data = await response.json();
      result.message = data.message;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        result.error = error.message;
      } else {
        result.error = "An error occurred";
      }
    }

    return result;
  }

  async post<T>(
    path: string,
    data: Record<string, unknown>,
  ): Promise<Response<T>> {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key] as string);
    }

    const result = {
      message: "",
      error: "",
      data: null,
    };

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: await this.getHeader(),
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();

      result.message = data.message;
      result.data = data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        result.error = error.message;
      } else {
        result.error = "An error occurred";
      }
    }

    return result;
  }
}
