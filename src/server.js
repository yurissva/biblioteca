const express = require('express');
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes)

let livros = [];
let usuarios = [];

// novo livro
app.post("/livros", (req, res) => {
    const { titulo, autor, categoria } = req.body;
    const novoLivro = {
        id: uuidV4(),
        titulo,
        autor,
        categoria,
        disponibilidade: true
    };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});
app.get("/livros", (req, res) => {
    return res.status(200).json(livros);
});

//cadastrar um novo usuário
app.post("/usuarios", (req, res) => {
    const { nome, email, telefone } = req.body;
    const novoUsuario = {
        id: uuidV4(),
        nome,
        email,
        telefone,
        dataCadastro: new Date(),
        livrosEmprestados: []
    };
    usuarios.push(novoUsuario);
    return res.status(201).json(novoUsuario);
});
app.get("/usuarios", (req, res) => {
    return res.status(200).json(usuarios);
});

//empréstimo de livro
app.patch("/emprestimos/:id_livro", (req, res) => {
    const { id_livro } = req.params;
    const { nome } = req.headers;
    
  
    const usuario = usuarios.find(usuario => usuario.nome === nome);
    if (!usuario) {
        return res.status(400).json("Usuário não encontrado");
    }
    
    req.usuario = usuario
    
    const livro = livros.find(livro => livro.id === id_livro);
    if (!livro) {
        return res.status(400).json("Livro não encontrado");
    }
    
  
    if (usuario.livrosEmprestados.length >= 3) {
        return res.status(400).json("Limite de empréstimos atingido");
    }
    
   
    if (!livro.disponibilidade) {
        return res.status(400).json("Livro indisponível");
    }
    
    
    usuario.livrosEmprestados.push(livro);
    livro.disponibilidade = false;
    
    return res.status(200).json("Empréstimo realizado com sucesso!");
});
    //devolução de livro//
app.patch("/devolucao/:id_livro", (req, res) => {
        const { id_livro } = req.params;
        const { nome } = req.headers;
    
        const usuario = usuarios.find(u => u.nome === nome);
    
        if (!usuario) {
            return res.status(400).json("Usuário não encontrado");
        }
    
        const livro = livros.find(l => l.id === id_livro);
    
        if (!livro) {
            return res.status(400).json("Livro não encontrado!");
        }
    
        const indexLivro = usuario.livrosEmprestados.findIndex(l => l.id === id_livro);
    
        if (indexLivro === -1) {
            return res.status(400).json("Você não tem o livro na lista de empréstimos!");
        }
    
        usuario.livrosEmprestados.splice(indexLivro, 1);
        livro.disponibilidade = true;
    
        return res.status(200).json("Devolução realizada! Livro disponível novamente!");
});
    //consulta de livro//
app.get("/consulta", (req, res) => {
    const {titulo, autor, categoria} = req.query

    if(titulo){
        result = livros.filter(livro => livro.titulo.includes(titulo))
    }
    if(autor){
        result = livros.filter(livro => livro.autor.includes(autor)) 
    }
    if(categoria){
        result = livros.filter(livro => livro.categoria.includes(categoria)) 
    }
    return res.status(200).json(result)
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo deu errado!")
})

const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

