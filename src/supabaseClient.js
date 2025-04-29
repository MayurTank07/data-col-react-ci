import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sssauypeuqmeutlwuxni.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzc2F1eXBldXFtZXV0bHd1eG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM1MzgsImV4cCI6MjA2MTQ4OTUzOH0.hfSIQD7D4C3Og-Qykc0esTNO7ZsDVdndFwiazyy-_TU'

export const supabase = createClient(supabaseUrl, supabaseKey)
