const form = document.getElementById('imcForm');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const resultDiv = document.getElementById('result');
const categoryDiv = document.getElementById('category');
const adviceDiv = document.getElementById('advice');

// Classificações e conselhos por faixa de IMC
const imcClassifications = {
    underweight: {
        name: 'Abaixo do peso',
        advice: 'Procure um nutricionista para melhorar sua alimentação. Incluir proteínas e exercícios de força pode ajudar.'
    },
    normal: {
        name: 'Peso normal',
        advice: 'Parabéns! Você está com um peso saudável. Mantenha uma alimentação balanceada e pratique atividades físicas regularmente.'
    },
    overweight: {
        name: 'Sobrepeso',
        advice: 'Aumentar a atividade física e revisar a alimentação podem ajudar. Consulte um profissional de saúde.'
    },
    obese: {
        name: 'Obesidade Grau I',
        advice: 'É recomendado procurar um médico ou nutricionista para orientação profissional sobre perda de peso.'
    },
    severeObese: {
        name: 'Obesidade Grau II',
        advice: 'Procure acompanhamento médico e nutricional. Mudanças nos hábitos alimentares e estilo de vida são essenciais.'
    },
    criticalObese: {
        name: 'Obesidade Grau III',
        advice: 'É fundamental procurar acompanhamento médico especializado imediatamente.'
    }
};

// Função para calcular e classificar IMC
function calculateIMC() {
    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    // Validação
    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        clearResults();
        return;
    }

    // Cálculo
    const heightM = heightCm / 100;
    const imc = weight / (heightM * heightM);

    // Classificação
    let classification, className;

    if (imc < 18.5) {
        classification = imcClassifications.underweight;
        className = 'underweight';
    } else if (imc < 25) {
        classification = imcClassifications.normal;
        className = 'normal';
    } else if (imc < 30) {
        classification = imcClassifications.overweight;
        className = 'overweight';
    } else if (imc < 35) {
        classification = imcClassifications.obese;
        className = 'obese';
    } else if (imc < 40) {
        classification = imcClassifications.severeObese;
        className = 'severe-obese';
    } else {
        classification = imcClassifications.criticalObese;
        className = 'critical-obese';
    }

    // Exibir resultados
    displayResults(imc, classification, className);
}

// Função para exibir resultados
function displayResults(imc, classification, className) {
    // IMC
    resultDiv.textContent = `IMC: ${imc.toFixed(1)}`;
    resultDiv.classList.add('show');

    // Categoria
    categoryDiv.textContent = classification.name;
    categoryDiv.className = `category show ${className}`;

    // Conselho
    adviceDiv.textContent = classification.advice;
    adviceDiv.classList.add('show');
}

// Função para limpar resultados
function clearResults() {
    resultDiv.classList.remove('show');
    categoryDiv.classList.remove('show');
    adviceDiv.classList.remove('show');
    resultDiv.textContent = '';
    categoryDiv.textContent = '';
    adviceDiv.textContent = '';
}

// Event: Submit do formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();
    calculateIMC();
});

// Event: Cálculo em tempo real (quando sai do campo)
weightInput.addEventListener('blur', calculateIMC);
heightInput.addEventListener('blur', calculateIMC);

// Event: Limpar ao resetar
form.addEventListener('reset', function () {
    setTimeout(clearResults, 0);
});

// Suporte a "enter" em qualquer campo
[weightInput, heightInput].forEach(input => {
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateIMC();
        }
    });
});