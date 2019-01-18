CREATE TABLE IF NOT EXISTS deal_type(
	id	bigserial PRIMARY KEY,
	description varchar
);

CREATE TABLE IF NOT EXISTS deal(
	id	bigserial PRIMARY KEY,
	title varchar DEFAULT '',
	text varchar DEFAULT '',
	create_date timestamp DEFAULT now(),
	publish_date timestamp DEFAULT now(),
	end_date timestamp DEFAULT now(),
	url varchar DEFAULT '',
	total_sold bigint DEFAULT 0,
	deal_type_id bigint REFERENCES deal_type(id)
);

CREATE TABLE IF NOT EXISTS buy_option(
	id	bigserial PRIMARY KEY,
	title varchar DEFAULT '',
	normal_price numeric DEFAULT 0,
	sale_price numeric DEFAULT 0,
	percentage_discount numeric DEFAULT 0,
	quantity_cupom bigint DEFAULT 0,
	start_date timestamp DEFAULT now(),
	end_date timestamp DEFAULT now(),
	deal_id bigint REFERENCES deal(id)
);

DELETE FROM buy_option;
DELETE FROM deal;
DELETE FROM deal_type;

INSERT INTO deal_type(id, description) VALUES (1, 'LOCAL');
INSERT INTO deal_type(id, description) VALUES (2, 'PRODUCT');
INSERT INTO deal_type(id, description) VALUES (3, 'TRIP');

INSERT INTO deal(title, text, publish_date, end_date, deal_type_id) VALUES ('Local 1', 'Text for Local 1', now(), now() + interval '7 day', 1);
INSERT INTO deal(title, text, publish_date, end_date, deal_type_id) VALUES ('Local 2', 'Text for Local 2', now(), now() + interval '15 day', 1);
INSERT INTO deal(title, text, publish_date, end_date, deal_type_id) VALUES ('Local 3', 'Text for Local 3', now(), now() + interval '10 day', 1);
INSERT INTO deal(title, text, publish_date, end_date, deal_type_id) VALUES ('Product 1', 'Text for Product 1', now(), now() + interval '5 day', 2);
INSERT INTO deal(title, text, publish_date, end_date, deal_type_id) VALUES ('Trip 1', 'Text for Trip 1', now(), now() + interval '25 day', 3);

INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Local 1 Buy Option 1', 2, 1, 10, now(), now() + interval '7 day', (SELECT id FROM deal WHERE title = 'Local 1'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Local 1 Buy Option 2', 3, 2, 10, now(), now() + interval '7 day', (SELECT id FROM deal WHERE title = 'Local 1'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Local 2 Buy Option 1', 2, 1, 10, now(), now() + interval '15 day', (SELECT id FROM deal WHERE title = 'Local 2'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Local 2 Buy Option 2', 3, 1, 10, now(), now() + interval '15 day', (SELECT id FROM deal WHERE title = 'Local 2'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Local 3 Buy Option 1', 2, 1, 10, now(), now() + interval '10 day', (SELECT id FROM deal WHERE title = 'Local 3'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Product 1 Buy Option 1', 5, 4, 20, now(), now() + interval '5 day', (SELECT id FROM deal WHERE title = 'Product 1'));
INSERT INTO buy_option(title, normal_price, sale_price, percentage_discount, start_date, end_date, deal_id) 
VALUES ('Trip 1 Buy Option 1', 20, 10, 30, now(), now() + interval '25 day', (SELECT id FROM deal WHERE title = 'Trip 1'));