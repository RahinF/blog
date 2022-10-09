import IComment from "../../types/IComment";

const comments: IComment[] = [
  {
    id: 1,
    parentId: null,
    text: "Love this article!",
    author: "john",
  },
  {
    id: 3,
    parentId: 1,
    text: "Agreed! this article is great",
    author: "kevin",
  },
  {
    id: 2,
    parentId: 1,
    text: "What r u talking about this article is terrible...",
    author: "james",
  },
  {
    id: 5,
    parentId: null,
    text: "Sweet article! Nice job always high quality.",
    author: "steve",
  },
  {
    id: 4,
    parentId: 2,
    text: "come on, its a good article and u know it",
    author: "sarah",
  },
  {
    id: 6,
    parentId: 5,
    text: "agreed, solid content here for sure!",
    author: "jeff",
  },
];

export default comments;
