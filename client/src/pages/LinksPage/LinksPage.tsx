import React, { useState, useContext, useCallback, useEffect } from "react";
import { useFetch } from "../../hooks/fetchHook";
import { AuthContext } from "../../context/authContext";
import { Loader } from "../../components/Loader";
import { LinksList } from "../../components/LinksList";

export const LinksPage: React.FC = () => {
  const [links, setLinks] = useState();
  const { loading, request } = useFetch();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const data = await request("/api/link", "GET", null, {
        Authorization: "Bearer " + token
      });
      setLinks(data);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinksList links={links} />}</>;
};
