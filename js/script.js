/**
 * Lógica de interação para o site da Gabi
 */

// Seleção de elementos do DOM
const overlay = document.getElementById('entry-overlay');
const revealElements = document.querySelectorAll('.reveal');

/**
 * Configuração do Intersection Observer
 * Responsável por disparar as animações conforme o usuário rola a página
 */
const observerOptions = {
    threshold: 0.1 // Ativa quando 10% do elemento aparece na tela
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Uma vez animado, não precisa mais observar o elemento
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Função disparada ao clicar no botão de abrir o presente
 */
function openGift() {
    if (!overlay) return;

    // Inicia a animação de saída do overlay
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.5)';
    
    // Aguarda o fim da transição CSS (1100ms) para limpar o DOM
    setTimeout(() => {
        overlay.style.display = 'none';
        
        // Ativa o observador apenas após a abertura para garantir sincronia
        revealElements.forEach(el => observer.observe(el));
        
        // Garante que o usuário comece no topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1100);
}

// Inicialização: Se quiser que alguns elementos carreguem 
// mesmo sem o observer ativo, você pode chamar o observe aqui.
// Mas para o efeito de "viagem no tempo", o ideal é deixar dentro do openGift.