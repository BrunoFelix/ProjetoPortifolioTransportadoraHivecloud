delete from transportadora;
delete from modal;

INSERT INTO modal (descricao) VALUES
	('Rodoviário'),
	('Aquaviário'),
	('Aéreo');

INSERT INTO transportadora (email, nome, empresa, telefone, celular, whatsapp, id_modal, cep, uf, cidade, bairro, rua, numero) VALUES 
	('qualidade@teste.com.br', 'Xadrez -Rodoáereo', '44.056.755/0001-83', '(11)3499-8439', '(11)3499-8439', '(11)3499-8439', (select id_modal from modal where descricao = 'Rodoviário'), '54000000', 'PE', 'Recife', 'Jardim São Paulo', 'Rua Brasil', '99');
INSERT INTO transportadora (email, nome, empresa, telefone, celular, whatsapp, id_modal, cep, uf, cidade, bairro, rua, numero) VALUES 
	('qualidade@teste.com.br', 'Xadrez -Rodoáereo', '44.056.755/0001-83', '(11)3499-8439', '(11)3499-8439', '(11)3499-8439', (select id_modal from modal where descricao = 'Rodoviário'), '54000000', 'PE', 'Recife', 'Jardim São Paulo', 'Rua Brasil', '99');
INSERT INTO transportadora (email, nome, empresa, telefone, celular, whatsapp, id_modal, cep, uf, cidade, bairro, rua, numero) VALUES 
	('qualidade@teste.com.br', 'Diggi cargas aereas', '35.733.638/0001-62', '(11)3499-8439', '(11)3499-8439', '(11)3499-8439', (select id_modal from modal where descricao = 'Aéreo'), '54000000', 'PE', 'Recife', 'Jardim São Paulo', 'Rua Brasil', '99');
INSERT INTO transportadora (email, nome, empresa, telefone, celular, whatsapp, id_modal, cep, uf, cidade, bairro, rua, numero) VALUES 
	('qualidade@teste.com.br', 'Pavati e Pirula - Rodoáereo', '35.733.638/0001-62', '(11)3499-8439', '(11)3499-8439', '(11)3499-8439', (select id_modal from modal where descricao = 'Rodoviário'), '54000000', 'PE', 'Recife', 'Jardim São Paulo', 'Rua Brasil', '99');
	