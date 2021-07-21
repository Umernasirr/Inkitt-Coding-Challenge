export interface IComment {
    _id: number;
    message: String;
    userName: String;
    createdAt: String;
    likes: number;
    replies: IComment[];
}
