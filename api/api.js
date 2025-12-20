// Configuração da API
const API_CONFIG = {
    url: 'https://tagliari.ngrok.app',
    token: '17e721a855359a664c490ebac.69afb23afc3ffcf250bc463d3'
};

// Função para obter o token JWT
function getAccessToken() {
    return localStorage.getItem('x-access-token') ||
           localStorage.getItem('jwt_token') ||
           localStorage.getItem('token') ||
           sessionStorage.getItem('x-access-token') ||
           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RpZ28iOjEsInRpcG8iOiJWIiwibm9tZSI6IlhLRVlTVEkiLCJhcGVsaWRvIjoiWEtFWVNUSSIsImRhdGFfbmFzYyI6IjAwMDAtMDAtMDAiLCJlbmRlcmVjbyI6IkFWRU5JREEgQlJBU0lMIiwibnVtZXJvIjoiMjg0IiwiY29tcGxlbWVudG8iOiJTQUxBIDA3IC8gMTAgIiwiYmFpcnJvIjoiIiwiY2lkYWRlIjoiTUFSSU5Hw4EiLCJlc3RhZG8iOiJQUiIsImNlcCI6Ijg3MDUwLTAwMCIsInRlbGVmb25lIjoiKDQ0KTAzMDI2LTAwMzgiLCJjZWx1bGFyIjoiIiwiZW1haWwiOiIiLCJjcGYiOiIiLCJyZyI6IiIsImNvZF9jaWRhZGVfaWJnZSI6MCwiY29kX3BhaXNfaWJnZSI6IjEwNTgiLCJzZW5oYSI6IiIsImF0aXZvIjoiUyIsImFjZXNzbyI6IlMiLCJzdXBlcnZpc29yIjoiUyIsImNvbWlzc2lvbmFkbyI6IlMiLCJkYXRhX2NhZGFzdHJvIjoiMDAwMC0wMC0wMCIsImRhdGFfYXRpdmFjYW8iOiIwMDAwLTAwLTAwIiwiaWRpb21hX3Npc3RlbWEiOiJQT1JUVUdVRVNfQlJBU0lMIiwiY2VudHJvX2N1c3RvIjowLCJzZXRvciI6MCwidGlwb19wZWRpZG8iOm51bGwsImdydXBvX3VzdWFyaW9faWQiOm51bGwsImRlcGFydGFtZW50b19pZCI6bnVsbCwib2JzZXJ2YWNvZXMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOltdfSwiZm90b19wZXJmaWwiOm51bGwsImlhdCI6MTc2MDk2ODAyNH0.KW-z9sQV1xz4pL2Sq2xhsuug9epRUlkqoXyji6ljpbk';
}

// Headers para as requisições
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
        'token-api-sax': API_CONFIG.token
    };
}

// Função para fazer requisições GET
async function api_get(endpoint, params = {}) {
    try {
        const baseUrl = API_CONFIG.url.endsWith('/') ? API_CONFIG.url : API_CONFIG.url + '/';
        const url = new URL(baseUrl + endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição GET:', err);
        throw err;
    }
}

// Função para fazer requisições GET por ID
async function api_get_id(endpoint, id) {
    try {
        const baseUrl = API_CONFIG.url.endsWith('/') ? API_CONFIG.url : API_CONFIG.url + '/';
        const url = baseUrl + endpoint + id;

        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição GET por ID:', err);
        throw err;
    }
}

// Função para fazer requisições POST
async function api_post(endpoint, body, is_blob = false) {
    try {
        const baseUrl = API_CONFIG.url.endsWith('/') ? API_CONFIG.url : API_CONFIG.url + '/';
        const url = baseUrl + endpoint;
        
        let headers = getHeaders();
        if (is_blob) {
            delete headers['Content-Type'];
        }

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: is_blob ? body : JSON.stringify(body),
            mode: 'cors'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição POST:', err);
        throw err;
    }
}

// Função para fazer requisições PUT
async function api_put(endpoint, id, body) {
    try {
        const baseUrl = API_CONFIG.url.endsWith('/') ? API_CONFIG.url : API_CONFIG.url + '/';
        const url = baseUrl + endpoint + id;

        const response = await fetch(url, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(body),
            mode: 'cors'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição PUT:', err);
        throw err;
    }
}

// Função para fazer requisições DELETE
async function api_delete(endpoint, id) {
    try {
        const baseUrl = API_CONFIG.url.endsWith('/') ? API_CONFIG.url : API_CONFIG.url + '/';
        const url = baseUrl + endpoint + id;

        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeaders(),
            mode: 'cors'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição DELETE:', err);
        throw err;
    }
}

// Função para obter todas as fichas
async function obterTodasFichas() {
    return await api_get('fichas_termo');
}

// Função para obter uma ficha específica
async function obterFichaPorId(id) {
    return await api_get_id('fichas_termo/', id);
}

// Função para obter itens de uma ficha
async function obterItensFicha(fichaId) {
    const resposta = await api_get_id('fichas_termo_itens/ficha/', fichaId);
    return transformarRespostaEmArray(resposta);
}

// Função auxiliar para transformar resposta em array
function transformarRespostaEmArray(resposta) {
    if (Array.isArray(resposta)) {
        return resposta;
    }
    
    if (typeof resposta === 'object' && resposta !== null) {
        // Tenta extrair array de diferentes formatos de resposta
        if (resposta.data && Array.isArray(resposta.data)) {
            return resposta.data;
        }
        if (resposta.itens && Array.isArray(resposta.itens)) {
            return resposta.itens;
        }
        if (resposta.result && Array.isArray(resposta.result)) {
            return resposta.result;
        }
        if (resposta.items && Array.isArray(resposta.items)) {
            return resposta.items;
        }
        if (resposta.ficha_itens && Array.isArray(resposta.ficha_itens)) {
            return resposta.ficha_itens;
        }
        
        // Se for um objeto, converte seus valores em array
        const valores = Object.values(resposta);
        if (valores.length > 0 && valores.every(v => typeof v === 'object' && v !== null)) {
            return valores;
        }
        
        // Se tiver uma única propriedade que é um array
        for (const key in resposta) {
            if (Array.isArray(resposta[key])) {
                return resposta[key];
            }
        }
    }
    
    // Se nada funcionar, retorna array vazio
    console.warn('Não foi possível extrair array da resposta:', resposta);
    return [];
}

// Função para excluir ficha e seus itens
async function excluirFichaCompleta(codigo) {
    // Primeiro, excluir todos os itens da ficha
    try {
        const itens = await obterItensFicha(codigo);
        if (itens && Array.isArray(itens)) {
            for (const item of itens) {
                const itemId = item.id || item.codigo || item.ID || item.CODIGO;
                if (itemId) {
                    await api_delete('fichas_termo_itens/', itemId);
                }
            }
        }
    } catch (error) {
        console.warn('Erro ao excluir itens da ficha, continuando com exclusão da ficha:', error);
    }
    
    // Depois, excluir a ficha principal
    return await api_delete('fichas_termo/', codigo);
}

// Função para exportar fichas para PDF
async function exportarFichasParaPDF(fichasIds) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let pageCount = 0;
    let fichasProcessadas = 0;

    for (const fichaId of fichasIds) {
        try {
            const ficha = await obterFichaPorId(fichaId);
            const itens = await obterItensFicha(fichaId);

            if (!Array.isArray(itens)) {
                console.warn(`Itens da ficha ${fichaId} não é um array:`, itens);
                continue;
            }

            if (pageCount > 0) doc.addPage();

            const margin = 10;
            const dominio = "Domínio: " + (ficha.dominio || 'Não informado');
            const nomeFicha = "Ficha: " + (ficha.nome_ficha || ficha.nome || 'Sem nome');

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(dominio, margin, margin + 10);
            doc.setFontSize(12);
            doc.text(nomeFicha, margin, margin + 15);

            // Verifica se há itens para exibir
            if (itens.length > 0) {
                const tableData = itens.map(item => [
                    item.numero_ordem || item.ordem || item.numero || '',
                    item.campo_nome || item.nome_campo || item.campo || '',
                    item.campo_valor || item.valor_campo || item.valor || ''
                ]);

                doc.autoTable({
                    startY: margin + 20,
                    head: [['Ordem', 'Campo', 'Valor']],
                    body: tableData,
                    margin: { left: margin, right: margin },
                    styles: { fontSize: 8 },
                    headStyles: { fillColor: [66, 139, 202] }
                });
            } else {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'italic');
                doc.text("Nenhum item cadastrado nesta ficha", margin, margin + 25);
            }

            pageCount++;
            fichasProcessadas++;
        } catch (error) {
            console.error(`Erro ao processar ficha ${fichaId}:`, error);
            continue;
        }
    }

    if (fichasProcessadas > 0) {
        doc.save(`fichas_exportadas_${new Date().toISOString().split('T')[0]}.pdf`);
        return true;
    } else {
        throw new Error('Nenhuma ficha foi exportada com sucesso');
    }
}

// Função para exportar glossário para PDF
async function exportarGlossarioParaPDF(fichasIds) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 10;
    let currentY = margin;
    let fichasProcessadas = 0;

    for (const fichaId of fichasIds) {
        try {
            const ficha = await obterFichaPorId(fichaId);
            const itens = await obterItensFicha(fichaId);

            if (!Array.isArray(itens)) {
                console.warn(`Itens da ficha ${fichaId} não é um array para glossário:`, itens);
                continue;
            }

            if (fichasProcessadas > 0) {
                doc.addPage();
                currentY = margin;
            }

            const dominio = ficha.dominio || 'Domínio não informado';
            const nomeFicha = ficha.nome_ficha || ficha.nome || 'Sem nome';

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Domínio: ${dominio}`, margin, currentY);
            currentY += 8;
            doc.text(`Ficha: ${nomeFicha}`, margin, currentY);
            currentY += 15;

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            const glossarioText = "Glossário";
            const glossarioWidth = doc.getTextWidth(glossarioText);
            const glossarioX = (doc.internal.pageSize.getWidth() - glossarioWidth) / 2;
            doc.text(glossarioText, glossarioX, currentY);
            currentY += 15;

            // Filtra e processa os valores
            let valores = [];
            if (Array.isArray(itens) && itens.length > 0) {
                valores = itens
                    .filter(item => item && item.campo_valor && item.campo_valor.toString().trim() !== '')
                    .map(item => item.campo_valor.toString().trim())
                    .filter((valor, index, self) => self.indexOf(valor) === index);
            }

            if (valores.length > 0) {
                const textoGlossario = valores.join('. ');
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                const lines = doc.splitTextToSize(textoGlossario, doc.internal.pageSize.getWidth() - 40);
                
                for (const line of lines) {
                    if (currentY > doc.internal.pageSize.getHeight() - margin) {
                        doc.addPage();
                        currentY = margin;
                    }
                    doc.text(line, margin, currentY);
                    currentY += 7;
                }
            } else {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'italic');
                const semValoresText = "Nenhum valor encontrado para glossário";
                const semValoresWidth = doc.getTextWidth(semValoresText);
                const semValoresX = (doc.internal.pageSize.getWidth() - semValoresWidth) / 2;
                doc.text(semValoresText, semValoresX, currentY);
                currentY += 10;
            }

            fichasProcessadas++;
            currentY += 10; // Espaço entre fichas
        } catch (error) {
            console.error(`Erro ao processar ficha ${fichaId} para glossário:`, error);
            continue;
        }
    }

    if (fichasProcessadas > 0) {
        doc.save(`glossario_fichas_${new Date().toISOString().split('T')[0]}.pdf`);
        return true;
    } else {
        throw new Error('Nenhuma ficha foi processada para o glossário');
    }
}

// Função para excluir múltiplos itens em paralelo
async function excluirItensBatch(itemIds) {
    try {
        // Cria promises para excluir todos os itens em paralelo
        const deletePromises = itemIds.map(itemId => 
            api_delete('fichas_termo_itens/', itemId)
                .then(() => ({ success: true, itemId }))
                .catch(error => ({ success: false, itemId, error }))
        );
        
        // Executa todas as exclusões em paralelo
        const results = await Promise.all(deletePromises);
        
        const sucessos = results.filter(r => r.success);
        const falhas = results.filter(r => !r.success);
        
        console.log(`Itens excluídos: ${sucessos.length}/${itemIds.length}`);
        
        if (falhas.length > 0) {
            console.warn('Alguns itens falharam ao excluir:', falhas);
        }
        
        return { sucessos, falhas };
    } catch (error) {
        console.error('Erro no batch delete:', error);
        throw error;
    }
}

// Função otimizada para excluir ficha e seus itens
async function excluirFichaCompletaOtimizada(codigo) {
    try {
        // Primeiro, obtém todos os itens da ficha
        const itens = await obterItensFicha(codigo);
        
        if (itens && Array.isArray(itens) && itens.length > 0) {
            // Extrai os IDs dos itens
            const itemIds = itens
                .map(item => item.id || item.codigo || item.ID || item.CODIGO)
                .filter(id => id); // Remove IDs nulos/undefined
            
            if (itemIds.length > 0) {
                // Exclui todos os itens em paralelo
                await excluirItensBatch(itemIds);
            }
        }
    } catch (error) {
        console.warn('Erro ao excluir itens da ficha, continuando com exclusão da ficha:', error);
    }
    
    // Depois, excluir a ficha principal
    return await api_delete('fichas_termo/', codigo);
}

export {
    obterTodasFichas,
    obterFichaPorId,
    obterItensFicha,
    api_post,
    api_put,
    excluirFichaCompleta,
    excluirFichaCompletaOtimizada,
    exportarFichasParaPDF,
    exportarGlossarioParaPDF
};