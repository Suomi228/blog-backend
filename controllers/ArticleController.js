import ArticleModel from "../models/Article.js";
export const create = async(req, res)=>{
    try {
        
        const doc = new ArticleModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const  article = await doc.save();
        res.json(article);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось создать статью." });
    }
}