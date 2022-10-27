import IUser from "./IUser";

interface IComment {
  _id: string;
  postId: string;
  parentId?: string;
  author: IUser | string;
  children?: IComment[];
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
