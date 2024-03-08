const knex = require("../database/knex")

class BookController {

    async createBook(req, res) {

        const {user_id} = req.params
        const {title, author, category} = req.body

        const book = {
            title,
            author,
            category,
            availability: false
        }

        await knex ("books").insert({ 
            titulo: book.titulo,
            author: book.author,
            category: book.category,
            availability: book.availability,
            user_id: book.user_id
        })

        return res.status(201).json("Tarefa criada com sucesso!")
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
        return res.status(200).json("Registro deletado com sucesso")
}

}

module.exports = BookController