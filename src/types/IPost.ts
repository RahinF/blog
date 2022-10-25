interface IPost {
  _id: string;
  title: string;
  category: string;
  text: string;
  image?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export default IPost;
