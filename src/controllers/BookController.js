const knex = require("../database/knex")

class BookController {

    async createBook(req, res) {

        const {user_id} = req.params
        const {title, author, category} = req.body

        const book = {
            title,
            author,
            category,
            user_id
        
        }

        await knex ("books").insert({ 
            title: book.title,
            author: book.author,
            category: book.category,
            user_id: book.user_id
        
        })

        return res.status(201).json("Livro criado com sucesso!")
    }

    async listBook(req, res) { 
        const books = await knex("books")
            
        return res.status(200).json(books)
    }

    async listBookById(req, res) {
        const {id} = req.params

        const [book] = await knex("books").where({id})
            
        return res.status(200).json(book)
    }

    async updateBook(req, res) {
        const {id} = req.params
        const {title, author, category} = req.body

        await knex("books").where({id}).update({title, author, category})

        return res.status(200).json("Registro atualizado com sucesso!")
    }
    
    async updateBookStatus(req, res) {
        const {id} = req.params
        
        await knex("books").where({id}).update({availability: true})


        return res.status(200).json("Status atualizado com sucesso!!")
    }

    async deleteBook(req, res) {
        const {id} = req.params
        await knex("books").where({id}).delete({id})
        return res.status(200).json("Livro deletado com sucesso")
}

}

module.exports = BookController