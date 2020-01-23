import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/fetchHook";
import { AuthContext } from "../../context/authContext";
import { Loader } from "../../components/Loader";
import { LinkCard } from "../../components/LinkCard";

export const DetailPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState();
  const linkId = useParams<{ id: string }>().id;
  const { request, loading } = useFetch();

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(data);
    } catch (err) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);
  if (loading) {
    return <Loader />;
  }
  return <>{!loading && link && <LinkCard link={link} />}</>;
};
