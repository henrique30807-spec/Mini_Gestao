<?php

$servidor = "localhost";
$usuario = "root";
$senha = "";

try {

    $pdo = new PDO(
        "mysql:host=$servidor;charset=utf8",
        $usuario,
        $senha
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS mini_gestao");

    $pdo->exec("USE mini_gestao");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha VARCHAR(64) NOT NULL
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cnpj VARCHAR(20) NOT NULL
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            preco DECIMAL(10,2) NOT NULL,
            fornecedor_id INT NOT NULL,
            FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
        )
    ");

    $pdo->exec("
    CREATE TABLE IF NOT EXISTS cestas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS cesta_produtos (
            cesta_id INT NOT NULL,
            produto_id INT NOT NULL,
            PRIMARY KEY (cesta_id, produto_id),
            FOREIGN KEY (cesta_id) REFERENCES cestas(id) ON DELETE CASCADE,
            FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
        )
    ");

    echo "Banco de dados e tabelas criados com sucesso!";

} catch (PDOException $e) {

    echo "Erro: " . $e->getMessage();

}

?>