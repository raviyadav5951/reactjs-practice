import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      const createdPost = this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite DBservice :: createdPost::error", error);
    }
  }

  //not taking user id because we are giving update option to original user
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const createdPost = this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite DBservice :: updatePost::error", error);
    }
  }

  //slug is treated as document id as during createPost we use it as document id
  async deletePost(slug) {
    try {
      const removePost = await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite DBservice :: deletePost::error", error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      const postData = this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        documentId
      );
      return postData;
    } catch (error) {
      console.log("Appwrite DBservice :: getPost::error", error);
    }
  }

  async getAllPost() {
    try {
      const allPost = this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID
      );
      return allPost;
    } catch (error) {
      console.log("Appwrite DBservice :: getAllPost::error", error);
    }
  }

  async getAllActivePost(
    queries = [Query.equal("status", "active"), Query.limit(100)]
  ) {
    try {
      const allActivePost = this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        queries
      );
      return allActivePost;
    } catch (error) {
      console.log("Appwrite DBservice :: getAllPost::error", error);
      return [];
    }
  }

  //fileupload service
  async uploadFile(file) {
    try {
      const promise = this.storage.createFile(
        conf.appWriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite DBservice :: uploadFile::error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      this.storage.deleteFile(conf.appWriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite DBservice :: deleteFile::error", error);
      return false;
    }
  }

  async previewFile(fileId) {
    try {
      return this.storage.getFilePreview(conf.appWriteBucketID, fileId);
    } catch (error) {
      console.log("Appwrite DBservice :: previewFile::error", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
