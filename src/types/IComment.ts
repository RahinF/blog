interface IComment {
  id: number;
  parentId: number | null;
  text: string;
  author: string;
  children?: IComment[];
}

export default IComment;
