import React from "react";

interface LinkProps {
  link: Link;
}

interface Link {
  from: string;
  to: string;
  clicks: number;
  data: string;
}

export const LinkCard: React.FC<LinkProps> = ({ link }) => {
  console.log(link);
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of creation: <strong>{new Date(link.data).toDateString()} </strong>
      </p>
    </>
  );
};
