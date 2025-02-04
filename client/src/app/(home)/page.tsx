"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface TwitsType {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const page = () => {
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
    <div>
      {api?.map((el) => (
        <div key={el.id}>
          {el.text}
          <button onClick={() => deletedApi(el.id)}>Delete</button>
        </div>
      ))}
      <button onClick={postApi}>Add Text</button>
    </div>
  );
};

export default page;
