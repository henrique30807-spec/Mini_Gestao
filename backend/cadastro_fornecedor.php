<?php

require_once "conexao.php";

$nome = $_POST["nome"];
$cnpj = $_POST["cnpj"];

$sql = "INSERT INTO fornecedores (nome, cnpj) VALUES (?, ?)";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$nome, $cnpj]);

    echo "Fornecedor cadastrado com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao cadastrar fornecedor: " . $e->getMessage();

}

?>