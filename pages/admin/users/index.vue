<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-gray-900">مدیریت کاربران</h1>
        <p class="text-gray-600 mt-1">مدیریت و ایجاد کاربران سیستم</p>
      </div>
      <KitButton variant="primary" icon-left="ph:plus-bold" @click="showCreateModal = true">
        کاربر جدید
      </KitButton>
    </div>

    <!-- Users List -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <Icon name="ph:spinner-bold" class="w-8 h-8 text-blue-600 animate-spin" />
      </div>

      <div v-else-if="users.length === 0" class="text-center py-12 text-gray-500">
        کاربری یافت نشد
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-right py-3 px-4 text-sm font-bold text-gray-700">نام کاربری</th>
              <th class="text-right py-3 px-4 text-sm font-bold text-gray-700">نام کامل</th>
              <th class="text-right py-3 px-4 text-sm font-bold text-gray-700">موبایل</th>
              <th class="text-right py-3 px-4 text-sm font-bold text-gray-700">نوع کاربر</th>
              <th class="text-right py-3 px-4 text-sm font-bold text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 text-sm text-gray-900">{{ user.userName }}</td>
              <td class="py-3 px-4 text-sm text-gray-900">{{ user.fullName }}</td>
              <td class="py-3 px-4 text-sm text-gray-600">{{ user.mobile || '-' }}</td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'text-xs font-bold px-3 py-1 rounded-full',
                    user.isAdmin
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ user.isAdmin ? 'ادمین' : 'کاربر عادی' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <button
                  @click="deleteUser(user.id)"
                  class="text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  حذف
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create User Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateModal = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 class="text-2xl font-black text-gray-900 mb-6">ایجاد کاربر جدید</h2>

        <form @submit.prevent="handleCreateUser" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">نام کاربری *</label>
            <KitInput
              v-model="newUser.userName"
              type="text"
              placeholder="نام کاربری"
              required
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">نام کامل *</label>
            <KitInput
              v-model="newUser.fullName"
              type="text"
              placeholder="نام کامل"
              required
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">رمز عبور *</label>
            <KitInput
              v-model="newUser.password"
              type="password"
              placeholder="رمز عبور"
              required
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">موبایل</label>
            <KitInput
              v-model="newUser.mobile"
              type="tel"
              placeholder="09123456789"
              class="w-full"
            />
          </div>

          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="newUser.isAdmin"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm font-semibold text-gray-700">کاربر ادمین</span>
            </label>
          </div>

          <div v-if="createError" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {{ createError }}
          </div>

          <div class="flex gap-3">
            <KitButton
              type="submit"
              variant="primary"
              class="flex-1"
              :loading="creating"
              :disabled="creating"
            >
              ایجاد کاربر
            </KitButton>
            <KitButton
              type="button"
              variant="secondary"
              @click="showCreateModal = false"
            >
              انصراف
            </KitButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const users = ref<any[]>([])
const loading = ref(true)
const showCreateModal = ref(false)
const creating = ref(false)
const createError = ref('')

const newUser = ref({
  userName: '',
  fullName: '',
  password: '',
  mobile: '',
  isAdmin: false
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: any[] }>('/api/admin/users', {
      credentials: 'include'
    })
    users.value = res.data || []
  } catch (error) {
    console.error('Error fetching users:', error)
    users.value = []
  } finally {
    loading.value = false
  }
}

const handleCreateUser = async () => {
  creating.value = true
  createError.value = ''

  try {
    const res = await $fetch('/api/admin/users', {
      method: 'POST',
      body: {
        userName: newUser.value.userName,
        fullName: newUser.value.fullName,
        password: newUser.value.password,
        mobile: newUser.value.mobile || undefined,
        isAdmin: newUser.value.isAdmin
      },
      credentials: 'include'
    })

    await fetchUsers()
    showCreateModal.value = false
    newUser.value = {
      userName: '',
      fullName: '',
      password: '',
      mobile: '',
      isAdmin: false
    }
  } catch (error: any) {
    createError.value = error?.data?.message || error?.message || 'خطا در ایجاد کاربر'
  } finally {
    creating.value = false
  }
}

const deleteUser = async (userId: string) => {
  if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return

  try {
    await $fetch(`/api/admin/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    await fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('خطا در حذف کاربر')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>



