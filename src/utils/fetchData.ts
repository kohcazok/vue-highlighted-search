export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export async function fetchComments() {
  const url = "https://jsonplaceholder.typicode.com/comments";
  return fetch(url)
    .then<Comment[]>((res) => res.json())
    .then((arr) => arr.map((c) => ({ ...c, body: c.body.slice(0, 15) })))
    .then((arr) => {
      arr.length = arr.length / 20;
      return arr;
    });
}
