import ArticleModel from "../models/Article.js";
export const getAll = async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate("user", "name").exec();
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить статьи." });
  }
};
export const getOne = async (req, res) => {
  try {
    const articleId = req.params.id;

    const article = await ArticleModel.findOneAndUpdate(
      { _id: articleId },
      { $inc: { viewsCount: 1 } },
      { new: true, returnOriginal: false }
    );

    if (!article) {
      return res.status(404).json({ message: "Статья не найдена." });
    }

    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить статью." });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ArticleModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const article = await doc.save();
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось создать статью." });
  }
};
