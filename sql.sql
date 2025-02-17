-- Insert para Client
INSERT INTO "Client" (name, lastname, email, wa_id, manager_id, status, created_by, updated_by)
VALUES
    ('Cliente 1', 'Apellido 1', 'cliente1@example.com', '1234567890', 1, 'ACTIVE', 1, 1),
    ('Cliente 2', 'Apellido 2', 'cliente2@example.com', '9876543210', 2, 'INACTIVE', 1, 1),
    ('Cliente 3', 'Apellido 3', 'cliente3@example.com', '5551234567', 1, 'ACTIVE', 1, 1),
    ('Cliente 4', 'Apellido 4', 'cliente4@example.com', '5559876543', 3, 'PENDING', 1, 1),
    ('Cliente 5', 'Apellido 5', 'cliente5@example.com', '1112223333', 2, 'ACTIVE', 1, 1),
    ('Cliente 6', 'Apellido 6', 'cliente6@example.com', '4445556666', 1, 'INACTIVE', 1, 1),
    ('Cliente 7', 'Apellido 7', 'cliente7@example.com', '7778889999', 4, 'ACTIVE', 1, 1),
    ('Cliente 8', 'Apellido 8', 'cliente8@example.com', '0001112222', 2, 'PENDING', 1, 1),
    ('Cliente 9', 'Apellido 9', 'cliente9@example.com', '3334445555', 1, 'ACTIVE', 1, 1),
    ('Cliente 10', 'Apellido 10', 'cliente10@example.com', '6667778888', 3, 'INACTIVE', 1, 1);

-- Insert para User
INSERT INTO "User" (name, lastname, password, email, wa_id, role_id, manager_id, status, created_by, updated_by)
VALUES
    ('Usuario 1', 'Apellido 1', 'password123', 'usuario1@example.com', '1234567890', 1, NULL, 'ACTIVE', 1, 1), -- manager_id puede ser NULL
    ('Usuario 2', 'Apellido 2', 'password456', 'usuario2@example.com', '9876543210', 2, 1, 'INACTIVE', 1, 1),
    ('Usuario 3', 'Apellido 3', 'password789', 'usuario3@example.com', '5551234567', 1, 1, 'ACTIVE', 1, 1),
    ('Usuario 4', 'Apellido 4', 'password101', 'usuario4@example.com', '5559876543', 3, 2, 'PENDING', 1, 1),
    ('Usuario 5', 'Apellido 5', 'password112', 'usuario5@example.com', '1112223333', 2, NULL, 'ACTIVE', 1, 1),  -- manager_id puede ser NULL
    ('Usuario 6', 'Apellido 6', 'password131', 'usuario6@example.com', '4445556666', 1, 1, 'INACTIVE', 1, 1),
    ('Usuario 7', 'Apellido 7', 'password142', 'usuario7@example.com', '7778889999', 4, 1, 'ACTIVE', 1, 1),
    ('Usuario 8', 'Apellido 8', 'password153', 'usuario8@example.com', '0001112222', 2, 2, 'PENDING', 1, 1),
    ('Usuario 9', 'Apellido 9', 'password164', 'usuario9@example.com', '3334445555', 1, NULL, 'ACTIVE', 1, 1), -- manager_id puede ser NULL
    ('Usuario 10', 'Apellido 10', 'password175', 'usuario10@example.com', '6667778888', 3, 1, 'INACTIVE', 1, 1);


-- Insert para UserRelationship (Ejemplo de relaciones entre usuarios)
INSERT INTO "UserRelationship" (employee_id, manager_id)
VALUES
    (3, 1), -- Usuario 3 es empleado de Usuario 1
    (4, 2), -- Usuario 4 es empleado de Usuario 2
    (6, 1), -- Usuario 6 es empleado de Usuario 1
    (8, 2); -- Usuario 8 es empleado de Usuario 2

-- Insert para Permission
INSERT INTO "Permission" (name, description)
VALUES
    ('READ_CLIENTS', 'Permiso para leer clientes'),
    ('CREATE_CLIENTS', 'Permiso para crear clientes'),
    ('UPDATE_CLIENTS', 'Permiso para actualizar clientes'),
    ('DELETE_CLIENTS', 'Permiso para eliminar clientes'),
    ('READ_USERS', 'Permiso para leer usuarios'),
    ('CREATE_USERS', 'Permiso para crear usuarios'),
    ('UPDATE_USERS', 'Permiso para actualizar usuarios'),
    ('DELETE_USERS', 'Permiso para eliminar usuarios');

-- Insert para Role
INSERT INTO "Role" (name)
VALUES
    ('Administrador'),
    ('Gerente'),
    ('Empleado'),
    ('Cliente');

-- Insert para RolePermission (Ejemplo de permisos para roles)
INSERT INTO "RolePermission" (role_id, permission_id)
VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), -- Administrador tiene todos los permisos
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), -- Gerente tiene permisos de clientes y usuarios
    (3, 1), (3, 5), -- Empleado tiene permisos de lectura de clientes y usuarios
    (4, 1); -- Cliente tiene permiso de lectura de clientes


-- Insert para UserClient (Relación entre usuarios y clientes)
INSERT INTO "UserClient" (user_id, client_id)
VALUES
    (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10);

-- Insert para UserClient_history (Historial de la relación entre usuarios y clientes)
INSERT INTO "UserClient_history" (user_id, client_id)
VALUES
    (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10);