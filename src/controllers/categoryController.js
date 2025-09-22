const { Category } = require('../models');
const { nanoid } = require('nanoid');

class categoryController {
  // Cria uma nova categoria
  async postCategory(req, res) {
    try {
      const { name, category } = req.body;
      const slug = nanoid(10); // Gera um slug único
      const newCategory = await Category.create({ name, category, slug });
      return res.status(201).json({ message: 'Categoria criada com sucesso.', category: newCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar categoria.', error: error.message });
    }
  }

  // Lista todas as categorias
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar categorias.', error: error.message });
    }
  }

  // Busca uma categoria por nome
  async getCategoryById(req, res) {
    try {
      const { category } = req.params;
      const foundCategory = await Category.findByPk(category);

      if (!foundCategory) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      return res.status(200).json(foundCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar categoria.', error: error.message });
    }
  }

  // Atualiza uma categoria
  async updateCategory(req, res) {
    try {
      const { category } = req.params;
      const { name, slug } = req.body;
      const [updated] = await Category.update({ name, slug }, {
        where: { category }
      });

      if (updated) {
        const updatedCategory = await Category.findByPk(category);
        return res.status(200).json({ message: 'Categoria atualizada com sucesso.', category: updatedCategory });
      }

      throw new Error('Categoria não encontrada.');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar categoria.', error: error.message });
    }
  }

  // Deleta uma categoria
  async deleteCategory(req, res) {
    try {
      const { category } = req.params;
      const deleted = await Category.destroy({
        where: { category }
      });

      if (deleted) {
        return res.status(200).json({ message: 'Categoria deletada com sucesso.' });
      }

      throw new Error('Categoria não encontrada.');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar categoria.', error: error.message });
    }
  }
}

module.exports = new categoryController();
