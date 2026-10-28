-- =============================================================================
-- SEED 001: Carga Inicial de Dados - O-BRECHÓ (Projeto ANG)
-- =============================================================================

INSERT INTO CATEGORIA (id, nome, descricao) VALUES
(1, 'Vestidos', 'Vestidos curtos, midi e longos'),
(2, 'Camisas e Blusas', 'Camisas sociais, camisetas e blusas'),
(3, 'Calças e Saias', 'Calças jeans, sociais e saias'),
(4, 'Casacos e Jaquetas', 'Blazers, jaquetas, moletons e tricôs'),
(5, 'Calçados', 'Sapatos, tênis, sandálias e botas'),
(6, 'Acessórios e Bolsas', 'Bolsas, cintos, lenços e chapéus');

INSERT INTO FUNCIONARIO (id, nome, cargo, telefone, usuario, senha_hash) VALUES
(1, 'Helena Martins', 'Administrador', '(11) 99811-2233', 'admin', 'hash_ang_123456'),
(2, 'Lucas Andrade', 'Atendente', '(11) 99722-3344', 'atendente', 'hash_ang_123456'),
(3, 'Beatriz Rocha', 'Responsável pela Triagem', '(11) 99633-4455', 'beatriz', 'hash_ang_123456');

INSERT INTO CLIENTE (id, nome, telefone, email, observacoes) VALUES
(1, 'Maria Clara Souza', '(11) 98765-4321', 'mariaclara@email.com', 'Prefere vestidos tamanho M e peças florais'),
(2, 'João Pedro Oliveira', '(11) 91234-5678', 'joaopedro@email.com', 'Procura camisas masculinas G e jaquetas jeans'),
(3, 'Ana Beatriz Lima', '(11) 99876-5432', 'anabeatriz@email.com', 'Cliente frequente aos sábados');

INSERT INTO DOACAO (id, data_recebimento, origem, observacao) VALUES
(1, '2025-03-10', 'Campanha Paróquia Central', 'Sacola com roupas femininas em ótimo estado'),
(2, '2025-03-12', 'Doador Anônimo', 'Entrega direta na recepção do brechó'),
(3, '2025-03-15', 'Condomínio Parque das Flores', 'Caixa com roupas diversas para avaliação');

