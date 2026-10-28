-- =============================================================================
-- SCHEMA SQL ESTRITO — DER O-BRECHÓ (9 TABELAS EXATAS)
-- =============================================================================

CREATE TABLE CLIENTE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(150),
    observacoes TEXT
);

CREATE TABLE FUNCIONARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cargo VARCHAR(60) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    usuario VARCHAR(60) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE CATEGORIA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE DOACAO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_recebimento DATE NOT NULL,
    origem VARCHAR(150) NOT NULL,
    observacao TEXT
);

CREATE TABLE PRODUTO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria_id INT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    tamanho VARCHAR(30),
    marca VARCHAR(80),
    estado VARCHAR(40) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL,
    localizacao VARCHAR(100),
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(id)
);

CREATE TABLE TRIAGEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doacao_id INT NOT NULL,
    produto_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    data_triagem DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    observacao TEXT,
    CONSTRAINT uq_doacao_produto UNIQUE (doacao_id, produto_id),
    CONSTRAINT fk_triagem_doacao FOREIGN KEY (doacao_id) REFERENCES DOACAO(id),
    CONSTRAINT fk_triagem_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id),
    CONSTRAINT fk_triagem_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

CREATE TABLE VENDA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    data DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id) REFERENCES CLIENTE(id),
    CONSTRAINT fk_venda_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

CREATE TABLE ITEM_VENDA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL UNIQUE,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_item_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id),
    CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)
);

CREATE TABLE PAGAMENTO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venda_id INT NOT NULL UNIQUE,
    metodo VARCHAR(40) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    CONSTRAINT fk_pagamento_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id)
);
