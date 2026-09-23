<?php

session_start();

require_once "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo "Usuário não está logado.";
    exit;
}

$usuario_id = $_SESSION["usuario_id"];
$produto_id = $_POST["produto_id"];

$sql = "SELECT id FROM cestas WHERE usuario_id = ? ORDER BY id DESC LIMIT 1";

$stmt = $pdo->prepare($sql);
$stmt->execute([$usuario_id]);

$cesta = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cesta) {
    echo "Crie uma cesta primeiro.";
    exit;
}

$cesta_id = $cesta["id"];

$sql = "INSERT INTO cesta_produtos (cesta_id, produto_id) VALUES (?, ?)";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$cesta_id, $produto_id]);

    echo "Produto adicionado à cesta com sucesso!";

} catch (PDOException $e) {

    echo "Produto já está na cesta ou ocorreu um erro.";

}

?>