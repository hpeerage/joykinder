import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null, // { id, name, role, classId }

      // Mock users database
      users: [
        { id: 'admin', password: 'joy1234', name: '원장선생님', role: 'admin' },
        { id: 'teacher1', password: 'joy1234', name: '햇살반 선생님', role: 'teacher', classId: 'sunshine' },
        { id: 'parent1', password: 'joy1234', name: '지후 어머니', role: 'parent', studentId: 'jihu' },
        { id: 'parent2', password: 'joy1234', name: '서연 어머니', role: 'parent', studentId: 'seoyeon' },
      ],

      login: (id, password) => {
        set((state) => {
          const foundUser = state.users.find(u => u.id === id && u.password === password);
          if (foundUser) {
            return { isAuthenticated: true, user: foundUser };
          }
          return { isAuthenticated: false, user: null };
        });
      },
      
      register: (newUser) => set((state) => ({
        users: [...state.users, { ...newUser, password: 'joy1234' }] // Default password for mock
      })),

      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'joykinder-auth-v3', // v3로 변경 (데이터 연동)
    }
  )
);

export default useAuthStore;
