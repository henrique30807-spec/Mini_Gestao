<?php

require_once "conexao.php";

$id = $_POST["id"];
$nome = $_POST["nome"];
$preco = $_POST["preco"];
$fornecedor = $_POST["fornecedor"];

$sql = "UPDATE produtos 
        SET nome = ?, preco = ?, fornecedor_id = ?
        WHERE id = ?";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$nome, $preco, $fornecedor, $id]);

    echo "Produto alterado com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao alterar produto.";

}

?>