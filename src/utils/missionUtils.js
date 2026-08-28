/**
 * Funções utilitárias para manipulação, cálculos e filtragem de missões.
 */

/**
 * Gera um ID único em formato de string sem depender de pacotes externos.
 * @returns {string} ID gerado
 */
export function generateId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Calcula métricas de progresso das missões cadastradas.
 * @param {Array} missions - Lista de missões
 * @returns {object} Métricas: { total, completed, pending, percentage, isAllCompleted }
 */
export function calculateProgress(missions = []) {
    const list = Array.isArray(missions) ? missions : [];
    const total = list.length;
    const completed = list.filter((mission) => Boolean(mission?.concluida)).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    const isAllCompleted = total > 0 && completed === total;

    return {
        total,
        completed,
        pending,
        percentage,
        isAllCompleted,
    };
}

/**
 * Filtra a lista de missões de acordo com o filtro selecionado.
 * @param {Array} missions - Lista de missões
 * @param {'ALL' | 'PENDING' | 'COMPLETED'} filter - Tipo do filtro
 * @returns {Array} Lista de missões filtradas
 */
export function filterMissions(missions = [], filter = 'ALL') {
    const list = Array.isArray(missions) ? missions : [];
    switch (filter) {
        case 'PENDING':
            return list.filter((mission) => !mission?.concluida);
        case 'COMPLETED':
            return list.filter((mission) => Boolean(mission?.concluida));
        case 'ALL':
        default:
            return list;
    }
}

/**
 * Formata uma data ISO em exibição amigável para o card.
 * @param {string} isoString - Data em formato ISO
 * @returns {string} Texto formatado
 */
export function formatMissionDate(isoString) {
    if (!isoString) return '';

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}