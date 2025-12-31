import { useState } from "react";
import { API } from "../api";

export default function CreatePaste() {
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = async () => {
  if (!content.trim()) return;

  if (ttl && Number(ttl) < 1) {
    alert("TTL must be at least 1 second");
    return;
  }

  if (views && Number(views) < 1) {
    alert("Max views must be at least 1");
    return;
  }
  setUrl("");
  setLoading(true);
  setCopied(false);

  try {
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

    if (!res.ok) {
      alert(data.error || "Failed to create paste");
      setLoading(false);
      return;
    }

    setUrl(data.url);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  } catch (err) {
    alert("Network error");
  } finally {
    setLoading(false);
  }
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
          min="1"
          step="1"
          placeholder="TTL (seconds)"
          onChange={e => setTtl(e.target.value)}
        />
        <input
          type="number"
          min="1"
          step="1"
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
        <div className="result fade-in">
          {success && <p className="success-text">✅ Paste created successfully!</p>}

          <input readOnly value={url}  onFocus={e => e.target.select()} />

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
