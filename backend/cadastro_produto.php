<?php

require_once "conexao.php";

$nome = $_POST["nome"];
$preco = $_POST["preco"];
$fornecedor = $_POST["fornecedor"];

$sql = "INSERT INTO produtos (nome, preco, fornecedor_id) VALUES (?, ?, ?)";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$nome, $preco, $fornecedor]);

    echo "Produto cadastrado com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao cadastrar produto.";

}

?>