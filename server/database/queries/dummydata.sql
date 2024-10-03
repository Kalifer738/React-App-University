INSERT INTO Vacations (title, bodyText, pictureURL, maxUsers, userCount)
VALUES
('Vacation 1', 'An amazing moment for a vacations.', 'http://localhost:5000/images/vacations/vacation1.jpg', 10, 0),
('Vacation 2', 'Another amazing vacation experience.', 'http://localhost:5000/images/vacations/vacation1.jpg', 10, 8),
('Vacation 3', 'A truly special vacation.', 'http://localhost:5000/images/vacations/vacation1.jpg', 1, 0);


INSERT INTO Users (userName, telephone)
VALUES
    ('John Doe', '123-456-7890'),
    ('Jane Smith', '987-654-3210'),
    ('Alice Johnson', '555-555-5555'),
    ('Bob Brown', '222-222-2222'),
    ('Charlie Davis', '333-333-3333'),
    ('David Wilson', '444-444-4444');

INSERT INTO Reservations (userId, vacationId, active, requestCancellation)
VALUES
    (1, 2, 1, 0),
    (2, 2, 1, 0),
    (3, 2, 1, 0),
    (4, 2, 1, 0),
    (5, 2, 1, 0),
    (1, 2, 1, 0),
    (2, 2, 1, 1),
    (3, 2, 1, 0);