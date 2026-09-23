<?php

require_once "conexao.php";

$sql = "
    SELECT 
        produtos.id,
        produtos.nome,
        produtos.preco,
        fornecedores.nome AS fornecedor
    FROM produtos
    INNER JOIN fornecedores
    ON produtos.fornecedor_id = fornecedores.id
";

$stmt = $pdo->query($sql);

$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($produtos);

?>