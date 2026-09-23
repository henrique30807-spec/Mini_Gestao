<?php

require_once "conexao.php";

$id = $_POST["id"];

$sql = "DELETE FROM produtos WHERE id = ?";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$id]);

    echo "Produto excluído com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao excluir produto.";

}

?>