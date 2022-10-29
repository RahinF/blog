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

export type Mode = "reply" | "edit" | "create" | "none";

export interface NewCommentProps {
  mode?: Mode;
  parentId?: string;
  fromReply?: boolean;
  commentToEdit?: { commentId: string; text: string };
  showInputBox?: React.Dispatch<React.SetStateAction<Mode>>;
}

export interface INestedComments {
  comment: IComment;
  author: string;
}

export default IComment;
