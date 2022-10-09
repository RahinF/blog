import IComment from "../../types/IComment";
import Comment from "./Comment";
import comments from "./data";
import NewComment from "./NewComment";

function createTree(list: IComment[]) {
  let comments = [];

  for (let item of list) {
    // add empty children array
    item.children = [];
  }

  for (let item of list) {
    // add child to parent comment array
    if (item.parentId) {
      const comment = list.find((element) => element.id === item.parentId);
      (comment?.children as IComment[]).push(item);
    } else {
      comments.push(item);
    }
  }

  return comments;
}

const Comments = () => {
  const commentTree = createTree(comments);

  return (
    <>
      <NewComment />
      <div>
        {commentTree.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default Comments;
