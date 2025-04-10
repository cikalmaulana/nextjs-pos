# 🐾 Paw Enterprise - POS System

**Paw Enterprise** is a web-based **Point of Sale (POS)** system designed to streamline sales and store operations. It features **role-based access control** for **Admin** and **Cashier** users, with tailored permissions for each.

---

## 👥 Roles & Permissions

### 🛠 Admin
The Admin has full access to the system and can perform the following tasks:

- **Role Management**  
  Manage user roles within the application.

- **User Management**  
  Create, update, and delete users.

- **Attendance Management**  
  View attendance records for all cashiers and themselves. Set maximum check-in and check-out times.

- **Item Management**  
  Add, update, and delete items.

- **Stock Management**  
  Update stock quantity for each item.

- **Store Management**  
  Update store information:
  - Store name  
  - Address  
  - Phone number  
  - Opening and closing hours

- **Invoice History**  
  View complete invoice history, including:
  - Item and price details  
  - Customer name  
  - Cashier who issued the invoice

- **Category Management**  
  Add, update, delete categories, and assign items to them.

- **Sales Analytics**  
  Track best-selling items and categories.  
  View reports by week or month.

---

### 💼 Cashier
Cashiers have limited access for their role and can:

- Perform sales transactions
- Scan item barcodes
- Check in and out for attendance
- View their own invoice history

---

## ⚙️ Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Session-based (Cookie)
- **Access Control**: Role-based with Middleware

---

## 📄 License
This project is licensed under the MIT License.

