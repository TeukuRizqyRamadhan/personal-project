// index.js
import client from './src/database/db.js';

// Lakukan operasi database
client.query('SELECT * FROM projects', (err, result) => {
    if (err) {
        console.error('Error executing query', err);
        client.end(); // Pastikan untuk menutup koneksi setelah selesai
        return;
    }

    console.log('Query result:', result.rows);

    // Lakukan tindakan lain atau respon HTTP di sini

    client.end(); // Pastikan untuk menutup koneksi setelah selesai
});
