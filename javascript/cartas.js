/******************************************************************************
 * Objetivo: Criar CARDS tendo como base uma API com Banco de dados 
 * Data: 29/04/2024
 * Autores: Fernando Almeida,Josivan Nascimento.
 * Versão: 1.2
 *****************************************************************************/




let offset = 0;
const limit = 100;

// Função para buscar e exibir as cartas
// Converte a resposta da API para o formato JSON


function buscarEExibirCartas() {
    const nomeCarta = document.getElementById("inputPesquisa").value;
    fetch(`https://api.pokemontcg.io/v1/cards?name=${nomeCarta}&offset=${offset}&limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar cartas.');
            }
            return response.json();
        })
        .then(data => {
            const resultado = document.getElementById("resultado");
             // Limpa o conteúdo anterior se for a primeira busca
            if (offset === 0) {
                resultado.innerHTML = "";
            }

            if (data.cards && data.cards.length > 0) {
                data.cards.forEach(carta => {
                    const img = document.createElement("img");
                    img.src = carta.imageUrl;
                    img.alt = carta.name;
                    img.classList.add("carta"); 
                    resultado.appendChild(img);
                });
                // Atualiza o offset
                offset += limit;
                 // Se houver mais cartas disponíveis, mostra o botão "Carregar Mais"
                if (data.cards.length === limit) {
                    document.getElementById("btnCarregarMais").style.display = "block";
                } else {
                    document.getElementById("btnCarregarMais").style.display = "none";
                }
            } else {
                resultado.textContent = "Nenhuma carta encontrada.";
                document.getElementById("btnCarregarMais").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Erro ao buscar cartas:', error);
            document.getElementById("resultado").textContent = "Erro ao buscar cartas.";
            document.getElementById("btnCarregarMais").style.display = "none";
        });
}
// Chama a função buscar e Exibir cartas
window.addEventListener('load', buscarEExibirCartas);
// Adiciona o evento de clique ao botão de pesquisa
document.getElementById("btnPesquisar").addEventListener("click", function () {
    offset = 0; // Reinicia o offset ao fazer uma nova pesquisa
    buscarEExibirCartas();
});
// Adiciona o evento de clique ao botão "Carregar Mais"
document.getElementById("btnCarregarMais").addEventListener("click", function () {
    buscarEExibirCartas();
});
