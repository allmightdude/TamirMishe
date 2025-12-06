# Authentication & User Registration Guide

## Creating First Admin User (One-Time Setup)

### Method 1: Using Create First Admin Endpoint (Recommended)

This endpoint only works if NO admin users exist in the database.

**Using PowerShell:**
```powershell
$body = @{userName='admin';password='admin123';fullName='مدیر سیستم'} | ConvertTo-Json
Invoke-WebRequest -Uri 'http://localhost:3000/api/admin/create-first-admin' -Method POST -Body $body -ContentType 'application/json'
```

**Using Browser Console:**
```javascript
fetch('/api/admin/create-first-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userName: 'admin',
    password: 'admin123',
    fullName: 'مدیر سیستم'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

**Note:** This endpoint only works once. After the first admin is created, you must use the admin panel to create more users.

## Creating Users (Admin Only)

**Important:** Regular users cannot sign up via UI. Only admins can create users through the admin panel.

### Using Admin Panel (Recommended)

1. Login as admin at `/login`
2. Go to `/admin/users`
3. Click "کاربر جدید" (New User)
4. Fill in the form and create the user

### Using Admin API (Requires Admin Authentication)

```javascript
// Must be authenticated as admin
POST /api/admin/users
Content-Type: application/json
Cookie: auth_token=YOUR_ADMIN_TOKEN

{
  "userName": "username",
  "password": "password123",
  "fullName": "نام کامل",
  "mobile": "09123456789", // optional
  "isAdmin": false // or true for admin users
}
```

## Important Notes

1. **Admin Users**: Only users with `isAdmin: true` can access `/admin` routes
2. **No Public Signup**: Users cannot sign up via UI - only admins can create users
3. **First Admin**: Use `/api/admin/create-first-admin` endpoint (works only if no admins exist)
4. **Subsequent Users**: Must be created by admins via `/admin/users` panel
5. **Password**: Passwords are automatically hashed using bcrypt
6. **Username**: Must be unique
7. **Sign-up API**: The `/api/authentication/sign-up` endpoint exists but is not exposed in UI

