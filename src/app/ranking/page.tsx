'use client'
import { Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import { useApiQuery } from '~/app/Libs/apiFetch'
import Image from 'next/image'
import Loading from '~/app/UI/Shared/Loading'

const displayName = 'RankingPage'
const classes = getClassPrefixer(displayName) as any

const HEADERS = ['Username', 'Wins']

type RankingUser = {
  id: string
  username: string
  wins: number
  image?: string | null
}

type RankingRow = RankingUser & {
  rank: number
}

const Container = styled('div')(({ theme }: any) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  '@media (max-width: 768px)': {
    padding: '1rem',
  },
  [`& .${classes.gridHeader}, & .${classes.gridItems}`]: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 3fr 1fr',
  },
  [`& .${classes.gridHeader}`]: {
    marginBottom: '0.5rem',
  },
  [`& .${classes.item}`]: {
    paddingLeft: '1ch',
    paddingRight: '1ch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  [`& .${classes.gridItems}`]: {
    width: '100%',
    marginTop: '0.5ch',
    padding: '0.5ch',
    background: theme.palette.primary.enabled,
    color: theme.palette.primary.main,
  },
  [`& .${classes.top1}`]: {
    background: theme.palette.contrast.active,
    borderLeft: `6px solid ${theme.palette.contrast.main}`,
    color: `${theme.palette.text.main}`,
    fontWeight: 'bold',
  },
  [`& .${classes.top2}`]: {
    background: theme.palette.contrast.active,
    borderLeft: `4px solid ${theme.palette.contrast.main}`,
    color: `${theme.palette.text.main}`,
    fontWeight: 'bold',
  },
  [`& .${classes.top3}`]: {
    background: theme.palette.contrast.active,
    borderLeft: `2px solid ${theme.palette.contrast.main}`,
    color: `${theme.palette.text.main}`,
    fontWeight: 'bold',
  },
  [`& .${classes.rankItem}`]: {
    justifyContent: 'center',
  },
  [`& .${classes.userItem}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '1ch',
  },
  [`& .${classes.winsItem}`]: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  [`& .${classes.tableWrapper}`]: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      overflowX: 'scroll',
      WebkitOverflowScrolling: 'touch',
    },
  },
  [`& .${classes.tableContent}`]: {
    width: '100%',
  
  },
}))

const RankingPage = ({ users }: { users: RankingRow[] }) => {
  return (
    <Container>
      <div className={classes.tableWrapper}>
        <div className={classes.tableContent}>
          <div className={classes.gridHeader}>
            <div className={`${classes.item} ${classes.rankItem}`}>
              <T variant="h6" color="text" fontWeight="bold">
                Top
              </T>
            </div>
            {HEADERS.map((item, index) => (
              <div
                className={`${classes.item} ${index === 1 ? classes.winsItem : ''}`}
                key={index}
              >
                <T variant="h6" color="text" fontWeight="bold">
                  {item}
                </T>
              </div>
            ))}
          </div>

          {users.map(row => {
            const rankClassMap: Record<number, string> = {
              1: classes.top1,
              2: classes.top2,
              3: classes.top3,
            }
            const topClass = rankClassMap[row.rank] ?? ''
            return (
              <div key={row.id} className={`${classes.gridItems} ${topClass}`}>
                <div className={`${classes.item} ${classes.rankItem}`}>
                  <T variant="subtitle1" fontWeight="bold">
                    {row.rank}
                  </T>
                </div>
                <div className={`${classes.item} ${classes.userItem}`}>
                  <Image
                    src={row.image ??'https://api.dicebear.com/7.x/bottts/svg?seed=' + row.username}
                    alt='Avatar'
                    width={40}
                    height={40}
                    layout="intrinsic"
                    unoptimized
                  />
                  <T variant="subtitle1" fontWeight="bold">
                    {row.username}
                  </T>
                </div>
                <div className={`${classes.item} ${classes.winsItem}`}>
                  <T variant="subtitle1" fontWeight="bold">
                    {row.wins}
                  </T>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

const Wrapper = () => {
  const { data, isLoading: isUsersLoading, error: usersError } = useApiQuery({
    url: '/api/user',
    key: 'users',
  })


  if (isUsersLoading) return <Loading />

  if (usersError) {
    const message = String((usersError as any)?.message ?? usersError)
    return <div>Error loading users: {message}</div>
  }

  const users = ((data as any)?.users ?? []) as RankingUser[]
  const rows = [...users]
    .sort((a, b) => (b.wins ?? 0) - (a.wins ?? 0))
    .reduce((acc: RankingRow[], row) => {
      const lastRow = acc[acc.length - 1]
      let rank: number
      if (!lastRow) {
        rank = 1
      } else if (lastRow.wins === row.wins) {
        rank = lastRow.rank
      } else {
        rank = lastRow.rank + 1
      }
      acc.push({ ...row, rank })
      return acc
    }, [])

  return (
    <RankingPage users={rows} />
  )
}

export default Wrapper
