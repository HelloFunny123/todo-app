# TODO APP — GHI CHÚ THAO TÁC TỪNG BƯỚC

**Cách dùng file này:** Làm từ trên xuống, đúng thư mục, đúng tên file. Mỗi phần có lệnh cần chạy → code cần nhập → kết quả cần kiểm tra. Không có timeline hay phần chép lại lời giảng.

**Lưu ý về nguồn:** Bản transcript không chứa toàn bộ code hiện trên màn hình, nhất là CSS, một số component và cấu hình deploy. Các đoạn code dưới đây là **bản dựng lại để có thể thực hành chạy được theo đúng luồng video**, không phải bản copy 100% source của tác giả. Chỗ cần tệp riêng do tác giả cung cấp sẽ nói rõ. Mình cũng sửa các lệnh mà bản nhận dạng giọng nói ghi nhầm để tránh lỗi khi thực hành.

---

# 1. CHUẨN BỊ MÔI TRƯỜNG VÀ THƯ MỤC

```text
1. Cài Node.js LTS (Long Term Support)
   - Vào: https://nodejs.org/
   - Chọn bản LTS phù hợp macOS/Windows.
   - Cài xong mở Terminal:
       node -v
       npm -v
   - Có số phiên bản hiện ra là OK.

2. Cài Visual Studio Code nếu máy chưa có.

3. Tạo thư mục dự án:
   todo_app/
       backend/
       frontend/

4. Mở todo_app bằng VS Code.
   - Mở Terminal: Control + ` hoặc View > Terminal.
   - Trên VS Code cho macOS có thể bật/tắt panel bằng Cmd + J.

5. Đứng tại thư mục todo_app, vào backend:
       cd backend
   Kiểm tra đang ở đúng thư mục:
       pwd

   Ghi nhớ:
       cd backend    -> đi vào thư mục backend
       cd ..         -> quay lại thư mục cha
       ls            -> liệt kê file/thư mục (macOS/Linux)
       Ctrl + C      -> dừng server đang chạy
```

# 2. BACKEND — KHỞI TẠO NODE.JS + EXPRESS

## 2.1. Khởi tạo backend

**Terminal đang ở `todo_app/backend`:**

```bash
npm init -y
npm install express@4.18.2
```

```text
- npm init -y tạo package.json ngay, không hỏi từng thông tin.
  (Bản ghi âm dễ bị nhận nhầm thành "npm init -i"; dùng -y mới là lệnh chuẩn.)
- npm install express@4.18.2 cài Express đúng phiên bản video.
- Sau khi cài thấy:
    backend/
        node_modules/
        package-lock.json
        package.json
- node_modules: thư viện đã cài.
- package-lock.json: ghi phiên bản phụ thuộc cụ thể.
- package.json: thông tin dự án, thư viện và scripts.
```

## 2.2. Tạo server.js ở thư mục backend

**Tạo `todo_app/backend/server.js`:**

```js
import express from "express";

const app = express();
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server bắt đầu trên cổng ${PORT}`);
});
```

**Sửa `backend/package.json`:**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

```text
- "type": "module" cho phép cú pháp ES Modules:
      import express from "express";
  Nếu không dùng type: module thì với CommonJS thường dùng require(...).
- Port 5001 là cổng backend đang lắng nghe.
- Port khác như 3000, 5000, 5173, 8000, 8080 cũng có thể dùng
  NẾU cổng đó chưa bị ứng dụng khác chiếm.
```

**Chạy thử:**

```bash
node server.js
```

Kỳ vọng ở Terminal:

```text
Server bắt đầu trên cổng 5001
```

Dừng server bằng `Ctrl + C`.

## 2.3. Dùng scripts để chạy nhanh hơn

Trong `backend/package.json`, đã có:

```json
"scripts": {
  "dev": "node server.js"
}
```

Thay vì `node server.js`, chạy:

```bash
npm run dev
```

## 2.4. Dùng nodemon để tự restart khi lưu code

**Dừng server trước (`Ctrl + C`), rồi chạy:**

```bash
npm install nodemon -D
```

```text
- -D = --save-dev, cài vào devDependencies.
- Dự án sẽ có phần tương tự:
    "devDependencies": {
      "nodemon": "^3.1.14"
    }
- Số phiên bản thực tế có thể khác số trên.
```

**Sửa scripts trong `backend/package.json`:**

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

```text
- dev: dùng khi đang code → nodemon tự khởi động lại sau khi sửa file.
- start: dùng khi chạy production/deploy → dùng node thông thường.
- Có thể bỏ script "test" mặc định nếu chưa dùng tới.
```

**Chạy lại:**

```bash
npm run dev
```

Thử sửa thông báo `console.log(...)`, lưu file → thấy nodemon restart tự động.

# 3. BACKEND — THỬ TẠO API CRUD TRƯỚC KHI CÓ DATABASE

## 3.1. GET /api/tasks

**Mở `backend/server.js`, đặt route phía TRƯỚC `app.listen`:**

```js
import express from "express";

const app = express();
const PORT = 5001;

app.get("/api/tasks", (req, res) => {
  res.status(200).send("Bạn có một việc cần làm");
});

app.listen(PORT, () => {
  console.log(`Server bắt đầu trên cổng ${PORT}`);
});
```

```text
- app.get: nhận GET request.
- "/api/tasks": URL endpoint (đường dẫn API).
- req (request): thông tin do client gửi lên.
- res (response): dữ liệu backend gửi trả về.
- status(200): thành công.
- send(...): gửi nội dung trả về.
```

Mở trình duyệt:

```text
http://localhost:5001/api/tasks
```

Kỳ vọng thấy: `Bạn có một việc cần làm`.

Mở `http://localhost:5001` khi chưa khai báo `/` sẽ thấy `Cannot GET /` — đây không phải lỗi server.

## 3.2. Thêm POST, PUT, DELETE (API giả lập)

**Thay phần route trong `server.js` bằng:**

```js
app.get("/api/tasks", (req, res) => {
  res.status(200).json({ message: "Lấy danh sách nhiệm vụ thành công" });
});

app.post("/api/tasks", (req, res) => {
  res.status(201).json({ message: "Nhiệm vụ mới đã được thêm thành công" });
});

app.put("/api/tasks/:id", (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được thay đổi thành công" });
});

app.delete("/api/tasks/:id", (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được xóa thành công" });
});
```

```text
CRUD:
    Create -> POST   /api/tasks
    Read   -> GET    /api/tasks
    Update -> PUT    /api/tasks/:id
    Delete -> DELETE /api/tasks/:id

- :id là route parameter: một phần URL thay đổi được.
  Ví dụ: PUT /api/tasks/123 -> req.params.id === "123".
- Dấu : báo Express biết đây là tham số, không phải chữ "id" cố định.
- req.params.id: lấy ID trên URL.
- res.status(201): tài nguyên được tạo thành công.
- res.json({...}): trả về JSON cho client.
- Ở bước này chưa có MongoDB nên các API chỉ trả message, CHƯA lưu dữ liệu.
```

# 4. BACKEND — TÁCH SERVER, ROUTES, CONTROLLERS

## 4.1. Chuyển server.js vào src

**Tạo thư mục và di chuyển file:**

```text
backend/
    src/
        server.js
```

**Sửa `backend/package.json`:**

```json
"main": "src/server.js",
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

Chạy thử `npm run dev` → server vẫn khởi động bình thường.

## 4.2. Tách routes

**Tạo `backend/src/routes/taskRoutes.js`:**

```js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Lấy danh sách nhiệm vụ thành công" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Nhiệm vụ mới đã được thêm thành công" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được thay đổi thành công" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được xóa thành công" });
});

export default router;
```

**Sửa `backend/src/server.js`:**

```js
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 5001;

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server bắt đầu trên cổng ${PORT}`);
});
```

```text
- app.use("/api/tasks", taskRoutes) gắn tiền tố chung.
- Trong taskRoutes.js:
      router.get("/")      -> GET    /api/tasks
      router.post("/")     -> POST   /api/tasks
      router.put("/:id")   -> PUT    /api/tasks/123
      router.delete("/:id")-> DELETE /api/tasks/123
- Import file nội bộ với Node ES Modules nhớ có đuôi .js.
```

Mở `http://localhost:5001/api/tasks` để thử lại.

## 4.3. Tách controllers

**Tạo `backend/src/controllers/taskController.js`:**

```js
export const getTasks = (req, res) => {
  res.status(200).json({ message: "Lấy danh sách nhiệm vụ thành công" });
};

export const createTask = (req, res) => {
  res.status(201).json({ message: "Nhiệm vụ mới đã được thêm thành công" });
};

export const updateTask = (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được thay đổi thành công" });
};

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Nhiệm vụ đã được xóa thành công" });
};
```

**Rút gọn `backend/src/routes/taskRoutes.js`:**

```js
import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
```

```text
- server.js: mở server, khai báo middleware, gắn route.
- routes/taskRoutes.js: định nghĩa URL + HTTP method.
- controllers/taskController.js: xử lý nghiệp vụ của từng API.
- Bây giờ kiểm tra GET lại, kết quả vẫn giống trước.
```

# 5. MONGODB ATLAS — TẠO DATABASE

**Thực hiện trên MongoDB Atlas (https://www.mongodb.com/atlas):**

```text
1. Tạo tài khoản / đăng nhập (có thể dùng Google).
2. Tạo Project mới, ví dụ: todo_app.
3. Chọn Create Deployment / Cluster.
4. Chọn gói Free phù hợp nếu có.
5. Bỏ chọn Preload sample data (nếu xuất hiện).
6. Tạo Database User:
     - Tạo username.
     - Tạo mật khẩu mạnh.
     - Lưu vào trình quản lý mật khẩu, không đưa vào GitHub.
7. Chọn Connect -> Drivers -> Node.js.
8. Sao chép chuỗi kết nối dạng:
     mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
9. Thay <username>, <password>, <cluster-host> bằng giá trị thật.
     - Ví dụ database đặt là todo_db.
     - Nếu mật khẩu có ký tự đặc biệt, cần URL-encode trước khi ghép chuỗi.
10. Vào Network Access, cho phép IP của máy đang dùng.
     - Trong video chọn "Access from anywhere" để dễ thao tác.
     - Lưu ý: không nên mở mọi IP lâu dài nếu không cần thiết;
       luôn dùng tài khoản DB có quyền tối thiểu và mật khẩu mạnh.
11. Database ban đầu trống là bình thường. Collection sẽ xuất hiện khi lưu dữ liệu.
```

# 6. BACKEND — KẾT NỐI MONGODB VỚI MONGOOSE

## 6.1. Cài Mongoose + dotenv

**Terminal ở `todo_app/backend`:**

```bash
npm install mongoose dotenv
```

**Tạo cấu trúc:**

```text
backend/
    .env
    .gitignore
    src/
        config/
            db.js
        controllers/
            taskController.js
        models/
            Task.js
        routes/
            taskRoutes.js
        server.js
```

## 6.2. Biến môi trường trong .env

**Tạo `backend/.env`:**

```dotenv
PORT=5001
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_HOST/todo_db?retryWrites=true&w=majority
NODE_ENV=development
```

**Tạo `backend/.gitignore`:**

```gitignore
.env
node_modules/
```

```text
- Thay YOUR_USERNAME, YOUR_PASSWORD, YOUR_CLUSTER_HOST bằng thông tin THẬT
  trong file .env trên máy, KHÔNG gửi file đó lên GitHub.
- Nếu lỡ commit mật khẩu rồi, xóa khỏi Git chưa đủ: phải đổi mật khẩu DB.
- process.env.MONGODB_URI: lấy giá trị MONGODB_URI từ môi trường.
```

## 6.3. Hàm kết nối database

**Tạo `backend/src/config/db.js`:**

```js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi kết nối cơ sở dữ liệu:", error);
    throw error;
  }
};
```

## 6.4. Sửa server.js để đọc .env, chờ DB trước khi listen

**Thay `backend/src/server.js`:**

```js
import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/tasks", taskRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server bắt đầu trên cổng ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
```

```text
- dotenv.config(): nạp biến trong .env.
- express.json(): middleware đọc body JSON để có req.body.
- connectDB() là async, trả Promise.
- .then(...): chỉ mở server khi kết nối database thành công.
- .catch(...): lỗi DB thì thoát ứng dụng với exit code 1.
```

**Test:**

```bash
npm run dev
```

Kỳ vọng:

```text
Kết nối cơ sở dữ liệu thành công
Server bắt đầu trên cổng 5001
```

# 7. BACKEND — TẠO TASK MODEL

**Tạo `backend/src/models/Task.js`:**

```js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
```

```text
Một Task có:
    _id         -> MongoDB tự tạo ID.
    title       -> tên nhiệm vụ, bắt buộc, xóa khoảng trắng đầu/cuối.
    status      -> "active" hoặc "completed".
    completedAt -> thời điểm hoàn thành, mặc định null.
    createdAt   -> thời gian tạo, do timestamps tự thêm.
    updatedAt   -> thời gian sửa, do timestamps tự cập nhật.

- Schema: định nghĩa cấu trúc dữ liệu.
- Model: đối tượng dùng để query, tạo, cập nhật, xóa dữ liệu.
- MongoDB lưu trong collection theo model (thường tự dùng tên dạng số nhiều).
```

# 8. BACKEND — VIẾT CRUD THẬT VỚI DATABASE

**Thay TOÀN BỘ `backend/src/controllers/taskController.js` bằng code dưới đây:**

```js
import mongoose from "mongoose";
import Task from "../models/Task.js";

// GET /api/tasks - lấy toàn bộ task, mới nhất trước
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Lỗi khi gọi getTasks:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// POST /api/tasks - tạo nhiệm vụ
export const createTask = async (req, res) => {
  try {
    const { title } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Tên nhiệm vụ không được rỗng" });
    }

    const task = new Task({ title });
    const newTask = await task.save();
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTask:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// PUT /api/tasks/:id - cập nhật nhiệm vụ
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const { title, status, completedAt } = req.body ?? {};
    const changes = {};
    if (title !== undefined) changes.title = title;
    if (status !== undefined) changes.status = status;
    if (completedAt !== undefined) changes.completedAt = completedAt;

    const updatedTask = await Task.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTask:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// DELETE /api/tasks/:id - xóa nhiệm vụ
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    return res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Lỗi khi gọi deleteTask:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
```

```text
- async/await: chờ câu lệnh làm việc với database hoàn tất.
- try/catch: xử lý lỗi để server không trả exception ngoài ý muốn.
- Task.find(): lấy task.
- .sort({ createdAt: -1 }): mới tạo nằm trước, -1 = giảm dần.
- new Task({ title }): tạo document trong bộ nhớ.
- await task.save(): lưu vào MongoDB.
- req.body: dữ liệu JSON người dùng gửi lên.
- req.params.id: ID trên URL /api/tasks/:id.
- Task.findByIdAndUpdate(..., { new: true }): trả bản sau khi sửa.
- runValidators: true: kiểm tra schema khi update.
- Task.findByIdAndDelete(id): tìm theo ID rồi xóa.
- 400: dữ liệu yêu cầu không hợp lệ; 404: không tìm thấy; 500: lỗi server.
```

# 9. TEST API BẰNG THUNDER CLIENT

```text
1. Trong VS Code → Extensions → tìm "Thunder Client" → Install.
2. Nhấn biểu tượng tia sét → New Request.
3. Đảm bảo backend đang chạy ở port 5001.
```

**Test 1 — GET:**

```text
Method: GET
URL: http://localhost:5001/api/tasks
Body: không cần
Send → lúc chưa có task sẽ trả về [] và status 200.
```

**Test 2 — POST:**

```text
Method: POST
URL: http://localhost:5001/api/tasks
Tab Body -> JSON:
```

```json
{
  "title": "Học Node.js và Express"
}
```

```text
Send → status 201.
Response có: _id, title, status="active", completedAt=null, createdAt, updatedAt.
Lưu lại giá trị _id để test PUT, DELETE.
```

**Test 3 — GET lại:**

```text
GET http://localhost:5001/api/tasks
→ mảng có task vừa tạo.
```

**Test 4 — PUT:**

```text
Method: PUT
URL: http://localhost:5001/api/tasks/<_id thật vừa copy>
Body -> JSON:
```

```json
{
  "title": "Học React.js",
  "status": "completed",
  "completedAt": "2026-11-04T05:00:00.000Z"
}
```

```text
Send → status 200, nhận task đã đổi.
completedAt ở đây chỉ là ngày mẫu để kiểm tra API.
Đổi status về active thì nên cho completedAt = null.

- PUT thường biểu thị thay thế toàn phần về ngữ nghĩa HTTP.
- Controller mẫu này cho phép gửi một phần field; có thể dùng PATCH
  nếu muốn thể hiện rõ thao tác cập nhật từng phần.
```

**Test 5 — DELETE:**

```text
Method: DELETE
URL: http://localhost:5001/api/tasks/<_id thật>
Send → status 200, nhận task vừa bị xóa.
GET lại → danh sách không còn task đó.
```

**Đến đây:** backend CRUD + MongoDB chạy được; chuyển qua frontend.

---
# 10. FRONTEND — KHỞI TẠO REACT + VITE

## 10.1. Chuyển terminal sang frontend

**Dừng backend bằng `Ctrl + C` nếu muốn dùng cùng Terminal** (hoặc mở Terminal thứ hai, để backend tiếp tục chạy).

```bash
cd ..
cd frontend
npm create vite@latest .
```

```text
Khi Vite hỏi:
    Framework  -> React
    Variant    -> JavaScript
    Các câu hỏi phụ nếu có -> chọn phương án mặc định phù hợp.

Dấu "." = tạo ứng dụng ngay trong thư mục frontend đang đứng.
```

**Cài thư viện và chạy thử:**

```bash
npm install
npm run dev
```

Mở URL Vite hiển thị ở Terminal, thường là:

```text
http://localhost:5173
```

Kỳ vọng thấy trang mẫu React/Vite.

## 10.2. Dọn trang mẫu

```text
frontend/
    src/
        App.jsx
        App.css        -> có thể xóa
        index.css
        main.jsx

1. Xóa giao diện logo/count mẫu trong App.jsx.
2. Xóa import "./App.css" nếu đang có.
3. Giữ import "./index.css" trong main.jsx.
4. Sửa title trong frontend/index.html thành Todo X.
```

**`frontend/src/App.jsx` tạm thời:**

```jsx
function App() {
  return <h1>Todo X</h1>;
}

export default App;
```

## 10.3. Cài package frontend

**Terminal tại `todo_app/frontend`:**

```bash
npm install react-router sonner axios lucide-react
```

```text
- react-router: điều hướng trang trong React.
- sonner: thông báo toast thành công/thất bại.
- axios: gọi API backend.
- lucide-react: bộ icon giao diện.
```

## 10.4. Tạo HomePage và NotFound

**Tạo hai file:**

```text
frontend/src/pages/
    HomePage.jsx
    NotFound.jsx
```

**`frontend/src/pages/HomePage.jsx` tạm thời:**

```jsx
function HomePage() {
  return <div>HomePage</div>;
}

export default HomePage;
```

**`frontend/src/pages/NotFound.jsx`:**

```jsx
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-8xl font-bold text-violet-600">404</p>
      <h1 className="text-3xl font-bold">Không tìm thấy trang</h1>
      <p className="text-slate-500">Đường dẫn bạn nhập không tồn tại.</p>
      <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">
        <ArrowLeft size={18} /> Về trang chủ
      </Link>
    </main>
  );
}

export default NotFound;
```

**Lưu ý:** Video dùng ảnh 404 lấy từ bộ tài liệu riêng; transcript không kèm ảnh đó. Code trên dùng chữ 404 thay thế để không bị thiếu asset.

## 10.5. Cài React Router + Sonner trong App.jsx

**Thay `frontend/src/App.jsx`:**

```jsx
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

```text
- BrowserRouter: bật điều hướng dựa trên URL.
- Routes: nơi chứa các Route.
- path="/": trang chủ.
- path="*": mọi URL khác → trang 404.
- Toaster: vị trí hiển thị các thông báo từ toast.success/error.
```

**Test:**

```text
http://localhost:5173/       -> HomePage
http://localhost:5173/abcxyz  -> trang 404
```

# 11. FRONTEND — CÀI TAILWIND CSS V4 VÀ SHADCN/UI

## 11.1. Cài Tailwind CSS v4

**Đứng ở `frontend`, chạy:**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Mở `frontend/vite.config.js`, sửa:**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Mở `frontend/src/index.css` (trước khi shadcn khởi tạo):**

```css
@import "tailwindcss";
```

**Thử Tailwind trong HomePage.jsx:**

```jsx
function HomePage() {
  return <h1 className="text-3xl font-bold underline">Hello World</h1>;
}
export default HomePage;
```

Kỳ vọng chữ `Hello World` to, đậm, có gạch chân. Nếu chưa lên style thì dừng Vite và `npm run dev` lại.

## 11.2. Alias @/ và shadcn/ui

**Tạo `frontend/jsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```text
- Import truyền thống: ../../components/...
- Với alias:       @/components/...
- vite.config.js đã khai báo alias tương ứng ở bước trên.
```

**Cài shadcn/ui:**

```bash
npx shadcn@latest init
```

```text
- Chọn theme/base color (trong video dùng Slate).
- CLI sẽ hỏi một vài thông tin tùy phiên bản.
- Kiểm tra đã tạo components.json, src/lib/utils.js,
  và cấu hình CSS cần thiết hay chưa.
- Giữ những CSS/tokens mà shadcn tự sinh; đừng ghi đè tùy tiện.
```

**Cài các component trong video và component cần cho code bên dưới:**

```bash
npx shadcn@latest add button input card badge pagination command popover checkbox
```

Kỳ vọng:

```text
frontend/src/components/ui/
    button.jsx
    input.jsx
    card.jsx
    badge.jsx
    pagination.jsx
    command.jsx
    popover.jsx
    checkbox.jsx
    ...
```

```text
- shadcn/ui đưa source code component vào dự án để mình tự chỉnh.
- clsx + tailwind-merge thường được shadcn cài để hỗ trợ hàm cn(...).
- Video dùng index.css, tailwind.config.js và ảnh 404 từ tài liệu riêng.
  Các file đó không xuất hiện trong transcript, nên không thể chép đúng
  theme/animation như hình mẫu tác giả.
- Với Tailwind v4, tập trung dùng CSS tokens do shadcn init tạo;
  không cần tự tạo tailwind.config.js trừ khi có cấu hình tương thích.
```

## 11.3. Thêm nền đơn giản để dễ nhìn

**Sau nội dung do shadcn sinh trong `src/index.css`, có thể thêm:**

```css
body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 10%, #ede9fe 0%, transparent 38%),
    radial-gradient(circle at 90% 15%, #fce7f3 0%, transparent 35%),
    #f8fafc;
}
```

**Nếu muốn nền PatternCraft như video:** truy cập `patterncraft.fun`, chọn mẫu rồi copy mã Tailwind vào wrapper của HomePage. Đây là bước tùy chọn, không bắt buộc để chức năng hoạt động.

# 12. FRONTEND — CHIA COMPONENT ĐÚNG THỨ TỰ

**Tạo các file:**

```text
frontend/src/
    components/
        Header.jsx
        AddTask.jsx
        StatsAndFilters.jsx
        TaskList.jsx
        TaskCard.jsx
        TaskListPagination.jsx
        DateTimeFilter.jsx
        Footer.jsx
    pages/
        HomePage.jsx
        NotFound.jsx
    lib/
        axios.js         (sẽ tạo lúc kết nối API)
```

```text
Chức năng của từng component:
    Header              -> tên app + slogan.
    AddTask             -> ô nhập nhiệm vụ mới.
    StatsAndFilters     -> thống kê và nút lọc trạng thái.
    TaskList            -> danh sách TaskCard / empty state.
    TaskCard            -> một công việc + checkbox + sửa + xóa.
    TaskListPagination  -> nút trang trước, số trang, trang sau.
    DateTimeFilter      -> lọc hôm nay/tuần này/tháng này/tất cả.
    Footer              -> thông báo động viên theo số task.

HomePage sẽ chứa state + logic gọi API và truyền props cho các component.
```

# 13. FRONTEND — VIẾT GIAO DIỆN TỪNG COMPONENT

## 13.1. Header.jsx

**`frontend/src/components/Header.jsx`:**

```jsx
function Header() {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-violet-700">
        Todo X
      </h1>
      <p className="text-slate-600">
        Không có việc gì khó, chỉ sợ mình không làm!
      </p>
    </header>
  );
}

export default Header;
```

## 13.2. AddTask.jsx

**`frontend/src/components/AddTask.jsx`:**

```jsx
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function AddTask({ onAddTask, loading = false }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const success = await onAddTask(cleanTitle);
    if (success) setTitle("");
  };

  return (
    <Card className="p-5 border-0 shadow-lg bg-white/85">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Cần phải làm gì?"
          className="h-12 flex-1"
          maxLength={200}
        />
        <Button type="submit" disabled={loading || !title.trim()} className="h-12 px-5">
          <Plus className="mr-2 h-4 w-4" /> Thêm nhiệm vụ
        </Button>
      </form>
    </Card>
  );
}

export default AddTask;
```

```text
- onAddTask là function HomePage truyền xuống.
- useState title: lưu chữ đang nhập.
- event.preventDefault(): tránh form reload trang.
- .trim(): xóa khoảng trắng thừa.
- Chỉ xóa ô nhập sau khi API trả thành công.
```

## 13.3. StatsAndFilters.jsx

**`frontend/src/components/StatsAndFilters.jsx`:**

```jsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const options = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Đang làm" },
  { value: "completed", label: "Hoàn thành" },
];

function StatsAndFilters({ activeTaskCount = 0, completedTaskCount = 0, filter, setFilter }) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center bg-white/85">
          <p className="text-sm text-slate-500">Đang làm</p>
          <p className="text-3xl font-bold text-amber-600">{activeTaskCount}</p>
        </Card>
        <Card className="p-4 text-center bg-white/85">
          <p className="text-sm text-slate-500">Hoàn thành</p>
          <p className="text-3xl font-bold text-emerald-600">{completedTaskCount}</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={filter === option.value ? "default" : "outline"}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

export default StatsAndFilters;
```

```text
- activeTaskCount: số task active trả từ API.
- completedTaskCount: số task completed trả từ API.
- filter: giá trị đang chọn (all/active/completed).
- setFilter: đổi trạng thái lọc khi bấm nút.
```

## 13.4. TaskCard.jsx (checkbox, sửa, xóa)

**`frontend/src/components/TaskCard.jsx`:**

```jsx
import { useEffect, useState } from "react";
import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

function TaskCard({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [busy, setBusy] = useState(false);
  const isCompleted = task.status === "completed";

  useEffect(() => {
    setNewTitle(task.title);
  }, [task.title]);

  const handleSave = async () => {
    const cleanTitle = newTitle.trim();
    if (!cleanTitle) return;
    setBusy(true);
    try {
      const success = await onEditTask(task._id, cleanTitle);
      if (success) setIsEditing(false);
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async () => {
    setBusy(true);
    try {
      await onToggleTask(task);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await onDeleteTask(task._id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-4 bg-white/90 shadow-sm">
      <div className="flex items-start gap-3">
        <Checkbox
          className="mt-2"
          checked={isCompleted}
          disabled={busy}
          onCheckedChange={handleToggle}
          aria-label="Đổi trạng thái nhiệm vụ"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSave();
                  if (event.key === "Escape") setIsEditing(false);
                }}
                autoFocus
              />
              <Button disabled={busy || !newTitle.trim()} size="icon" onClick={handleSave} aria-label="Lưu">
                <Check className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => setIsEditing(false)} aria-label="Hủy">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className={isCompleted ? "line-through text-slate-400" : "text-slate-900 font-medium"}>
              {task.title}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Tạo: {new Date(task.createdAt).toLocaleString("vi-VN")}</span>
            {task.completedAt && (
              <span>• Hoàn thành: {new Date(task.completedAt).toLocaleString("vi-VN")}</span>
            )}
            <Badge variant={isCompleted ? "secondary" : "outline"}>
              {isCompleted ? "Hoàn thành" : "Đang làm"}
            </Badge>
          </div>
        </div>

        {!isEditing && (
          <div className="flex shrink-0 gap-1">
            <Button size="icon" variant="ghost" disabled={busy} onClick={() => setIsEditing(true)} aria-label="Sửa">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" disabled={busy} onClick={handleDelete} aria-label="Xóa">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default TaskCard;
```

```text
- task._id: ID nhận từ MongoDB.
- Checkbox: khi click sẽ gọi onToggleTask(task).
- isEditing: true -> biến text thành ô nhập để đổi title.
- Nút bút chì: bật chế độ sửa.
- Nút Check: lưu tiêu đề mới bằng API PUT.
- Nút thùng rác: gọi API DELETE.
- toLocaleString("vi-VN"): hiển thị ngày giờ theo môi trường máy người xem.
  (Muốn cố định múi giờ Việt Nam có thể truyền thêm timeZone: "Asia/Ho_Chi_Minh".)
```

## 13.5. TaskList.jsx + giao diện chưa có nhiệm vụ

**`frontend/src/components/TaskList.jsx`:**

```jsx
import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, loading, onToggleTask, onEditTask, onDeleteTask }) {
  if (loading) {
    return <p className="text-center py-10 text-slate-500">Đang tải nhiệm vụ...</p>;
  }

  if (!tasks.length) {
    return (
      <div className="rounded-2xl bg-white/75 p-10 text-center shadow-sm space-y-3">
        <ClipboardList className="mx-auto h-12 w-12 text-violet-400" />
        <h2 className="font-semibold text-lg">Chưa có nhiệm vụ nào</h2>
        <p className="text-slate-500 text-sm">Thêm một công việc hoặc thử đổi bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
```

```text
- Dùng .map() tạo một TaskCard cho mỗi task.
- key={task._id}: React nhận diện từng phần tử ổn định.
- tasks.length === 0: hiện empty state.
- loading=true: hiển thị thông báo chờ.
```

## 13.6. DateTimeFilter.jsx (hôm nay/tuần này/tháng này/tất cả)

**`frontend/src/components/DateTimeFilter.jsx`:**

```jsx
import { useState } from "react";
import { CalendarDays, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

const dateOptions = [
  { value: "today", label: "Hôm nay" },
  { value: "week", label: "Tuần này" },
  { value: "month", label: "Tháng này" },
  { value: "all", label: "Tất cả thời gian" },
];

function DateTimeFilter({ dateQuery, setDateQuery }) {
  const [open, setOpen] = useState(false);
  const label = dateOptions.find((option) => option.value === dateQuery)?.label || "Hôm nay";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" /> {label}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="end">
        <Command>
          <CommandList>
            <CommandGroup>
              {dateOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => { setDateQuery(option.value); setOpen(false); }}
                >
                  <Check className={dateQuery === option.value ? "mr-2 h-4 w-4" : "mr-2 h-4 w-4 opacity-0"} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DateTimeFilter;
```

```text
- dateQuery = today/week/month/all.
- setDateQuery: đổi filter khi người dùng chọn.
- HomePage theo dõi dateQuery để gọi lại API.
- Video dùng shadcn Popover + Command; trên đây là bản tương đương.
```

## 13.7. TaskListPagination.jsx (số trang + dấu ...)

**`frontend/src/components/TaskListPagination.jsx`:**

```jsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

function generatePages(page, totalPages) {
  const pages = [...new Set([1, totalPages, page - 1, page, page + 1])]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);

  const output = [];
  let previous = 0;
  for (const current of pages) {
    if (previous && current - previous > 1) output.push("...");
    output.push(current);
    previous = current;
  }
  return output;
}

function TaskListPagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const pages = generatePages(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={(event) => {
              event.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
          />
        </PaginationItem>

        {pages.map((value, index) =>
          value === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={value}>
              <PaginationLink
                href="#"
                isActive={page === value}
                onClick={(event) => {
                  event.preventDefault();
                  setPage(value);
                }}
              >
                {value}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={(event) => {
              event.preventDefault();
              if (page < totalPages) setPage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TaskListPagination;
```

```text
- page: trang hiện tại (bắt đầu từ 1).
- totalPages: tổng số trang.
- setPage: hàm chuyển trang.
- Không phải trang 1 thì mới có thể bấm Previous.
- Không phải trang cuối thì mới có thể bấm Next.
- Nếu có quá nhiều trang, hiển thị "..." thay vì in hết tất cả.
- Phần phân trang theo video là cắt mảng ở frontend bằng slice().
```

## 13.8. Footer.jsx

**`frontend/src/components/Footer.jsx`:**

```jsx
function Footer({ activeTaskCount = 0, completedTaskCount = 0 }) {
  if (activeTaskCount + completedTaskCount === 0) return null;

  return (
    <footer className="text-center text-sm text-slate-500 pb-8">
      {completedTaskCount > 0 ? (
        <p>
          🎉 Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} việc
          {activeTaskCount > 0 ? `, còn ${activeTaskCount} việc nữa thôi. Cố lên!` : "."}
        </p>
      ) : (
        <p>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!</p>
      )}
    </footer>
  );
}

export default Footer;
```

# 14. FRONTEND — TẠO KHUNG HOMEPAGE VÀ KIỂM TRA UI

**Ở giai đoạn này chưa cần nối backend.** Tạo bộ khung và dữ liệu mẫu để biết component được import đúng.

**Thay `frontend/src/pages/HomePage.jsx` bằng code TẠM:**

```jsx
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { useState } from "react";

function HomePage() {
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  return (
    <main className="container mx-auto px-4 pt-10">
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-6">
        <Header />
        <AddTask onAddTask={async () => false} />
        <StatsAndFilters activeTaskCount={0} completedTaskCount={0} filter={filter} setFilter={setFilter} />
        <TaskList tasks={[]} loading={false} onToggleTask={() => {}} onEditTask={() => {}} onDeleteTask={() => {}} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <TaskListPagination page={page} totalPages={1} setPage={setPage} />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>
        <Footer activeTaskCount={0} completedTaskCount={0} />
      </div>
    </main>
  );
}

export default HomePage;
```

**Chạy `npm run dev` và kiểm tra:**

```text
- Thấy chữ Todo X, slogan, input, nút Thêm nhiệm vụ.
- Hai ô thống kê đều bằng 0.
- Có 3 nút lọc trạng thái.
- Danh sách trống có thông báo chưa có nhiệm vụ.
- Có nút lọc thời gian.
- AddTask, sửa, xóa chưa hoạt động — đúng vì chưa nối API.
```

---
# 15. KẾT NỐI FRONTEND VỚI BACKEND — CORS VÀ AXIOS

## 15.1. Bật lại backend + frontend

**Terminal 1:**

```bash
cd todo_app/backend
npm run dev
```

**Terminal 2:**

```bash
cd todo_app/frontend
npm run dev
```

```text
- Backend:  http://localhost:5001
- Frontend: http://localhost:5173
- Hai port khác nhau = hai origin khác nhau.
- Nếu frontend gọi backend mà chưa cho phép sẽ có lỗi CORS.
```

## 15.2. Cài CORS cho backend

**Dừng backend rồi chạy trong `backend`:**

```bash
npm install cors
```

**Mở `backend/src/server.js`, import:**

```js
import cors from "cors";
```

**Thêm trước `app.use("/api/tasks", taskRoutes)`:**

```js
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
```

**Đoạn middleware đang có sẽ là:**

```js
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoutes);
```

```text
- Trong development: cho phép localhost:5173 gọi localhost:5001.
- Trên production nếu frontend/backend cùng domain thì không cần cấu hình CORS riêng.
- Nếu Vite đang chạy cổng khác (ví dụ 5174), sửa origin cho khớp cổng thực tế.
```

## 15.3. Tạo Axios instance

**Tạo `frontend/src/lib/axios.js`:**

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5001" : "",
});

export default api;
```

```text
- import.meta.env.DEV = true khi npm run dev của Vite.
- Dev: gọi http://localhost:5001/api/tasks.
- Production: baseURL rỗng -> gọi /api/tasks trên chính domain Render.
- Không hardcode localhost vào frontend dùng khi deploy.
```

# 16. BACKEND — THÊM THỐNG KÊ ACTIVE/COMPLETED

**Bây giờ GET /api/tasks sẽ KHÔNG trả mảng thuần nữa.** Đổi API thành object:

```json
{
  "tasks": [],
  "activeCount": 0,
  "completedCount": 0
}
```

## 16.1. Thay hàm getTasks trong taskController.js

**Mở `backend/src/controllers/taskController.js`. Chỉ thay `getTasks`; GIỮ NGUYÊN createTask, updateTask, deleteTask.**

```js
export const getTasks = async (req, res) => {
  try {
    const [result] = await Task.aggregate([
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result?.tasks ?? [];
    const activeCount = result?.activeCount?.[0]?.count ?? 0;
    const completedCount = result?.completedCount?.[0]?.count ?? 0;

    return res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Lỗi khi gọi getTasks:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
```

```text
- Task.aggregate([...]): dùng Aggregation Pipeline của MongoDB.
- $facet: chạy các pipeline con trên cùng đầu vào rồi gom kết quả.
- tasks: sắp xếp task theo createdAt giảm dần.
- activeCount: lọc status="active" rồi đếm.
- completedCount: lọc status="completed" rồi đếm.
- ?. và ?? 0 tránh lỗi nếu mảng đếm không có phần tử.
```

**Thunder Client — GET:**

```text
http://localhost:5001/api/tasks
```

Kỳ vọng JSON có đúng 3 field `tasks`, `activeCount`, `completedCount`.

# 17. FRONTEND — GHÉP API VÀO HOMEPAGE

**Giờ thay hẳn HomePage code tạm ở bước 14.** File dưới đây có:

```text
- GET nhiệm vụ khi vào trang và khi thay bộ lọc thời gian.
- Thống kê active/completed.
- Bộ lọc trạng thái: all/active/completed.
- POST để thêm nhiệm vụ.
- PUT để sửa title.
- PUT để hoàn thành/bỏ hoàn thành.
- DELETE để xóa.
- Thông báo toast.
- Phân trang 4 nhiệm vụ/trang.
- Reset về trang 1 khi đổi bộ lọc.
- Tự lùi trang nếu xóa mất nhiệm vụ cuối ở trang hiện tại.
```

**Thay TOÀN BỘ `frontend/src/pages/HomePage.jsx`:**

```jsx
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";

const VISIBLE_TASK_LIMIT = 4;

function HomePage() {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // GET tasks + thống kê từ backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tasks", {
        params: { filter: dateQuery },
      });

      setTaskBuffer(response.data.tasks ?? []);
      setActiveTaskCount(response.data.activeCount ?? 0);
      setCompletedTaskCount(response.data.completedCount ?? 0);
    } catch (error) {
      console.error("Lỗi khi lấy nhiệm vụ:", error);
      toast.error("Không lấy được danh sách nhiệm vụ");
    } finally {
      setLoading(false);
    }
  }, [dateQuery]);

  // Lấy data khi mở trang / đổi ngày lọc
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Frontend lọc theo trạng thái: all / active / completed
  const filteredTasks = taskBuffer.filter(
    (task) => filter === "all" || task.status === filter
  );

  // Chia mỗi trang 4 task, đúng kiểu slice() trong video
  const totalPages = Math.ceil(filteredTasks.length / VISIBLE_TASK_LIMIT);
  const visibleTasks = filteredTasks.slice(
    (page - 1) * VISIBLE_TASK_LIMIT,
    page * VISIBLE_TASK_LIMIT
  );

  // Chuyển trạng thái hoặc bộ lọc ngày -> về trang 1
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Nếu xóa task ở trang cuối làm tổng trang giảm -> lùi về trang còn tồn tại
  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(1, totalPages)));
  }, [totalPages]);

  // POST /api/tasks
  const handleAddTask = async (title) => {
    setAdding(true);
    try {
      await api.post("/api/tasks", { title });
      toast.success("Đã thêm nhiệm vụ!");
      await fetchTasks();
      setFilter("all");
      setPage(1);
      return true;
    } catch (error) {
      console.error("Lỗi thêm task:", error);
      toast.error("Không thêm được nhiệm vụ");
      return false;
    } finally {
      setAdding(false);
    }
  };

  // PUT /api/tasks/:id - cập nhật title
  const handleEditTask = async (id, title) => {
    try {
      await api.put(`/api/tasks/${id}`, { title });
      toast.success("Đã cập nhật nhiệm vụ!");
      await fetchTasks();
      return true;
    } catch (error) {
      console.error("Lỗi sửa task:", error);
      toast.error("Không cập nhật được nhiệm vụ");
      return false;
    }
  };

  // PUT /api/tasks/:id - đổi trạng thái và ngày hoàn thành
  const handleToggleTask = async (task) => {
    const willComplete = task.status !== "completed";

    try {
      await api.put(`/api/tasks/${task._id}`, {
        status: willComplete ? "completed" : "active",
        completedAt: willComplete ? new Date().toISOString() : null,
      });
      toast.success(willComplete ? "Đã hoàn thành nhiệm vụ!" : "Đã mở lại nhiệm vụ!");
      await fetchTasks();
      return true;
    } catch (error) {
      console.error("Lỗi đổi trạng thái:", error);
      toast.error("Không đổi được trạng thái");
      return false;
    }
  };

  // DELETE /api/tasks/:id
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      toast.success("Đã xóa nhiệm vụ!");
      await fetchTasks();
      return true;
    } catch (error) {
      console.error("Lỗi xóa task:", error);
      toast.error("Không xóa được nhiệm vụ");
      return false;
    }
  };

  return (
    <main className="container mx-auto px-4 pt-10 min-h-screen">
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-6">
        <Header />

        <AddTask onAddTask={handleAddTask} loading={adding} />

        <StatsAndFilters
          activeTaskCount={activeTaskCount}
          completedTaskCount={completedTaskCount}
          filter={filter}
          setFilter={setFilter}
        />

        <TaskList
          tasks={visibleTasks}
          loading={loading}
          onToggleTask={handleToggleTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <TaskListPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>

        <Footer
          activeTaskCount={activeTaskCount}
          completedTaskCount={completedTaskCount}
        />
      </div>
    </main>
  );
}

export default HomePage;
```

**Chú ý:** Ở bước này chưa sửa backend để lọc ngày, nên chọn `today/week/month/all` sẽ vẫn trả cùng dữ liệu. Làm ngay bước 18 để có lọc thật.

## 17.1. Test lần lượt các chức năng đầu tiên

```text
1. Bật backend + frontend.
2. Thêm "Học MongoDB" → phải hiện toast + task xuất hiện.
3. Thêm "Học React" → số Đang làm tăng.
4. Bấm checkbox một task → từ active sang completed.
   - Số Đang làm giảm, Hoàn thành tăng.
   - Title chuyển gạch ngang.
5. Bấm nút chỉnh sửa → sửa title → Save.
6. Bấm nút xóa → task biến mất.
7. Lọc "Đang làm" → chỉ hiện active.
8. Lọc "Hoàn thành" → chỉ hiện completed.
9. Thêm >=5 nhiệm vụ → nút trang 1, trang 2 xuất hiện.
10. Xóa hết nhiệm vụ trang 2 → tự quay về trang 1.
```

# 18. BACKEND — LỌC THEO HÔM NAY / TUẦN NÀY / THÁNG NÀY

**Mở `backend/src/controllers/taskController.js`. Thay hàm `getTasks` vừa tạo ở bước 16 bằng phiên bản cuối này. GIỮ NGUYÊN các hàm CRUD còn lại.**

```js
export const getTasks = async (req, res) => {
  try {
    const filter = req.query.filter || "today";
    const now = new Date();
    let startDate = null;

    switch (filter) {
      case "today": {
        // 00:00 hôm nay theo múi giờ của backend
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      }
      case "week": {
        // Tuần bắt đầu từ thứ Hai
        const day = now.getDay(); // Chủ Nhật=0, thứ Hai=1, ...
        const daysSinceMonday = (day + 6) % 7;
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        startDate.setDate(startDate.getDate() - daysSinceMonday);
        break;
      }
      case "month": {
        // Ngày 1 của tháng hiện tại
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      }
      case "all":
      default:
        startDate = null;
        break;
    }

    // Điều kiện lọc theo ngày tạo task
    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    const [result] = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    return res.status(200).json({
      tasks: result?.tasks ?? [],
      activeCount: result?.activeCount?.[0]?.count ?? 0,
      completedCount: result?.completedCount?.[0]?.count ?? 0,
    });
  } catch (error) {
    console.error("Lỗi khi gọi getTasks:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
```

```text
- req.query.filter: lấy giá trị sau dấu ? trên URL.
- ?filter=today: tạo từ đầu ngày hôm nay trở đi.
- ?filter=week: tạo từ đầu tuần (thứ Hai) trở đi.
- ?filter=month: tạo từ ngày 1 của tháng trở đi.
- ?filter=all: không lọc thời gian.
- $gte: greater than or equal -> lớn hơn hoặc bằng.
- $match: lọc document trước khi $facet chia nhánh.
- $facet: tính danh sách + thống kê trên tập task đã lọc.

Lưu ý: Code video dùng thời gian địa phương của backend. Khi deploy,
server có thể ở múi giờ khác Việt Nam (thường UTC). Nếu cần quy tắc
"hôm nay" luôn theo Việt Nam, phải tính ngày đầu bằng Asia/Ho_Chi_Minh
thay vì phụ thuộc timezone máy chủ.
```

## 18.1. Test bộ lọc ngày bằng Thunder Client

```text
GET http://localhost:5001/api/tasks?filter=today
GET http://localhost:5001/api/tasks?filter=week
GET http://localhost:5001/api/tasks?filter=month
GET http://localhost:5001/api/tasks?filter=all
```

```text
- Lọc today ít task hơn/all là bình thường nếu có task cũ.
- Thử thao tác bộ lọc ở frontend: danh sách và số thống kê thay đổi.
- Frontend đang tự truyền dateQuery bằng axios params.
```

# 19. PHÂN TRANG VÀ 2 LỖI CẦN KIỂM TRA

```text
Phân trang của video:
    VISIBLE_TASK_LIMIT = 4
    totalPages = Math.ceil(filteredTasks.length / VISIBLE_TASK_LIMIT)
    visibleTasks = filteredTasks.slice(
       (page - 1) * VISIBLE_TASK_LIMIT,
       page * VISIBLE_TASK_LIMIT
    )

Ví dụ 10 công việc:
    page 1 -> phần tử 0..3 (4 việc)
    page 2 -> phần tử 4..7 (4 việc)
    page 3 -> phần tử 8..9 (2 việc)
```

```text
Lỗi 1: Đang ở page 3, đổi bộ lọc khiến chỉ còn 1 trang.
    -> setPage(1) khi filter/dateQuery thay đổi.

Lỗi 2: Đang ở page 2, xóa task cuối cùng của page 2.
    -> page không còn hợp lệ nên giảm về page cuối còn tồn tại.

Hai trường hợp này đã xử lý trong HomePage.jsx ở bước 17.
```

**Kiểm tra thực tế:**

```text
1. Thêm 10 task.
2. Kiểm tra có 3 trang.
3. Vào trang 3 → 2 task.
4. Xóa 2 task trên trang 3 → giao diện tự quay về trang 2.
5. Đang ở trang 2 → chọn "Hoàn thành" nếu chỉ còn một trang,
   kiểm tra không còn hiển thị page 2 trống.
```

---
# 20. CHUẨN BỊ DEPLOY — CHẠY FRONTEND VÀ BACKEND CÙNG MỘT PORT

```text
Mục tiêu:
    Khi code local:
       frontend -> localhost:5173 (Vite)
       backend  -> localhost:5001 (Express)

    Khi deploy:
       https://<ten-app>.onrender.com      -> React App
       https://<ten-app>.onrender.com/api/tasks -> API Express

    React được build thành frontend/dist, Express sẽ phục vụ folder dist.
```

## 20.1. Cập nhật server.js để phục vụ React khi production

**Thay TOÀN BỘ `backend/src/server.js` bằng phiên bản cuối:**

```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Xác định folder src của backend khi dùng ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Chỉ cần CORS riêng khi frontend và backend khác port ở local.
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// Đăng ký routes trước route phục vụ React.
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendDist = path.resolve(__dirname, "../../frontend/dist");

  // Trả file HTML/CSS/JS do Vite build.
  app.use(express.static(frontendDist));

  // Những URL không phải API -> trả index.html để React Router xử lý.
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Chỉ chạy server khi MongoDB kết nối thành công.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server bắt đầu trên cổng ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Không thể khởi động server:", error);
    process.exit(1);
  });
```

```text
- fileURLToPath + dirname: lấy vị trí của server.js vì ESM không có sẵn __dirname.
- path.resolve(__dirname, "../../frontend/dist"):
      từ backend/src -> ra todo_app -> vào frontend/dist.
- express.static(frontendDist): trả asset của Vite.
- app.get("*"): các route giao diện sẽ được React Router nhận.
- KHÔNG đưa catch-all GET lên trên /api/tasks.
- Chỉ serve frontend khi NODE_ENV=production.
- Node tự dùng PORT do Render cấp nếu có, nếu không thì 5001.
```

## 20.2. Kiểm tra axios.js sẵn sàng cho deploy

**`frontend/src/lib/axios.js` phải là:**

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5001" : "",
});

export default api;
```

```text
- Đang phát triển: tự gọi backend :5001.
- Đã deploy: gọi API trên chính domain đang mở.
- Không dùng http://localhost:5001 cố định cho production.
```

## 20.3. Tạo package.json tại thư mục gốc todo_app

**Mở Terminal tại `todo_app` (không phải backend hay frontend):**

**Tạo `todo_app/package.json`:**

```json
{
  "name": "todo-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "npm ci --prefix backend && npm ci --include=dev --prefix frontend && npm run build --prefix frontend",
    "start": "npm run start --prefix backend"
  }
}
```

```text
- npm ci --prefix backend: cài đúng các bản từ backend/package-lock.json.
- npm ci --include=dev --prefix frontend: cài cả devDependencies (Vite/Tailwind) để build.
- npm run build --prefix frontend: tạo frontend/dist bằng Vite.
- npm run start --prefix backend: chạy node src/server.js.
- Nhớ commit cả hai file package-lock.json.
```

## 20.4. Tạo .gitignore ở root

**Tạo `todo_app/.gitignore`:**

```gitignore
**/node_modules/
**/.env
**/dist/
.DS_Store
```

**Nên tạo thêm `backend/.env.example` để biết biến nào cần cấu hình:**

```dotenv
PORT=5001
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
NODE_ENV=development
```

```text
- .env.example không có mật khẩu thật nên có thể commit.
- .env có mật khẩu thật thì không commit.
- dist là output do Vite build, Render có thể tự build lại.
- Dòng .gitignore ở root áp dụng cho cả backend và frontend.
```

## 20.5. Kiểm tra local như production

**Trong `todo_app/backend/.env` để tạm:**

```dotenv
NODE_ENV=production
```

**Đứng tại `todo_app` và chạy:**

```bash
npm run build
npm start
```

**Mở:**

```text
http://localhost:5001
```

Kỳ vọng: thấy giao diện Todo X và có thể tạo/sửa/xóa nhiệm vụ trên cùng port 5001.

```text
- Nếu lỗi không thấy frontend: kiểm tra frontend/dist/index.html có tồn tại.
- Nếu MongoDB lỗi: kiểm tra MONGODB_URI và Atlas Network Access.
- Nếu Refresh URL giao diện bị 404: kiểm tra app.get("*") nằm sau API routes.
- Nếu API gọi về localhost từ bản production: kiểm tra axios.js.
```

**Test xong, trả `backend/.env` lại:**

```dotenv
NODE_ENV=development
```

Và phát triển bình thường bằng 2 Terminal:

```text
Terminal 1: cd backend  && npm run dev
Terminal 2: cd frontend && npm run dev
```

# 21. ĐẨY CODE LÊN GITHUB

```text
1. Vào GitHub, tạo repository trống, ví dụ: todo_app.
2. Không cần khởi tạo README/.gitignore trên GitHub nếu repo local đã có.
3. Mở Terminal tại thư mục gốc todo_app.
```

**Lần đầu push:**

```bash
git init
git status
git add .
git status
git commit -m "feat: build fullstack todo app"
git branch -M main
git remote add origin <URL_REPOSITORY_GITHUB>
git push -u origin main
```

```text
- Thay <URL_REPOSITORY_GITHUB> bằng URL thật, ví dụ:
    https://github.com/your-username/todo_app.git
- Nếu repo đã có remote origin, KHÔNG chạy "git remote add origin" lần nữa.
- Kiểm tra `git status` trước commit:
    backend/.env không được nằm trong danh sách file đang commit.
- Có thể kiểm tra cụ thể:
    git check-ignore backend/.env
  Nếu hiện backend/.env nghĩa là file đang được ignore.
```

**Sau này cập nhật dự án:**

```bash
git add .
git commit -m "chore: prepare deployment"
git push
```

# 22. DEPLOY LÊN RENDER

```text
1. Vào https://render.com/ và đăng nhập.
2. Chọn New -> Web Service.
3. Kết nối tài khoản GitHub hoặc cung cấp repository URL theo giao diện Render.
4. Chọn repository todo_app.
5. Branch: main.
6. Runtime/language: Node (nếu có lựa chọn).
7. Root Directory: để trống vì package.json nằm ở root todo_app.
8. Build Command:
       npm run build
9. Start Command:
       npm start
10. Chọn gói phù hợp (gói miễn phí nếu tài khoản/khu vực còn cung cấp).
```

**Tại phần Environment Variables trên Render:**

```text
Thêm:
    MONGODB_URI = connection string MongoDB Atlas thật
    NODE_ENV    = production

Không nhất thiết nhập PORT=5001 ở Render; để Render cung cấp qua process.env.PORT.
Không copy nguyên nội dung .env thành một giá trị duy nhất;
nhập từng KEY và VALUE đúng ô hoặc dùng chức năng import .env nếu giao diện hỗ trợ.
```

**Bấm Deploy Web Service.**

```text
- Chờ xem log build có thành công không.
- Nếu backend chạy: có log "Kết nối cơ sở dữ liệu thành công".
- Khi dịch vụ ở trạng thái Live, mở URL Render cấp.
- Test thử:
    /                -> giao diện Todo X
    /api/tasks?filter=all -> JSON có tasks, activeCount, completedCount
- Nếu Render không kết nối Atlas do network access:
    kiểm tra mục Network Access của MongoDB.
    Trong trường hợp IP outbound không cố định, cần lựa chọn access phù hợp;
    tránh để truy cập mọi IP rộng hơn nhu cầu lâu dài.
```

# 23. CẤU TRÚC THƯ MỤC CUỐI CÙNG

```text
todo_app/
    .gitignore
    package.json                 -> build/start toàn dự án

    backend/
        .env                     -> KHÔNG push lên GitHub
        .env.example             -> chỉ có giá trị mẫu
        .gitignore              -> có thể giữ (root .gitignore đã đủ)
        package.json
        package-lock.json
        src/
            server.js           -> express + cors + routes + static React + listen
            config/
                db.js           -> kết nối MongoDB
            models/
                Task.js         -> schema/model
            routes/
                taskRoutes.js   -> GET/POST/PUT/DELETE
            controllers/
                taskController.js -> CRUD + aggregate + date filtering

    frontend/
        index.html
        vite.config.js
        jsconfig.json
        components.json
        package.json
        package-lock.json
        public/
        src/
            main.jsx
            App.jsx
            index.css
            pages/
                HomePage.jsx
                NotFound.jsx
            lib/
                axios.js
                utils.js
            components/
                Header.jsx
                AddTask.jsx
                StatsAndFilters.jsx
                TaskList.jsx
                TaskCard.jsx
                TaskListPagination.jsx
                DateTimeFilter.jsx
                Footer.jsx
                ui/
                    ...component shadcn được CLI tạo...
        dist/                   -> Vite sinh ra sau khi npm run build
```

# 24. LỆNH CẦN NHỚ KHI LÀM LẠI DỰ ÁN

```text
TẠO BACKEND (chạy tại backend)
    npm init -y
    npm install express@4.18.2
    npm install nodemon -D
    npm install mongoose dotenv cors
    npm run dev

TẠO FRONTEND (chạy tại frontend)
    npm create vite@latest .
    npm install
    npm install react-router sonner axios lucide-react
    npm install tailwindcss @tailwindcss/vite
    npx shadcn@latest init
    npx shadcn@latest add button input card badge pagination command popover checkbox
    npm run dev

DÙNG HẰNG NGÀY
    backend:  npm run dev
    frontend: npm run dev
    Ctrl + C: dừng server

KIỂM TRA / CHẠY BẢN DEPLOY (chạy tại todo_app)
    npm run build
    npm start

GIT
    git status
    git add .
    git commit -m "message"
    git push
```

# 25. NẾU CÓ LỖI THÌ KIỂM TRA ĐÚNG CHỖ NÀY

```text
1. Cannot use import statement outside a module
   -> backend/package.json có "type": "module" chưa?

2. ERR_MODULE_NOT_FOUND
   -> đã npm install chưa? import file local đã có .js chưa?

3. nodemon: command not found
   -> cài npm install nodemon -D trong backend, chạy bằng npm run dev.

4. EADDRINUSE 5001
   -> port 5001 đang bị app khác chiếm, dừng process hoặc đổi PORT.

5. MongooseServerSelectionError / Authentication failed
   -> URI, username/password, Atlas Network Access, mạng Internet.

6. req.body undefined
   -> app.use(express.json()) phải đặt TRƯỚC app.use("/api/tasks", taskRoutes).
   -> Thunder Client Body cần chọn JSON và gửi object JSON hợp lệ.

7. PUT /api/tasks/:id báo 404
   -> đã thay :id bằng _id thật của MongoDB chưa?

8. CORS error trên frontend
   -> đã cài cors và app.use(cors(...)) chưa?
   -> Vite thực tế có đúng port 5173 không?

9. GET /api/tasks ra mảng nhưng frontend cần .tasks
   -> bạn đang dùng bản getTasks cơ bản; phải thay bằng bản aggregation ở bước 18.

10. UI báo thiếu @/components/...
    -> đã tạo jsconfig.json, alias trong vite.config.js và chạy shadcn add chưa?

11. Tailwind class không có tác dụng
    -> vite.config.js có @tailwindcss/vite chưa?
    -> index.css có @import "tailwindcss" chưa?
    -> main.jsx đã import index.css chưa?

12. Đổi date filter nhưng danh sách không đổi
    -> Backend đã áp dụng req.query.filter với $match chưa?
    -> Frontend có gửi params: { filter: dateQuery } chưa?

13. Frontend deploy mở được nhưng API không chạy
    -> Kiểm tra MONGODB_URI trên Render, Atlas Network Access,
       axios baseURL và app.use("/api/tasks", taskRoutes).

14. Render mở URL con ra 404
    -> Kiểm tra fallback app.get("*") và frontend/dist/index.html.

15. Build báo thiếu package-lock.json
    -> Chạy npm install trong đúng backend/frontend và commit package-lock.json.
```

**Đến đây hoàn thành:** Node.js + Express API CRUD, MongoDB Atlas + Mongoose, React + Vite, Tailwind + shadcn/ui, thống kê trạng thái, lọc thời gian, phân trang, sửa/xóa/đánh dấu hoàn thành, GitHub và Render.
