export default abstract class User {
    abstract id: string;
    abstract email: string;
    static COLLECTION_NAME: string = 'Users'
}