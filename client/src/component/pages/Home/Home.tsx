"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import scss from "./Home.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface TwitsType {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [api, setApi] = useState<TwitsType[]>([]);
  const [id, setId] = useState<string>("");

  const { setValue, register, handleSubmit } = useForm<TwitsType>();

  async function getApi() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/twits`
      );
      const sorted = response.data.sort(
        (a: TwitsType, b: TwitsType) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setApi(sorted);
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
      setApi((prev) =>
        [response.data, ...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
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

  const onSubmit: SubmitHandler<TwitsType> = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/twits/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer arsen4ik`,
          },
        }
      );
      const updatedTwit = response.data;
      setApi((prev) =>
        prev
          .map((twit) => (twit.id === id ? updatedTwit : twit))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      );
      setId("");
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className={scss.Home}>
      <div className="container">
        <div className={scss.home}>
          <h1>Twits</h1>
          <div className={scss.twits}>
            {api.map((twit) =>
              id && id === twit.id ? (
                <div className={scss.twit} key={twit.id}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={scss.inputWrapper}>
                      <div className={scss.inputGroup}>
                        <input
                          type="text"
                          className={scss.input}
                          placeholder=" "
                          {...register("text")}
                        />
                        <span className={scss.bar}></span>
                      </div>
                      <button
                        type="button"
                        className={scss.btnClose}
                        onClick={() => setId("")}
                      >
                        X
                      </button>
                    </div>
                    <p className={scss.createdAt}>
                      Created at:{" "}
                      {new Date(twit.createdAt).toLocaleDateString()}
                    </p>
                    <p className={scss.updatedAt}>
                      Updated at:{" "}
                      {new Date(twit.updatedAt).toLocaleDateString()}
                    </p>
                    <button type="submit" className={scss.btnSave}>
                      Save
                    </button>
                  </form>
                </div>
              ) : (
                <div className={scss.twit} key={twit.id}>
                  <h4>{twit.text}</h4>
                  <p className={scss.createdAt}>
                    Created at: {new Date(twit.createdAt).toLocaleDateString()}
                  </p>
                  <p className={scss.updatedAt}>
                    Updated at: {new Date(twit.updatedAt).toLocaleDateString()}
                  </p>
                  <div className={scss.btns}>
                    <button onClick={() => deletedApi(twit.id)}>Delete</button>
                    <button
                      onClick={() => {
                        setValue("text", twit.text);
                        setId(twit.id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
