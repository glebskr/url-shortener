import React, { useState, useContext } from "react";
import { useFetch } from "../../hooks/fetchHook";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

export const CreatePage: React.FC = () => {
  const history = useHistory();
  const [link, setLink] = useState<string>("");
  const { request } = useFetch();
  const auth = useContext(AuthContext);

  const pressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: "Bearer " + auth.token
          }
        );
        console.log(data);
        history.push(`detail/${data.link._id}`);
      } catch (err) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field ">
          <input
            placeholder="Enter a link"
            id="link"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
            onKeyPress={pressHandler}
            name="email"
            className="validate"
            value={link}
          />
          <label htmlFor="lin">Enter a link</label>
        </div>
      </div>
    </div>
  );
};
