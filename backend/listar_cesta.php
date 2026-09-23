<?php

session_start();

require_once "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION["usuario_id"];

$sql = "SELECT produtos.id, produtos.nome, produtos.preco, fornecedores.nome AS fornecedor
        FROM cesta_produtos
        INNER JOIN cestas ON cesta_produtos.cesta_id = cestas.id
        INNER JOIN produtos ON cesta_produtos.produto_id = produtos.id
        INNER JOIN fornecedores ON produtos.fornecedor_id = fornecedores.id
        WHERE cestas.usuario_id = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$usuario_id]);

$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($produtos);

?>