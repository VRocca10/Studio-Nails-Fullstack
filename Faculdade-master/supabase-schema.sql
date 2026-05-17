create table services (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  image text,
  price numeric,
  created_at timestamp default now()
);

create table gallery (
  id bigint generated always as identity primary key,
  image text not null,
  category text,
  created_at timestamp default now()
);

create table contacts (
  id bigint generated always as identity primary key,
  name text,
  email text,
  message text,
  created_at timestamp default now()
);

create table appointments (
  id bigint generated always as identity primary key,
  client_name text,
  service text,
  appointment_date timestamp,
  status text default 'pending',
  created_at timestamp default now()
);