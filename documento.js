const express = require('express')
const server = express()

const mysql = require('mysql2');
 
class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'fatec123',
            database: 'escola'
        });
 
        this.connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            }
            console.log('Conectado ao banco de dados MySQL.');
        });
    }
 
    gravarAluno(nome, email) {
        const query = 'INSERT INTO aluno (nome, email) VALUES (?, ?)';
        this.connection.query(query, [nome, email], (err, results) => {
            if (err) {
                console.error('Erro ao gravar aluno:', err);
                return;
            }
            console.log('Aluno gravado com sucesso. ID:', results.insertId);
        });
    }
 
    buscarAlunos() {
        const query = 'SELECT id, nome, email FROM aluno';
        this.connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar alunos:', err);
                return;
            }
            results.forEach((aluno) => {
                console.log(`ID: ${aluno.id}, Nome: ${aluno.nome}, Email: ${aluno.email}`);
            });
        });
    }
}
 
 
const db = new Database();
db.gravarAluno('Rayane Barros', 'ray@gmail.com');
db.buscarAlunos();