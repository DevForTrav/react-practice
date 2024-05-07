import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

function PostEditForm() {
  const [ post, setPost ] = useState(null);
  const { id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`)
        if (response.ok) {
          const json = await response.json();
          setPost(json)
        } else {
          throw response
        }
      } catch (err) {
        setError(err)
        console.log("An error occurred:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentPost();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: post.title,
        body: post.body,
      }),
    })
    if (response.ok) {
      const { id } = await response.json();
      navigate(`/posts/${id}`)
    } else {
      console.error("An error occured.")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Edit Post</h2>
      {/* { if (error) <p>error</p> } */}
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="titleInput">Title:</label>
          <input 
            id="titleInput"
            type="text" 
            defaultValue={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            required
          />
        </div>
        <div className="">
          <label htmlFor="bodyInput">Body:</label>
          <textarea 
            id="bodyInput"
            defaultValue={post.body}
            onChange={(e) => setPost({...post, body: e.target.value})}
            required
          />
        </div>
        <div>
          <button type="submit">Save Post</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm