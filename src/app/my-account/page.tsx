'use client'
import { Alert, Avatar, Button, CircularProgress, GlobalStyles, IconButton, Snackbar, Stack, Typography as T } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import { Field, Form, Formik, useFormikContext } from 'formik'
import {
  getAccountInitialValues,
  getAccountValidationSchema,
  uploadToCloudinary,
  validateImageFile,
} from '~/app/my-account/utils'
import TextField from '~/app/UI/Shared/FormikTextField'
import { useApiMutation, useApiQuery } from '~/app/Libs/apiFetch'
import Loading from '~/app/UI/Shared/Loading'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useToken } from '~/app/store/useToken'
import { useRouter } from 'next/navigation'
import { backgroundCookie } from '~/app/UI/Images'

const displayName = 'MyAccountPage'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  height: 'calc(100dvh - 130px)',
  '@media (max-width: 768px)': {
    padding: '1rem',
  },
  width: '100vw',
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  [`& .${classes.content}`]: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '1rem',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  [`& .${classes.panel}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    border: `solid 3px ${theme.palette.primary.main}`,
    borderRadius: '1rem',
    background: theme.palette.text.main,
  },
  [`& .${classes.profilePanel}`]: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  [`& .${classes.formPanel}`]: {
    alignItems: 'center',
  },
  [`& .${classes.avatar}`]: {
    width: '15rem',
    height: '15rem',
    border: `4px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.main,
  },
  [`& .${classes.avatarWrap}`]: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  [`& .${classes.uploadActions}`]: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  [`& .${classes.iconButton}`]: {
    position: 'absolute',
    width: '38px',
    height: '38px',
    background: theme.palette.primary.main,
    color: theme.palette.text.main,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      background: theme.palette.primary.strong,
    },
  },
  [`& .${classes.editButton}`]: {
    bottom: '-6px',
    right: '-6px',
  },
  [`& .${classes.clearButton}`]: {
    top: '-6px',
    right: '-6px',
    background: theme.palette.red.main,
    '&:hover': {
      background: theme.palette.gray.strong,
    },
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    gap: '1rem',
  },
  [`& .${classes.fields}`]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
  },
  [`& .${classes.buttonContainer}`]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  [`& .${classes.button}`]: {
    padding: '1ch 2ch',
    background: theme.palette.primary.main,
    color: theme.palette.text.main,
    '&:hover': {
      background: theme.palette.primary.strong,
    },
    '&.Mui-disabled': {
      background: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  [`& .${classes.secondaryButton}`]: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  [`& .${classes.caption}`]: {
    width:'100%',
    marginBottom: '1rem',
  },
}))

type AccountFormInnerProps = {
  isSaving: boolean
  isUploading: boolean
  imageChanged: boolean
  imageUrl: string | null
  fallbackUrl: string
  onClearImage: () => void
  onFileChange: (_event: ChangeEvent<HTMLInputElement>) => void
  uploadError: string | null
  snackbarMessage: SnackbarMessage | null
  setSnackbarMessage: (_message: SnackbarMessage | null) => void
}

const AccountForm = ({
  isSaving,
  isUploading,
  imageChanged,
  imageUrl,
  fallbackUrl,
  onClearImage,
  onFileChange,
  uploadError,
  snackbarMessage,
  setSnackbarMessage,
}: AccountFormInnerProps) => {
  const { isValid, dirty } = useFormikContext()
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${backgroundCookie})`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
              opacity: 0.04,
              zIndex: -2,
              pointerEvents: 'none',
            },
            '&::after': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              zIndex: -1,
              pointerEvents: 'none',
            },
          },
        }}
      />
      <Container>
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <div className={`${classes.panel} ${classes.profilePanel}`}>
              <Stack direction="column" alignItems="center" gap="0.4rem">
                <T variant="h4">My Account</T>
                <T variant="body1" color="text.secondary" className={classes.caption}>
                  Update your profile photo and keep your info current.
                </T>
              </Stack>
              <div className={classes.avatarWrap}>
                <Avatar className={classes.avatar} src={imageUrl || fallbackUrl} alt="Profile avatar" />
                <IconButton
                  className={`${classes.iconButton} ${classes.editButton}`}
                  component="label"
                  disabled={isUploading}
                  aria-label="Upload photo"
                >
                  {isUploading ? <CircularProgress size={20} color="inherit" /> : <EditIcon />}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onFileChange}
                    hidden
                  />
                </IconButton>
                <IconButton
                  className={`${classes.iconButton} ${classes.clearButton}`}
                  onClick={onClearImage}
                  disabled={isUploading || !imageUrl}
                  aria-label="Use robot"
                >
                  <CloseIcon />
                </IconButton>
              </div>
              {uploadError ? <T color="error">{uploadError}</T> : null}
            </div>
            <div className={`${classes.panel} ${classes.formPanel}`}>
              <div className={classes.form}>
                <div className={classes.fields}>
                  <Field
                    variant="outlined"
                    name="name"
                    label="Name"
                    placeholder="Name"
                    component={TextField}
                  />
                  <Field
                    variant="outlined"
                    name="username"
                    label="Username"
                    placeholder="Username"
                    component={TextField}
                  />
                  <Field
                    variant="outlined"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    component={TextField}
                  />
                  <Field
                    variant="outlined"
                    name="password"
                    label="New Password"
                    placeholder="Leave blank to keep current"
                    type="password"
                    password
                    component={TextField}
                  />
                  <Field
                    variant="outlined"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    password
                    component={TextField}
                  />
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    disabled={(!dirty && !imageChanged) || !isValid || isSaving || isUploading}
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={5000}
          onClose={() => setSnackbarMessage(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity={snackbarMessage?.severity}>{snackbarMessage?.message}</Alert>
        </Snackbar>
      </Container>
    </>
  )
}

type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error'
type SnackbarMessage = {
	severity: SnackbarSeverity
	message: string
}

const Wrapper = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imageOverride, setImageOverride] = useState<string | null | undefined>(undefined)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { token } = useToken()
  const router = useRouter()

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ''
  const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? ''

  const { data, isLoading } = useApiQuery({
    url: '/api/user/me',
    key: 'me',
  })

  const updateAccount = useApiMutation({
    url: '/api/user/me',
    method: 'PATCH',
    keys: ['users', 'me'],
  })

  useEffect(() => {
    if (!token) router.replace('/access')
  }, [token, router])

  const user = (data as any)?.user
  const fallbackUrl = user?.username
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.username)}`
    : 'https://api.dicebear.com/7.x/bottts/svg?seed=snack-dash'

  const resolvedImage = imageOverride === undefined ? user?.image ?? null : imageOverride
  const imageChanged = imageOverride !== undefined && imageOverride !== (user?.image ?? null)

  if (isLoading) return <Loading />

  const initialValues = getAccountInitialValues(user)
  const validationSchema = getAccountValidationSchema()

  const handleClearImage = () => {
    setImageOverride(null)
    setUploadError(null)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setUploadError('Missing Cloudinary config. Add cloud name and upload preset.')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const data = await uploadToCloudinary({
        file,
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        folder: CLOUDINARY_FOLDER || undefined,
      })
      setImageOverride(data.secure_url)
    } catch (uploadErr: any) {
      const message = String(uploadErr?.message ?? uploadErr)
      setUploadError(message || 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (values: any) => {
    const payload: any = {
      ...(values.name ? { name: values.name } : {}),
      ...(values.username ? { username: values.username } : {}),
      ...(values.email ? { email: values.email } : {}),
      ...(values.password ? { password: values.password } : {}),
      image: resolvedImage ?? null,
    }

    setIsSaving(true)
    updateAccount.mutate(payload, {
      onSuccess: () => {
        setSnackbarMessage({
          severity: 'success',
          message: 'Account updated successfully.',
        })
      },
      onError: (updateError: any) => {
        const message = String(updateError?.error ?? updateError?.message ?? updateError)
        setSnackbarMessage({
          severity: 'error',
          message: message || 'Update failed. Please try again.',
        })
      },
      onSettled: () => {
        setIsSaving(false)
      },
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form>
        <AccountForm
          isSaving={isSaving}
          isUploading={isUploading}
          imageChanged={imageChanged}
          imageUrl={resolvedImage}
          fallbackUrl={fallbackUrl}
          onClearImage={handleClearImage}
          onFileChange={handleFileChange}
          uploadError={uploadError}
          snackbarMessage={snackbarMessage}
          setSnackbarMessage={setSnackbarMessage}
        />
      </Form>
    </Formik>

  )
}

export default Wrapper
