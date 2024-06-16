import { useState } from 'react'

import './global.css'

function App() {
  // states
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState('');
  
    // calcular IMC (= peso/(altura x altura))
    const calculaIMC = (peso, altura) => {
        return peso / (altura * altura);
    };

    // retornar classificação, de acordo com o imc
    const retornaClassificacao = (imc) => {
      if (imc <= 18.5) {
        return "Baixo peso";
      } else if (imc > 18.5 && imc <= 24.9) {
        return "Peso normal";
      } else if (imc >= 25 && imc <= 29.9) {
        return "Sobrepeso";
      } else if (imc >= 30) {
        return "Obesidade";
      } else {
        return "";
      }
    };

    // tratar formulário para impedir comportamento padrão
    const tratarFormulario = (event) => {
      event.preventDefault();
      // tratar input: aceitar número decimal, somente valores positivos, duas casas decimais para o resultado do IMC
      // garantir que calculaIMC só roda para valores válidos
      // para valores inválidos: mensagem de alerta
      const pesoNum = parseFloat(peso);
      const alturaNum = parseFloat(altura);
      if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
        const imcValor = calculaIMC(pesoNum, alturaNum);
        setImc(imcValor.toFixed(2));
        setClassificacao(retornaClassificacao(imcValor));
      } else {
        setImc(null);
        alert('Por favor, insira valores válidos para peso e altura.')
      }
    }
  
  // construir HTML
  // ao submeter form: rodar tratamento
  // submissão acionada pelo botão calcular
  // usar prop "value={}" nos inputs para garantir que os valores sejam dinâmicos e sincronizados com o estado
  // onChange={(e) => setPeso(e.target.value)} -> atualiza o valor de peso toda vez que há um evento de mudança no campo input
  // condicional imc !== null -> quando o valor de imc não for null, mostrar a a div contendo o texto
  // usar {imc} e {classificacao} para mudança dinâmica dos valores
  return (
    <div className='container'>
      <h1>Calculadora de IMC</h1>
      <form onSubmit={tratarFormulario}>
          <label>Peso (kg):</label>
          <input type='number' placeholder='Insira o seu peso' value={peso} onChange={(e) => setPeso(e.target.value)} required step="any" />
          <label>Altura (m):</label>
          <input type='number' placeholder='Insira a sua altura' value={altura} onChange={(e) => setAltura(e.target.value)} required step="any" />
          <button type='submit'>Calcular</button>
      </form>
      {imc !== null && (
        <div>
          <h2>O seu IMC é: {imc}</h2>
          <h2>A sua classificação é: {classificacao}</h2>
        </div>
      )}
    </div>
  )
}

export default App
