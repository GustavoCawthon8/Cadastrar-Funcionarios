async function carregarFuncionarios() {
  try {
    const resposta = await fetch("https://funcionarios-api-kohl.vercel.app/mostrar");
    const funcionarios = await resposta.json();

    const tabela = document.getElementById("funcionariosList");
    tabela.innerHTML = "";

    funcionarios.forEach(func => {
      const linha = `<tr class="border border-gray-300">
        <td class="border border-gray-300 py-2">${func.nome}</td>
        
        <td class="border border-gray-300 py-2"> ${func.idade}</td>
          
         <td class="border border-gray-300 py-2" > ${func.cargo}
            </td>
            
         <td class="border border-gray-300 py-2" > R$ ${func.salario}
            </td>
            </tr>`;

      tabela.innerHTML += linha
    })
  } catch (err) {
    console.log(err)
  }
}

document.getElementById("formCadastro").addEventListener("submit", async(e)=>{
  e.preventDefault();
  
  const nome = document.getElementById("nome").value
  const idade = document.getElementById("idade").value
  const cargo = document.getElementById("cargo").value
  const salario = document.getElementById("salario").value
  
  try{
    const resposta = await fetch("https://funcionarios-api-kohl.vercel.app/cadastrar", {
      method: "POST",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({
        nome,
        idade,
        cargo,
        salario
      })
    });
    
    const data = await resposta.json();
    alert(data.mensagem);
    
    carregarFuncionarios();
    document.getElementById("formCadastro").reset()
    
  }catch(err){
    console.log(err);
  }
})

carregarFuncionarios()
