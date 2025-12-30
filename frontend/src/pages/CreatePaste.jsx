import { useState } from "react";
import { API } from "../api";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = async () => {
    setLoading(true);
    setCopied(false);

    const res = await fetch(`${API}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const data = await res.json();
    setUrl(data.url);
    setLoading(false);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <h1 className="title">Pastebin Lite</h1>

      <textarea
        className="paste-input"
        placeholder="Write your paste here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div className="controls">
        <input
          type="number"
          placeholder="TTL (seconds)"
          onChange={e => setTtl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max views"
          onChange={e => setViews(e.target.value)}
        />
      </div>

      <div className="constraints">
        {ttl && <span>⏱ Expires in {ttl}s</span>}
        {views && <span>👁 {views} views allowed</span>}
      </div>

      <button
        className="primary-btn"
        onClick={submit}
        disabled={!content || loading}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {url && (
        <div className="result">
          <input readOnly value={url} />
          <button onClick={copyUrl}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}


// backup of previous code 

// import { useState } from "react";
// import { API } from "../api";

// export default function CreatePaste() {
//   const [content, setContent] = useState("");
//   const [ttl, setTtl] = useState("");
//   const [views, setViews] = useState("");
//   const [url, setUrl] = useState("");

//   const submit = async () => {
//     const res = await fetch(`${API}/api/pastes`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         content,
//         ttl_seconds: ttl ? Number(ttl) : undefined,
//         max_views: views ? Number(views) : undefined
//       })
//     });
//     const data = await res.json();
//     setUrl(data.url);
//   };

//   return (
//     <>
//       <textarea onChange={e => setContent(e.target.value)} />
//       <input placeholder="TTL seconds" onChange={e => setTtl(e.target.value)} />
//       <input placeholder="Max views" onChange={e => setViews(e.target.value)} />
//       <button onClick={submit}>Create</button>
//       {url && <p>{url}</p>}
//     </>
//   );
// }
