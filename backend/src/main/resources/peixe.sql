CREATE TABLE IF NOT EXISTS deal_type(
	id	bigserial PRIMARY KEY,
	description varchar
);

CREATE TABLE IF NOT EXISTS deal(
	id	bigserial PRIMARY KEY,
	title varchar,
	text varchar,
	create_date timestamp,
	publish_date timestamp,
	end_date timestamp,
	url varchar,
	total_sold bigint,
	deal_type_id bigint REFERENCES deal_type(id)
);

CREATE TABLE IF NOT EXISTS buy_option(
	id	bigserial PRIMARY KEY,
	title varchar,
	normal_price numeric,
	sale_price numeric,
	percentage_discount numeric,
	quantity_cupom bigint,
	start_date timestamp,
	end_date timestamp,
	deal_id bigint REFERENCES deal(id)
);

INSERT INTO deal_type(id, description) VALUES (1, 'LOCAL');

INSERT INTO deal_type(id, description) VALUES (2, 'PRODUCT');

INSERT INTO deal_type(id, description) VALUES (3, 'TRIP');