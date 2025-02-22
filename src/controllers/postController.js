import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// Lấy danh sách bài viết
export const getAllPosts = async (req, res) => {
    try {
      const posts = await model.posts.findAll({ include:[{model: model.authors, as: "author"}]  });
      return responseData(res, 200, "Lấy danh sách bài viết thành công", posts);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
      return responseData(res, 500, "Lỗi khi lấy danh sách bài viết", { message: error.message, stack: error.stack });
    }
  };
  

// Tạo bài viết mới & tăng postCount của tác giả
export const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) return responseData(res, 400, "Thiếu thông tin bài viết", null);
    
    const author = await model.authors.findByPk(authorId);
    if (!author) return responseData(res, 404, "Không tìm thấy tác giả", null);
    
    const newPost = await model.posts.create({ title, content, authorId });
    
    // Tăng số lượng bài viết của tác giả
    author.postCount += 1;
    await author.save();
    
    return responseData(res, 201, "Tạo bài viết thành công", newPost);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi tạo bài viết", error);
  }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const post = await model.posts.findByPk(id);
    if (!post) return responseData(res, 404, "Không tìm thấy bài viết", null);
    
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    
    return responseData(res, 200, "Cập nhật bài viết thành công", post);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi cập nhật bài viết", error);
  }
};

// Xóa mềm bài viết
export const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await model.posts.findByPk(id);
      if (!post) return responseData(res, 404, "Không tìm thấy bài viết", null);
  
      await post.destroy(); // Xóa luôn khỏi database
  
      return responseData(res, 200, "Xóa bài viết thành công", null);
    } catch (error) {
      return responseData(res, 500, "Lỗi khi xóa bài viết", { message: error.message, stack: error.stack });
    }
  };
  
