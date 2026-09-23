<?php

require_once "conexao.php";

$sql = "SELECT id, nome, cnpj FROM fornecedores ORDER BY nome";

$stmt = $pdo->query($sql);

$fornecedores = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($fornecedores);

?>