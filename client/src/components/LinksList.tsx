import React from "react";
import { Link as RouteLink } from "react-router-dom";

interface ListProps {
  links: Link[];
}

interface Link {
  _id: string;
  from: string;
  to: string;
}

export const LinksList: React.FC<ListProps> = props => {
  if (!props.links) return <p className="center">Links list is empty</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Shortned</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {props.links.map((val, i) => {
          return (
            <tr key={val._id}>
              <td>{i + 1}</td>
              <td>{val.from}</td>
              <td>{val.to}</td>
              <td>
                <RouteLink to={"/detail/" + val._id}> Open </RouteLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
