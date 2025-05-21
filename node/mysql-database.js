const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1108',
    database: 'JoyBoy' // مطمئن شوید این نام دقیقاً با نام پایگاه داده شما یکسان است
}).promise();

const getCourses = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM courses');
        console.log(rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

getCourses();
1.30