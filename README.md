# NewsletterPT - Editor Moderno de Newsletters com Toque Português

![NewsletterPT Screenshot](https://via.placeholder.com/800x400.png?text=NewsletterPT+Interface)

**NewsletterPT** é uma aplicação web front-end intuitiva e elegante para a criação de newsletters, com um design inspirado na rica estética portuguesa. Permite aos utilizadores construir newsletters visualmente apelativas de forma fácil, utilizando um editor de arrastar e soltar, pré-visualização em tempo real e uma variedade de blocos de conteúdo e templates.

## Visão Geral

O NewsletterPT foi concebido para simplificar o processo de criação de newsletters, oferecendo uma experiência de utilizador fluida e focada na produtividade. Com uma interface limpa e ferramentas poderosas, os utilizadores podem concentrar-se no conteúdo, enquanto a aplicação trata da formatação e do layout. A inspiração portuguesa reflete-se nos detalhes do design, como a paleta de cores, tipografia e nos templates temáticos.

## Recursos Principais

O editor oferece uma vasta gama de funcionalidades para criar newsletters profissionais:

*   **Editor de Blocos de Conteúdo Intuitivo**:
    *   **Arrastar e Soltar**: Adicione e organize facilmente blocos de conteúdo.
    *   **Tipos de Bloco**:
        *   **Título (H1-H6)**: Para estruturar o seu conteúdo.
        *   **Parágrafo**: Para texto corrido.
        *   **Imagem**: Com opção de upload e legendas.
        *   **Citação**: Para destacar frases importantes.
        *   **Lista**: Listas ordenadas e não ordenadas.
        *   **Separador**: Para dividir secções visualmente.
        *   **Botão CTA (Call to Action)**: Para direcionar os seus leitores.
*   **Gerenciamento de Metadados da Newsletter**:
    *   Título da Newsletter
    *   Data de Publicação (com seletor de data)
    *   Nome do Autor
    *   Assunto do Email
    *   Categoria (Geral, Negócios, Tecnologia, Cultura, Lifestyle)
*   **Estatísticas em Tempo Real**:
    *   **Contagem de Palavras**: Monitorize o tamanho do seu conteúdo.
    *   **Tempo de Leitura Estimado**: Ajuda a adequar a newsletter ao seu público.
    *   **Nível de Legibilidade**: Uma avaliação simples para melhorar a clareza.
*   **Barra de Ferramentas de Edição de Texto**:
    *   Formatação básica: **Negrito**, *Itálico*, <u>Sublinhado</u>.
    *   **Desfazer/Refazer**: Para corrigir erros facilmente.
    *   **Colar com Formatação Inteligente**: Cola texto de outras fontes, tentando manter uma formatação limpa e adaptada.
    *   **Limpar Formatação**: Remove toda a formatação do texto selecionado.
*   **Painel de Pré-visualização Dinâmico**:
    *   Visualize instantaneamente como a sua newsletter aparecerá.
    *   Alternar entre visualizações: **Desktop**, **Tablet** e **Mobile**.
*   **Seleção de Templates Inspirados em Portugal**:
    *   **Minimalista**: Design limpo e focado no conteúdo.
    *   **Azulejo**: Inspirado nos tradicionais azulejos portugueses.
    *   **Moderno**: Design contemporâneo e arrojado.
    *   **Clássico**: Elegância atemporal.
*   **Opções de Publicação Versáteis**:
    *   **Exportar para Email (HTML)**: Gera código HTML otimizado para clientes de email.
    *   **Gerar Versão Web**: Cria uma página web autónoma da newsletter para partilha online.
    *   **Guardar PDF**: (Funcionalidade atualmente em desenvolvimento).
*   **Funcionalidades Inteligentes**:
    *   **Sugestão de Título**: Gera sugestões de título com base no conteúdo.
    *   **Geração de Excerto (Assunto)**: Sugere um assunto de email com base no primeiro parágrafo.
*   **Notificações Toast**: Feedback visual para ações do utilizador (ex: Bloco adicionado, Guardado).
*   **Design Responsivo**: A interface do editor adapta-se a diferentes tamanhos de ecrã.
*   **Suporte a Tema Claro/Escuro**: Adapta-se automaticamente às preferências do sistema operativo do utilizador.
*   **Atalhos de Teclado Comuns**:
    *   `Ctrl/Cmd + B`: Negrito
    *   `Ctrl/Cmd + I`: Itálico
    *   `Ctrl/Cmd + U`: Sublinhado
    *   `Ctrl/Cmd + Z`: Desfazer
    *   `Ctrl/Cmd + Y`: Refazer
    *   `Ctrl/Cmd + S`: Guardar (aciona o salvamento automático no localStorage)
*   **Salvamento Automático no Navegador (`localStorage`)**: O seu trabalho é guardado automaticamente no navegador a cada 30 segundos e ao fechar a janela, permitindo que continue a editar mais tarde mesmo que feche o navegador acidentalmente.

## Como Usar

1.  **Abra o `index.html`** no seu navegador web.
2.  **Explore a Interface**:
    *   À esquerda, encontrará a **Barra Lateral** com Blocos de Conteúdo, Metadados e Estatísticas.
    *   No centro, está a **Área de Edição Principal**, onde irá construir a sua newsletter.
    *   À direita (inicialmente oculta), o **Painel de Pré-visualização**.
3.  **Comece a Criar**:
    *   **Escolha um Template**: Clique em "Templates" no cabeçalho e selecione um modelo base.
    *   **Adicione Conteúdo**: Arraste blocos da barra lateral para a área de edição.
    *   **Edite o Conteúdo**: Clique diretamente nos blocos na área de edição para modificar texto, imagens, etc. Use a barra de ferramentas de formatação acima da área de edição.
    *   **Preencha os Metadados**: Insira o título da newsletter, data, autor, assunto e categoria na barra lateral.
4.  **Pré-visualize**:
    *   Clique em "Pré-visualizar" no cabeçalho para mostrar/ocultar o painel de pré-visualização.
    *   Use os ícones de dispositivo (Desktop, Tablet, Mobile) no painel de pré-visualização para ver como a sua newsletter se adapta.
5.  **Publique**:
    *   Clique em "Publicar" no cabeçalho.
    *   Escolha uma das opções: Exportar HTML para email, Gerar Link para versão web ou Descarregar PDF (em desenvolvimento).

## Tecnologias Utilizadas

*   **HTML5**: Para a estrutura semântica da aplicação.
*   **CSS3**: Para estilização, layout (Flexbox, Grid), design responsivo e temas (claro/escuro) utilizando variáveis CSS.
*   **JavaScript (Vanilla JS)**: Para toda a lógica da aplicação, manipulação do DOM, interatividade, gestão de estado e funcionalidades do editor, seguindo uma abordagem orientada a objetos.

## Estrutura do Projeto

*   `index.html`: O ficheiro principal que contém a estrutura HTML da página.
*   `style.css`: Contém todos os estilos CSS, incluindo as variáveis para os temas claro e escuro, e os estilos específicos inspirados na estética portuguesa.
*   `app.js`: O coração da aplicação, contendo a classe `NewsletterEditor` e toda a lógica JavaScript para as funcionalidades do editor.

## Possíveis Melhorias Futuras

*   **Implementação Completa da Funcionalidade "Guardar PDF"**.
*   **Opções de Limpeza do `localStorage`**: Adicionar um botão para o utilizador limpar os dados guardados no navegador, se desejar.
*   **Melhorias na Gestão de Histórico com `localStorage`**: Assegurar que o histórico de desfazer/refazer interage de forma ideal com os dados carregados.
*   **Integração com Backend/Serviços de Nuvem**: Para um salvamento persistente mais robusto e partilhável entre dispositivos.
*   **Mais Opções de Templates e Blocos de Conteúdo**.
*   **Personalização Avançada de Estilos**: Permitir que os utilizadores personalizem cores, fontes, etc.
*   **Integração com Serviços de Email Marketing**.
*   **Colaboração em Tempo Real** (para edição multi-utilizador).
*   **Histórico de Versões Mais Robusto**.
*   **Biblioteca de Imagens/Assets**.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o ficheiro `LICENSE` para mais detalhes (Nota: ficheiro LICENSE não incluído neste exemplo, mas seria adicionado num projeto real).

---

Feito com ❤️ em Portugal.
