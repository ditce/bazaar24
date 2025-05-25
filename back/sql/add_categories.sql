-- Add categories and subcategories

-- First, ensure the tables have the correct columns if not already created
-- (This is assuming your tables might need proper column definitions)

-- Recreate categories table if needed
CREATE TABLE IF NOT EXISTS public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS public.subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES public.categories(id)
);


INSERT INTO public.categories (name, color) VALUES
    ('Makina'),
    ('Apartamente'),
    ('Qira'),
    ('Pune');

-- Insert subcategories for Makina
INSERT INTO public.subcategories (name, category_id) 
SELECT 'Mercedes', id FROM public.categories WHERE name = 'Makina';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'BMW', id FROM public.categories WHERE name = 'Makina';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Audi', id FROM public.categories WHERE name = 'Makina';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Volkswagen', id FROM public.categories WHERE name = 'Makina';

-- Insert subcategories for Apartamente
INSERT INTO public.subcategories (name, category_id) 
SELECT '1+1', id FROM public.categories WHERE name = 'Apartamente';

INSERT INTO public.subcategories (name, category_id) 
SELECT '2+1', id FROM public.categories WHERE name = 'Apartamente';

INSERT INTO public.subcategories (name, category_id) 
SELECT '3+1', id FROM public.categories WHERE name = 'Apartamente';

-- Insert subcategories for Qira
INSERT INTO public.subcategories (name, category_id) 
SELECT 'Shtepi', id FROM public.categories WHERE name = 'Qira';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Apartament', id FROM public.categories WHERE name = 'Qira';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Garsoniere', id FROM public.categories WHERE name = 'Qira';

-- Insert subcategories for Pune
INSERT INTO public.subcategories (name, category_id) 
SELECT 'Full-time', id FROM public.categories WHERE name = 'Pune';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Part-time', id FROM public.categories WHERE name = 'Pune';

INSERT INTO public.subcategories (name, category_id) 
SELECT 'Freelance', id FROM public.categories WHERE name = 'Pune';
