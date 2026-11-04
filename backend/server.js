import express from 'express'

const app = express();

app.listen(5001, () => {
    console.log('Server bắt đầu trên cổng 5001');
})

app.get('/api/tasks', (req, res) => {
    res.status(200).send('Bạn có một việc cần làm');
})

app.post('/api/tasks', (req, res) => {
    res.status(201).json({message: 'Nhiệm vụ mới đã được thêm thành công'});
})

app.put('/api/tasks/:id', (req, res) => {
    res.status(200).json({message: 'Nhiệm vụ đã được thay đổi thành công'});
})

app.delete('/api/tasks/:id', (req, res) => {
    res.status(200).json({message: 'Nhiệm vụ đã được xoá thành công'});
})
