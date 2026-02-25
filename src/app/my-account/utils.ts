import * as Yup from 'yup'

type AccountValues = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

type AccountUser = {
  name?: string | null
  username?: string | null
  email?: string | null
}

export const getAccountInitialValues = (user?: AccountUser | null): AccountValues => ({
  name: user?.name ?? '',
  username: user?.username ?? '',
  email: user?.email ?? '',
  password: '',
  confirmPassword: '',
})

export const getAccountValidationSchema = () =>
  Yup.object({
    name: Yup.string().optional(),
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().required('Email is required').email('Must be a valid email address'),
    password: Yup.string()
      .optional()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().when('password', {
      is: (value: string) => Boolean(value && value.length > 0),
      then: schema =>
        schema
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
      otherwise: schema => schema.optional(),
    }),
  })

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_MB = 3

export const validateImageFile = (file: File) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return 'Only JPG, PNG, or WEBP files are allowed.'
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) return 'Image must be 3MB or smaller.'
  return null
}

export const uploadToCloudinary = async ({
  file,
  cloudName,
  uploadPreset,
  folder,
}: {
  file: File
  cloudName: string
  uploadPreset: string
  folder?: string
}) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  if (folder) formData.append('folder', folder)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData?.error?.message ?? 'Upload failed')
  }

  return response.json()
}
