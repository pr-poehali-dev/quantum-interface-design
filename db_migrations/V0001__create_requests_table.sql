CREATE TABLE IF NOT EXISTS t_p47384580_quantum_interface_de.requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);