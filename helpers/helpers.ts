import { DateTime } from "luxon";
import cookie from "cookie";
import { AxiosRequestConfig } from "axios";
import { api } from "../config/index";

export const getDateAsStringDDMMYYYY = (date: FormDataEvent): string => {
  const dt = DateTime.fromISO(date);
  return dt.toFormat("dd/MM/yyyy");
};

export function parseCookies(req) {
  return cookie.parse(req ? (req.headers ? req.headers.cookie || "" : "") : "");
}

export const deleteEvent = async (id, token) => {
  if (confirm("Are you sure???")) {
    const config: AxiosRequestConfig = {
      url: `/events/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const resp = await api.request(config);
  }
};
