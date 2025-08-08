import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import type { Database } from '../../lib/database.types'
import {supabase} from "../../lib/supabase";

type Profile = Database['public']['Tables']['profiles']['Row']

export const useUserProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          // PGRST116 = no rows returned (profile doesn't exist yet)
          throw error
        }

        setProfile(data || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile')
        console.error('Error fetching user profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user?.id])

  const updateProfile = async (updates: Partial<Omit<Profile, 'id' | 'updated_at'>>) => {
    if (!user?.id) return { error: 'User not authenticated' }

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
      setError(errorMessage)
      return { error: errorMessage, data: null }
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    // 유저 기본 정보 (auth.users 테이블에서)
    user, 
    // 편의 함수들
    displayName: profile?.username || user?.email?.split('@')[0] || 'User',
    avatarUrl: profile?.avatar_url,
  }
}