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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Fetches the list of twits from the server and updates the state.
 * If the request fails, logs the error to the console.
 */

/******  845529b2-ed93-405a-8b82-fc00ceefa6aa  *******/
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


/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Posts a new twit to the server
   * @returns {void}
   */
/******  440316c8-8ea5-4111-b135-eda5142122b7  *******/
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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a twit by its ID from the server and updates the local state.
 *
 * @param id - The unique identifier of the twit to be deleted.
 */

/******  a115c3ca-58c2-4a79-b421-d5a062689fbe  *******/
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
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the form submission to update a twit on the server.
 *
 * @param data - The data to update the twit with, adhering to the TwitsType structure.
 * Sends a PATCH request to the API to update the twit identified by the current `id`.
 * Upon success, clears the `id` state.
 */

/******  6cb185f6-29d2-4f15-8379-42cf4cebf278  *******/

  const onSubmit: SubmitHandler<TwitsType> = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/twits/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer arsen4ik`,
        },
      }
    );
    setId("");
  };

  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className={scss.Home}>
      <div className="container">
        <div className={scss.home}>
          <h1>Twits </h1>
          <div className={scss.twits}>
            {api.map((twit) => (
              <div className={scss.twit} key={twit.id}>
                {id == twit.id ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      {...register("text", { required: true })}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <h4>{twit.text}</h4>
                )}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
