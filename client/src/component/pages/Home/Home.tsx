"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import scss from "./Home.module.scss";

interface TwitsType {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [api, setApi] = useState<TwitsType[]>([]);
  async function getApi() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/twits`
      );
      setApi(response.data);
    } catch (error) {
      console.error("Axios error:", error);
    }
  }

  async function postApi() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/twits`,
        { text: "Hello, world!" },
        {
          headers: {
            Authorization: `Bearer arsen4ik`,
          },
        }
      );
      setApi((prev) => (prev ? [...prev, response.data] : [response.data]));
    } catch (error) {
      console.error("Axios error:", error);
    }
  }

  async function deletedApi(id: string) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/twits/${id}`, {
        headers: {
          Authorization: `Bearer arsen4ik`,
        },
      });
      setApi((prev) => prev.filter((twit) => twit.id !== id));
    } catch (error) {
      console.error("Axios error:", error);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className={scss.Home}>
      <div className="container">
        <div className={scss.home}>
          <h1>Twits</h1>
          <div className={scss.twits}>
            {api.map((twit) => (
              <div className={scss.twit} key={twit.id}>
                <h4>{twit.text}</h4>
                <p className={scss.createdAt}>
                  Created at: {new Date(twit.createdAt).toLocaleDateString()}
                </p>
                <p className={scss.updatedAt}>
                  Updated at: {new Date(twit.updatedAt).toLocaleDateString()}
                </p>
                <button onClick={() => deletedApi(twit.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
