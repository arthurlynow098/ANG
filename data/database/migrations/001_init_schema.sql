-- =============================================================================
-- MIGRAÇÃO 001: Criação Estrita do Banco de Dados O-BRECHÓ (Projeto ANG)
-- Modelo Relacional Oficial (9 Tabelas)
-- =============================================================================

-- 1. CLIENTE
CREATE TABLE IF NOT EXISTS CLIENTE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(150) DEFAULT '',
    observacoes TEXT
);

-- 2. FUNCIONARIO
CREATE TABLE IF NOT EXISTS FUNCIONARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cargo VARCHAR(80) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    usuario VARCHAR(60) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);

-- 3. CATEGORIA
CREATE TABLE IF NOT EXISTS CATEGORIA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) DEFAULT ''
);

-- 4. DOACAO
CREATE TABLE IF NOT EXISTS DOACAO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_recebimento DATE NOT NULL,
    origem VARCHAR(150) NOT NULL,
    observacao TEXT
);

-- 5. PRODUTO
CREATE TABLE IF NOT EXISTS PRODUTO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria_id INT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    tamanho VARCHAR(20) NOT NULL,
    marca VARCHAR(100) DEFAULT 'Sem marca',
    estado VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(40) NOT NULL DEFAULT 'aguardando_triagem',
    localizacao VARCHAR(100) DEFAULT 'Mesa de Triagem',
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(id) ON DELETE SET NULL
);

-- 6. TRIAGEM
CREATE TABLE IF NOT EXISTS TRIAGEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doacao_id INT NOT NULL,
    produto_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    data_triagem DATE NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Pendente',
    observacao TEXT,
    CONSTRAINT fk_triagem_doacao FOREIGN KEY (doacao_id) REFERENCES DOACAO(id) ON DELETE CASCADE,
    CONSTRAINT fk_triagem_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id) ON DELETE CASCADE,
    CONSTRAINT fk_triagem_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

-- 7. VENDA
CREATE TABLE IF NOT EXISTS VENDA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    data DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id) REFERENCES CLIENTE(id),
    CONSTRAINT fk_venda_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

-- 8. ITEM_VENDA
CREATE TABLE IF NOT EXISTS ITEM_VENDA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_item_venda_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_venda_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)
);

-- 9. PAGAMENTO
CREATE TABLE IF NOT EXISTS PAGAMENTO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venda_id INT NOT NULL UNIQUE,
    metodo VARCHAR(40) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    CONSTRAINT fk_pagamento_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id) ON DELETE CASCADE
);

