-- =====================================================
-- Portfolio Database Schema + Seed Data
-- Run: psql -U postgres -d portfolio -f schema.sql
-- =====================================================

-- Create database (run separately if needed)
-- CREATE DATABASE portfolio;

-- Drop existing tables
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- =====================================================
-- PROJECTS
-- =====================================================
CREATE TABLE projects (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(120)  NOT NULL,
    description   TEXT          NOT NULL,
    tags          TEXT[]        NOT NULL DEFAULT '{}',
    gradient      VARCHAR(120)  NOT NULL DEFAULT 'linear-gradient(135deg,#6C63FF,#800020)',
    live_url      VARCHAR(255),
    github_url    VARCHAR(255),
    display_order INT           NOT NULL DEFAULT 0
);

INSERT INTO projects (title, description, tags, gradient, live_url, github_url, display_order) VALUES
(
    'EdZure Legal Platform',
    'Full-stack legal services platform with Firebase, React and real-time document processing.',
    ARRAY['React', 'Firebase', 'Node.js'],
    'linear-gradient(135deg,#6C63FF,#800020)',
    NULL,
    NULL,
    1
),
(
    '3D Product Visualizer',
    'Interactive WebGL product configurator with real-time material and lighting control.',
    ARRAY['Three.js', 'GLSL', 'WebGL'],
    'linear-gradient(135deg,#00D4FF,#6C63FF)',
    NULL,
    NULL,
    2
),
(
    'AI Analytics Dashboard',
    'Real-time analytics dashboard powered by machine learning with animated data visualisations.',
    ARRAY['Next.js', 'Python', 'D3.js'],
    'linear-gradient(135deg,#800020,#FF6B6B)',
    NULL,
    NULL,
    3
);

-- =====================================================
-- SKILLS
-- =====================================================
CREATE TABLE skills (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(60) NOT NULL,
    category VARCHAR(40) NOT NULL CHECK (category IN ('frontend', 'backend', 'tools'))
);

INSERT INTO skills (name, category) VALUES
('React',       'frontend'),
('Next.js',     'frontend'),
('TypeScript',  'frontend'),
('Three.js',    'frontend'),
('WebGL',       'frontend'),
('Python',      'backend'),
('FastAPI',     'backend'),
('Node.js',     'backend'),
('PostgreSQL',  'backend'),
('Figma',       'tools'),
('GSAP',        'tools'),
('Docker',      'tools');

-- =====================================================
-- CONTACT MESSAGES
-- =====================================================
CREATE TABLE contact_messages (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
