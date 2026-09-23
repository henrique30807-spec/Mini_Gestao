let cesta = [];
let linhaEditando = null;

document
  .getElementById("formLogin")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    entrarSistema();
  });

function mostrarMensagem(mensagem) {
  let mensagemBox = document.getElementById("mensagem");

  if (mensagemBox) {
    mensagemBox.textContent = mensagem;
    mensagemBox.style.display = "block";

    setTimeout(function () {
      mensagemBox.style.display = "none";
    }, 3000);
  } else {
    alert(mensagem);
  }
}

function mostrarTela(tela) {
  document.getElementById("login").classList.add("d-none");
  document.getElementById("cadastro").classList.add("d-none");
  document.getElementById("sistema").classList.add("d-none");

  document.getElementById(tela).classList.remove("d-none");
}

function cadastrarUsuario() {
  let nome = document.getElementById("cadastroNome").value;
  let email = document.getElementById("cadastroEmail").value;
  let senha = document.getElementById("cadastroSenha").value;
  let confirmar = document.getElementById("cadastroConfirmar").value;

  if (senha !== confirmar) {
    alert("As senhas não são iguais.");
    return;
  }

  let dados = new FormData();

  dados.append("nome", nome);
  dados.append("email", email);
  dados.append("senha", senha);

  fetch("../backend/cadastro_usuario.php", {
    method: "POST",
    body: dados,
  })
    .then((response) => response.text())
    .then((resultado) => {
      alert(resultado);

      if (resultado.includes("Usuário cadastrado com sucesso")) {
        document.getElementById("formCadastro").reset();
        mostrarTela("login");
      }
    })
    .catch((erro) => {
      console.log(erro);
      alert("Erro ao conectar com o servidor.");
    });
}

function mostrarArea(area) {
  document.getElementById("area-gestao").classList.add("d-none");
  document.getElementById("area-produtos").classList.add("d-none");
  document.getElementById("area-fornecedores").classList.add("d-none");
  document.getElementById("area-cesta").classList.add("d-none");

  document.getElementById("area-" + area).classList.remove("d-none");

  let botoes = document.querySelectorAll(".menu-btn");

  botoes.forEach((botao) => {
    botao.classList.remove("ativo");
  });

  if (area === "gestao") {
    botoes[0].classList.add("ativo");
  }

  if (area === "produtos") {
    botoes[1].classList.add("ativo");
  }

  if (area === "fornecedores") {
    botoes[2].classList.add("ativo");
  }

  if (area === "cesta") {
    botoes[3].classList.add("ativo");
  }
}

document
  .getElementById("formCadastro")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    cadastrarUsuario();
  });

function carregarFornecedores() {
  fetch("../backend/listar_fornecedores.php")
    .then((response) => response.json())
    .then((fornecedores) => {
      let select = document.getElementById("fornecedorProduto");

      select.innerHTML = '<option value="">Selecione um fornecedor</option>';

      fornecedores.forEach((fornecedor) => {
        let opcao = document.createElement("option");

        opcao.value = fornecedor.id;
        opcao.textContent = fornecedor.nome;

        select.appendChild(opcao);
      });
      let tabela = document.getElementById("tabelaFornecedores");

      if (tabela) {
        tabela.innerHTML = "";

        fornecedores.forEach((fornecedor) => {
          let linha = tabela.insertRow();

          linha.innerHTML =
            "<td>" +
            String(fornecedor.id).padStart(3, "0") +
            "</td>" +
            "<td>" +
            fornecedor.nome +
            "</td>" +
            "<td>" +
            fornecedor.cnpj +
            "</td>";
        });
      }
    })
    .catch((erro) => {
      console.log(erro);
      mostrarMensagem("Erro ao carregar fornecedores.");
    });
}

function carregarProdutos() {
  fetch("../backend/listar_produtos.php")
    .then((response) => response.json())
    .then((produtos) => {
      let tabela = document.getElementById("tabelaProdutos");

      tabela.innerHTML = "";

      produtos.forEach((produto) => {
        let linha = tabela.insertRow();

        linha.dataset.id = produto.id;

        linha.innerHTML =
          "<td>" +
          String(produto.id).padStart(3, "0") +
          "</td>" +
          "<td>" +
          produto.nome +
          "</td>" +
          "<td>R$ " +
          Number(produto.preco).toFixed(2).replace(".", ",") +
          "</td>" +
          "<td>" +
          produto.fornecedor +
          "</td>" +
          "<td>" +
          "<div class='botoes-acao'>" +
          "<button class='acao' onclick='editarProduto(this)'>Editar</button>" +
          "<button class='acao excluir' onclick='excluirProduto(this)'>Excluir</button>" +
          "</div>" +
          "</td>";
      });

      let tabelaSelecao = document.getElementById("tabelaSelecaoProdutos");

      if (tabelaSelecao) {
        tabelaSelecao.innerHTML = "";

        produtos.forEach((produto) => {
          let linha = tabelaSelecao.insertRow();

          linha.innerHTML =
            "<td><input type='checkbox' class='produto-check' " +
            "data-id='" +
            produto.id +
            "' " +
            "data-nome='" +
            produto.nome +
            "' " +
            "data-preco='" +
            produto.preco +
            "'></td>" +
            "<td>" +
            produto.nome +
            "</td>" +
            "<td>" +
            produto.fornecedor +
            "</td>" +
            "<td>R$ " +
            Number(produto.preco).toFixed(2).replace(".", ",") +
            "</td>";
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao carregar produtos:", erro);
      alert("Erro ao carregar produtos: " + erro);
    });
}

function cadastrarProduto() {
  let nome = document.getElementById("nomeProduto").value;
  let preco = document.getElementById("precoProduto").value;
  let fornecedor = document.getElementById("fornecedorProduto").value;

  if (nome === "" || preco === "" || fornecedor === "") {
    mostrarMensagem("Preencha todos os campos do produto.");
    return;
  }

  if (linhaEditando !== null) {
    let dados = new FormData();

    dados.append("id", linhaEditando.dataset.id);
    dados.append("nome", nome);
    dados.append("preco", preco);
    dados.append("fornecedor", fornecedor);

    fetch("../backend/editar_produto.php", {
      method: "POST",
      body: dados,
    })
      .then((response) => response.text())
      .then((resultado) => {
        if (resultado.includes("sucesso")) {
          mostrarMensagem("Produto alterado com sucesso!");

          linhaEditando = null;

          document.getElementById("nomeProduto").value = "";
          document.getElementById("precoProduto").value = "";
          document.getElementById("fornecedorProduto").selectedIndex = 0;

          carregarProdutos();
        } else {
          mostrarMensagem("Erro ao alterar produto.");
        }
      })
      .catch((erro) => {
        console.log(erro);
        mostrarMensagem("Erro ao conectar com o servidor.");
      });

    return;
  }

  let dados = new FormData();

  dados.append("nome", nome);
  dados.append("preco", preco);
  dados.append("fornecedor", fornecedor);

  fetch("../backend/cadastro_produto.php", {
    method: "POST",
    body: dados,
  })
    .then((response) => response.text())
    .then((resultado) => {
      if (resultado.includes("sucesso")) {
        mostrarMensagem("Produto cadastrado com sucesso!");

        document.getElementById("nomeProduto").value = "";
        document.getElementById("precoProduto").value = "";
        document.getElementById("fornecedorProduto").selectedIndex = 0;

        carregarProdutos();
      } else {
        mostrarMensagem("Erro ao cadastrar produto.");
      }
    })
    .catch((erro) => {
      console.log(erro);
      mostrarMensagem("Erro ao conectar com o servidor.");
    });
}

function editarProduto(botao) {
  linhaEditando = botao.closest("tr");

  let id = linhaEditando.dataset.id;
  let nome = linhaEditando.cells[1].textContent;
  let preco = linhaEditando.cells[2].textContent;
  let fornecedor = linhaEditando.cells[3].textContent;

  document.getElementById("nomeProduto").value = nome;

  preco = preco.replace("R$", "").trim();
  preco = preco.replace(".", "");
  preco = preco.replace(",", ".");

  document.getElementById("precoProduto").value = preco;

  let select = document.getElementById("fornecedorProduto");

  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text === fornecedor) {
      select.selectedIndex = i;
      break;
    }
  }

  linhaEditando.dataset.id = id;

  document.getElementById("nomeProduto").focus();

  mostrarMensagem("Produto carregado para edição.");
}

function excluirProduto(botao) {
  let linha = botao.closest("tr");
  let id = linha.dataset.id;

  if (confirm("Deseja realmente excluir este produto?")) {
    let dados = new FormData();

    dados.append("id", id);

    fetch("../backend/excluir_produto.php", {
      method: "POST",
      body: dados,
    })
      .then((response) => response.text())
      .then((resultado) => {
        if (resultado.includes("sucesso")) {
          linha.remove();
          mostrarMensagem("Produto excluído com sucesso!");
          carregarProdutos();
        } else {
          mostrarMensagem("Erro ao excluir produto.");
        }
      })
      .catch((erro) => {
        console.log(erro);
        mostrarMensagem("Erro ao conectar com o servidor.");
      });
  }
}

function adicionarCesta() {
  let produtosSelecionados = document.querySelectorAll(
    ".produto-check:checked",
  );

  if (produtosSelecionados.length === 0) {
    alert("Selecione pelo menos um produto.");
    return;
  }

  let promessas = [];

  produtosSelecionados.forEach((produto) => {
    let dados = new FormData();

    dados.append("produto_id", produto.dataset.id);

    let promessa = fetch("../backend/adicionar_cesta.php", {
      method: "POST",
      body: dados,
    })
      .then((response) => response.text())
      .then((resultado) => {
        console.log(resultado);
      });

    promessas.push(promessa);
  });

  Promise.all(promessas)
    .then(() => {
      carregarCesta();
      alert("Produtos adicionados à cesta!");
    })
    .catch((erro) => {
      console.log(erro);
      alert("Erro ao adicionar produtos à cesta.");
    });
}

function carregarCesta() {
  fetch("../backend/listar_cesta.php")
    .then((response) => response.json())
    .then((produtos) => {
      cesta = produtos;
      let tabela = document.getElementById("tabelaCesta");

      tabela.innerHTML = "";

      let total = 0;

      produtos.forEach((produto) => {
        let linha = tabela.insertRow();

        linha.innerHTML =
          "<td>" +
          produto.nome +
          "</td>" +
          "<td>" +
          produto.fornecedor +
          "</td>" +
          "<td>R$ " +
          Number(produto.preco).toFixed(2).replace(".", ",") +
          "</td>" +
          "<td>1</td>";

        total += Number(produto.preco);
      });

      document.getElementById("totalProdutos").textContent = produtos.length;

      document.getElementById("valorTotal").textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
    })
    .catch((erro) => {
      console.log("Erro ao carregar cesta:", erro);
    });
}

function finalizarPedido() {
  if (cesta.length === 0) {
    mostrarMensagem("A cesta está vazia.");
    return;
  }

  mostrarMensagem("Pedido finalizado com sucesso!");
}

function cadastrarFornecedor() {
  let nome = document.getElementById("nomeFornecedor").value;
  let cnpj = document.getElementById("cnpjFornecedor").value;

  if (nome === "" || cnpj === "") {
    mostrarMensagem("Preencha todos os campos do fornecedor.");
    return;
  }

  let dados = new FormData();

  dados.append("nome", nome);
  dados.append("cnpj", cnpj);

  fetch("../backend/cadastro_fornecedor.php", {
    method: "POST",
    body: dados,
  })
    .then((response) => response.text())
    .then((resultado) => {
      if (resultado.includes("sucesso")) {
        mostrarMensagem("Fornecedor cadastrado com sucesso!");

        document.getElementById("nomeFornecedor").value = "";
        document.getElementById("cnpjFornecedor").value = "";

        carregarFornecedores();
        carregarProdutos();
      } else {
        mostrarMensagem("Erro ao cadastrar fornecedor.");
      }
    })
    .catch((erro) => {
      console.log(erro);
      mostrarMensagem("Erro ao conectar com o servidor.");
    });
}

function entrarSistema() {
  let email = document.getElementById("loginEmail").value;
  let senha = document.getElementById("loginSenha").value;

  let dados = new FormData();

  dados.append("email", email);
  dados.append("senha", senha);

  fetch("../backend/login.php", {
    method: "POST",
    body: dados,
  })
    .then((response) => response.text())
    .then((resultado) => {
      if (resultado.includes("Login realizado com sucesso")) {
        mostrarTela("sistema");
      } else {
        alert(resultado);
      }
    })
    .catch((erro) => {
      console.log(erro);
      alert("Erro ao conectar com o servidor.");
    });
}

function criarCesta() {
  let nome = document.getElementById("nomeCesta").value;

  if (nome === "") {
    alert("Digite o nome da cesta.");
    return;
  }

  let dados = new FormData();

  dados.append("nome", nome);

  fetch("../backend/criar_cesta.php", {
    method: "POST",
    body: dados,
  })
    .then((response) => response.text())
    .then((resultado) => {
      alert(resultado);

      if (resultado.includes("sucesso")) {
        document.getElementById("nomeCesta").value = "";
      }
    })
    .catch((erro) => {
      console.log(erro);
      alert("Erro ao conectar com o servidor.");
    });
}

console.log("SCRIPT CARREGADO");

document
  .getElementById("formCadastro")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    console.log("FORMULARIO DE CADASTRO FOI ENVIADO");
    cadastrarUsuario();
  });

window.onload = function () {
  carregarFornecedores();
  carregarProdutos();
  carregarCesta();
};

function sair() {
  fetch("../backend/logout.php")
    .then((response) => response.text())
    .then((resultado) => {
      alert(resultado);
      mostrarTela("login");
    })
    .catch((erro) => {
      console.log(erro);
      alert("Erro ao sair do sistema.");
    });
}
