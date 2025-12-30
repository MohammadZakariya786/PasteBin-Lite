import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${API}/api/pastes/${id}`)
      .then(r => r.json())
      .then(d => setContent(d.content));
  }, []);

  return <pre>{content}</pre>;
}
