import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// Lấy danh sách tác giả
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await model.authors.findAll();
    return responseData(res, 200, "Lấy danh sách tác giả thành công", authors);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi lấy danh sách tác giả", error);
  }
};

// Tạo tác giả mới
export const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return responseData(res, 400, "Tên không được để trống", null);
    
    const newAuthor = await model.authors.create({ name });
    return responseData(res, 201, "Tạo tác giả thành công", newAuthor);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi tạo tác giả", error);
  }
};

// Cập nhật tác giả
export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const author = await model.authors.findByPk(id);
    if (!author) return responseData(res, 404, "Không tìm thấy tác giả", null);
    
    author.name = name || author.name;
    await author.save();
    
    return responseData(res, 200, "Cập nhật tác giả thành công", author);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi cập nhật tác giả", error);
  }
};

// Xóa mềm tác giả
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await model.authors.findByPk(id);
    
    if (!author) return responseData(res, 404, "Không tìm thấy tác giả", null);
    
    await author.destroy();
    return responseData(res, 200, "Xóa tác giả thành công", null);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi xóa tác giả", error);
  }
};
