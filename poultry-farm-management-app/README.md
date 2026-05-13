# 🐔 Poultry Farm Management ERP

A modern poultry farm management web application built using:

- Frontend: React + Vite
- Backend: Spring Boot (Java)
- Database: MySQL

---

# 🚀 Features

## ✅ Dashboard
- Total Expenses
- Total Sales
- Profit / Loss
- Mortality %
- Batch-wise Analytics
- Charts Dashboard
- PDF Report Export

---

## ✅ Batch Management
- Add Batch
- Edit Batch
- Delete Batch
- Search Batches

---

## ✅ Expense Management
- Batch-wise Expenses
- Expense Tracking
- Notes Support

---

## ✅ Sales Management
- Batch-wise Sales
- Payment Tracking
- Remaining Amount
- Payment Status

---

## ✅ Daily Records
- Feed Consumption
- Mortality Tracking
- Egg Production
- Daily Farm Monitoring

---

## ✅ Feed Formula System
- Formula Management
- Feed Cost Per KG
- Percentage Validation
- Formula Calculations

---

## ✅ Modern UI
- Sidebar Navigation
- Dark Mode
- Responsive Layout
- Modern Tables
- Search Features

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- Axios
- Recharts
- jsPDF

## Backend
- Spring Boot
- Spring Data JPA
- REST APIs

## Database
- MySQL

---

# 📂 Project Structure

## Frontend
```bash
frontend/
```

## Backend
```bash
backend/
```

---

# ⚙️ Backend Setup

## 1️⃣ Open backend folder

```bash
cd backend
```

## 2️⃣ Configure MySQL

Update:
```properties
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/poultry_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
```

## 3️⃣ Run backend

```bash
./mvnw spring-boot:run
```

Backend runs on:
```bash
http://localhost:8080
```

---

# ⚙️ Frontend Setup

## 1️⃣ Open frontend folder

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Run frontend

```bash
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---

# 📄 PDF Reports

Dashboard includes:
- Download PDF Report
- Batch-wise Profit Report

---

# 📊 Charts Included

- Profit Charts
- Expense Distribution
- Batch Analytics

---

# 🌙 Dark Mode

Supports:
- Light Mode
- Dark Mode

---

# 🔥 Future Improvements

- Authentication
- Cloud Deployment
- AI Feed Optimization
- Mobile App
- Notifications System

---

# 👨‍💻 Developer

Built by Ishwar Thorat
