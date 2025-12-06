// Script to create first admin user
// Run with: node scripts/create-admin.js

const fetch = require('node-fetch')

const createAdmin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/admin/create-first-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'admin',
        password: 'admin123',
        fullName: 'مدیر سیستم',
      }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ Admin user created successfully!')
      console.log('📋 Credentials:')
      console.log(`   Username: ${data.credentials.userName}`)
      console.log(`   Password: ${data.credentials.password}`)
      console.log(`\n🔗 Login at: http://localhost:3000/login`)
    } else {
      console.error('❌ Error:', data.message || data.statusMessage)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Make sure the dev server is running (npm run dev)')
  }
}

createAdmin()



