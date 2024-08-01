import { ClientType } from "./client";

export const refreshToken = async (client: ClientType) => {
  try {
    if (!JSON.parse(localStorage.getItem("refreshToken") as string)) return;
    const response = await fetch(`${client.SERVER_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: JSON.parse(localStorage.getItem("refreshToken") as string),
      }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("accessToken", JSON.stringify(data.metaData.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.metaData.refreshToken));
    } else throw new Error();

    const prevRefreshTime = localStorage.getItem("r");

    if (prevRefreshTime) {
      if (new Date().getTime() - JSON.parse(prevRefreshTime) <= 2000) throw new Error();
    }

    localStorage.setItem("r", JSON.stringify(new Date().getTime()));

    return response.ok;
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return false;
  }
};
