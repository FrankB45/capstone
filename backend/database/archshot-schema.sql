CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    game_date DATE DEFAULT CURRENT_DATE,
    numOf_ends INTEGER DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE end (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    archer_char CHAR(1),
    end_num INTEGER NOT NULL,
    numOf_shots INTEGER DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_game_end UNIQUE (game_id, end_num)
);

CREATE TABLE shot (
    shot_id SERIAL PRIMARY KEY,
    end_id INTEGER REFERENCES end(id) ON DELETE CASCADE,
    shot_number INTEGER,
    score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_end_shot UNIQUE (end_id, shot_number)
);