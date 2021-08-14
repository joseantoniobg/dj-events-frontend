import { api } from "@config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const strapiRes = await api
      .post(
        "auth/local/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((e) => {
        res
          .status(e.response.status)
          .json({ message: e.response.data.message[0].messages[0].message });
      });

    if (strapiRes) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", strapiRes.data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: strapiRes.data.user });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed!` });
  }
};
